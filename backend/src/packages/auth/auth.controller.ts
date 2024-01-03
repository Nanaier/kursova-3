import { APIPath, ExceptionMessage } from '~/libs/enums/enums.js';
import { AuthError } from '~/libs/exceptions/exceptions.js';
import {
  type APIHandlerOptions,
  type APIHandlerResponse,
  BaseController,
} from '~/libs/packages/controller/controller.js';
import { HTTPCode } from '~/libs/packages/http/http.js';
import { type Logger } from '~/libs/packages/logger/logger.js';
import {
  type UserAuthResponseDto,
  type UserSignInRequestDto,
  userSignInValidationSchema,
  type UserSignUpRequestDto,
  userSignUpValidationSchema,
} from '~/packages/users/users.js';

import { type UserService } from '../users/users.js';
import { type AuthService } from './auth.service.js';
import { AuthApiPath } from './libs/enums/enums.js';

type Constructor = {
  logger: Logger;
  authService: AuthService;
  userService: UserService;
};

class AuthController extends BaseController {
  private authService: AuthService;

  private userService: UserService;

  public constructor({ logger, authService, userService }: Constructor) {
    super(logger, APIPath.AUTH);

    this.authService = authService;
    this.userService = userService;

    this.addRoute({
      path: AuthApiPath.SIGN_UP,
      method: 'POST',
      validation: {
        body: userSignUpValidationSchema,
      },
      handler: (options) => {
        return this.signUp(
          options as APIHandlerOptions<{
            body: UserSignUpRequestDto;
          }>,
        );
      },
    });
    this.addRoute({
      path: AuthApiPath.SIGN_IN,
      method: 'POST',
      validation: {
        body: userSignInValidationSchema,
      },
      handler: (options) => {
        return this.signIn(
          options as APIHandlerOptions<{
            body: UserSignInRequestDto;
          }>,
        );
      },
    });
    this.addRoute({
      path: AuthApiPath.AUTHENTICATED_USER,
      method: 'GET',
      handler: (options) => {
        return this.getAuthenticatedUser(
          options as APIHandlerOptions<{
            user: UserAuthResponseDto;
          }>,
        );
      },
    });
    this.addRoute({
      path: AuthApiPath.IS_ADMIN,
      method: 'GET',
      handler: (options) => {
        return this.isUserAdmin(
          options as APIHandlerOptions<{
            user: UserAuthResponseDto;
          }>,
        );
      },
    });
    this.addRoute({
      path: AuthApiPath.AUTHENTICATED_USER,
      method: 'DELETE',
      handler: (options) => {
        return this.deleteAuthenticatedUser(
          options as APIHandlerOptions<{
            user: UserAuthResponseDto;
          }>,
        );
      },
    });
  }

  private async signUp(
    options: APIHandlerOptions<{
      body: UserSignUpRequestDto;
    }>,
  ): Promise<APIHandlerResponse> {
    return {
      status: HTTPCode.CREATED,
      payload: await this.authService.signUp(options.body),
    };
  }

  private async signIn(
    options: APIHandlerOptions<{
      body: UserSignInRequestDto;
    }>,
  ): Promise<APIHandlerResponse> {
    const user = await this.authService.verifyLoginCredentials(options.body);

    return {
      status: HTTPCode.OK,
      payload: await this.authService.signIn(user),
    };
  }

  private async getAuthenticatedUser(
    options: APIHandlerOptions<{ user: UserAuthResponseDto }>,
  ): Promise<APIHandlerResponse> {
    const user = await this.userService.findById(options.user.id);

    if (!user) {
      throw new AuthError({
        message: ExceptionMessage.USER_NOT_FOUND,
        status: HTTPCode.UNAUTHORIZED,
      });
    }

    return {
      status: HTTPCode.OK,
      payload: await this.userService.findById(options.user.id),
    };
  }

  private async isUserAdmin(
    options: APIHandlerOptions<{ user: UserAuthResponseDto }>,
  ): Promise<APIHandlerResponse> {
    return {
      status: HTTPCode.OK,
      payload: await this.userService.isAdminById(options.user.id),
    };
  }

  private async deleteAuthenticatedUser(
    options: APIHandlerOptions<{
      user: UserAuthResponseDto;
    }>,
  ): Promise<APIHandlerResponse> {
    return {
      status: HTTPCode.OK,
      payload: await this.userService.delete(options.user.id),
    };
  }
}

export { AuthController };
