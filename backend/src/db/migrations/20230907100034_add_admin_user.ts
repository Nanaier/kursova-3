import { type Knex } from 'knex';

const TABLE_NAME = {
  USERS: 'users',
  USER_DETAILS: 'user_details',
  USER_ROLES: 'user_roles',
} as const;

const COLUMN_NAME = {
  ID: 'id',
  KEY: 'key',
} as const;

const ADMIN_USER = {
  username: 'Admin',
  passwordHash: 'password_hash',
  passwordSalt: 'password_salt',
};

const ADMIN_ROLE_KEY = 'admin';

type UserRole = {
  id: number;
};

async function up(knex: Knex): Promise<void> {
  const adminRole = await knex(TABLE_NAME.USER_ROLES)
    .select<UserRole>(COLUMN_NAME.ID)
    .where(COLUMN_NAME.KEY, ADMIN_ROLE_KEY)
    .first();

  await knex(TABLE_NAME.USERS).insert({
    ...ADMIN_USER,
    roleId: (adminRole as UserRole).id,
  });

  const admin = await knex(TABLE_NAME.USERS)
    .select<UserRole>(COLUMN_NAME.ID)
    .where({ username: ADMIN_USER.username })
    .first();

  await knex(TABLE_NAME.USER_DETAILS).insert({
    userId: (admin as UserRole).id,
  });
}

async function down(knex: Knex): Promise<void> {
  const userToDelete = await knex(TABLE_NAME.USERS)
    .select<UserRole>(COLUMN_NAME.ID)
    .where({ username: ADMIN_USER.username })
    .first();
  await knex(TABLE_NAME.USERS)
    .where({ id: (userToDelete as UserRole).id })
    .del();
}

export { down, up };
