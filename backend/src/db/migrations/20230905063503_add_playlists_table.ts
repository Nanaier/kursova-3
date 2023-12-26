import { type Knex } from 'knex';

const PLAYLISTS_TABLE_NAME = 'playlists';

const ForeignKeyTables = {
  FILES_TABLE_NAME: 'files',
  USERS_TABLE_NAME: 'users',
};

const ColumnName = {
  ID: 'id',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
  USER_ID: 'user_id',
  PLAYLIST_NAME: 'playlist_name',
  PREVIEW_ID: 'preview_id',
} as const;

const RelationRule = {
  CASCADE: 'CASCADE',
} as const;

function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(PLAYLISTS_TABLE_NAME, (table) => {
    table.increments(ColumnName.ID).primary();
    table
      .dateTime(ColumnName.CREATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .dateTime(ColumnName.UPDATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
    table.integer(ColumnName.USER_ID);
    table
      .foreign(ColumnName.USER_ID)
      .references(ColumnName.ID)
      .inTable(ForeignKeyTables.USERS_TABLE_NAME)
      .onUpdate(RelationRule.CASCADE)
      .onDelete(RelationRule.CASCADE);
    table.string(ColumnName.PLAYLIST_NAME).notNullable();
    table.integer(ColumnName.PREVIEW_ID).nullable();
    table
      .foreign(ColumnName.PREVIEW_ID)
      .references(ColumnName.ID)
      .inTable(ForeignKeyTables.FILES_TABLE_NAME)
      .onUpdate(RelationRule.CASCADE)
      .onDelete(RelationRule.CASCADE);
  });
}

function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(PLAYLISTS_TABLE_NAME);
}

export { down, up };
