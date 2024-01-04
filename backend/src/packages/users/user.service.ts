import { ExceptionMessage } from '~/libs/enums/enums.js';
import { type Config } from '~/libs/packages/config/config.js';
import { type Encrypt } from '~/libs/packages/encrypt/encrypt.js';
import { HTTPCode } from '~/libs/packages/http/http.js';
import { type JWTService } from '~/libs/packages/jwt/jwt.service.js';

import { type Service, type ValueOf } from '~/libs/types/types.js';
import { type UserEntity } from '~/packages/users/user.entity.js';
import { type UserRepository } from '~/packages/users/user.repository.js';

import { UserError } from './libs/exceptions/exceptions.js';
import {
  type UserSignUpRequestDto,
  type UserSignUpResponseDto,
} from './libs/types/types.js';
import { UserWithPasswordEntity } from './user-with-password.entity.js';
import { UserRoleKey } from './libs/enums/user-role-key.enum.js';

type UserServiceDependencies = {
  userRepository: UserRepository;
  jwtService: JWTService;
  encryptService: Encrypt;
  config: Config;
};

class UserService implements Service {
  private userRepository: UserRepository;

  private jwtService: JWTService;

  private encryptService: Encrypt;

  private config: Config;

  public constructor({
    userRepository,
    jwtService,
    encryptService,
    config,
  }: UserServiceDependencies) {
    this.userRepository = userRepository;
    this.jwtService = jwtService;
    this.encryptService = encryptService;
    this.config = config;
  }

  public async findById(
    id: number,
  ): Promise<ReturnType<UserEntity['toObject']> | null> {
    const user = await this.userRepository.findById(id);

    return user?.toObject() ?? null;
  }

  public async findByRoleKey(
    roleKey: ValueOf<typeof UserRoleKey>,
  ): Promise<ReturnType<UserEntity['toObject']> | null> {
    const user = await this.userRepository.findByRoleKey(roleKey);

    return user?.toObject() ?? null;
  }

  public async isAdminById(userId: number): Promise<boolean> {
    return await this.userRepository.isAdminById(userId);
  }

  public findAll(): ReturnType<Service['findAll']> {
    return Promise.resolve({ items: [] });
  }

  public async create(
    payload: UserSignUpRequestDto,
  ): Promise<UserSignUpResponseDto> {
    const passwordSalt = await this.encryptService.generateSalt(
      this.config.ENV.ENCRYPT.NUMBER_OF_ROUNDS,
    );
    const passwordHash = await this.encryptService.generateHash(
      payload.password,
      passwordSalt,
    );
    const item = await this.userRepository.create(
      UserWithPasswordEntity.initializeNew({
        username: payload.username,
        passwordSalt,
        passwordHash,
      }),
    );
    const user = item.toObject();
    const token = await this.jwtService.signJWT({ userId: user.id });

    return {
      user,
      token,
    };
  }

  public update(): ReturnType<Service['update']> {
    return Promise.resolve(null);
  }

  public async delete(id: number): Promise<boolean> {
    const userToDelete = await this.userRepository.findById(id);

    if (!userToDelete) {
      throw new UserError({
        status: HTTPCode.NOT_FOUND,
        message: ExceptionMessage.USER_NOT_FOUND,
      });
    }

    const deletedCount = await this.userRepository.delete(id);

    return Boolean(deletedCount);
  }

  public async findByUsername(
    username: string,
  ): Promise<ReturnType<UserEntity['toObject']> | null> {
    const userEntity = await this.userRepository.findByUsername(username);

    if (!userEntity) {
      return null;
    }

    return userEntity.toObject();
  }

  public async findByUsernameWithPassword(
    username: string,
  ): Promise<ReturnType<UserWithPasswordEntity['toObject']> | null> {
    const userEntity = await this.userRepository.findByUsernameWithPassword(
      username,
    );

    if (!userEntity) {
      return null;
    }

    return userEntity.toObject();
  }

  public async updateAvatar({
    id,
    avatarId,
  }: {
    id: number;
    avatarId: number;
  }): Promise<ReturnType<UserEntity['toObject']>> {
    const userEntity = await this.userRepository.updateAvatar({
      id,
      avatarId,
    });

    return userEntity.toObject();
  }
}

export { UserService };
