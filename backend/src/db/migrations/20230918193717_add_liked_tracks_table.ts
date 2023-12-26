import { type Knex } from 'knex';

const TABLE_NAME = 'liked_tracks';

const ForeignTableName = {
  USERS: 'users',
  TRACKS: 'tracks',
} as const;

const ColumnName = {
  ID: 'id',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
  USER_ID: 'user_id',
  TRACK_ID: 'track_id',
} as const;

const RelationRule = {
  CASCADE: 'CASCADE',
} as const;

function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments(ColumnName.ID).primary();
    table
      .dateTime(ColumnName.CREATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .dateTime(ColumnName.UPDATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .integer(ColumnName.USER_ID)
      .references(ColumnName.ID)
      .inTable(ForeignTableName.USERS)
      .onUpdate(RelationRule.CASCADE)
      .onDelete(RelationRule.CASCADE)
      .notNullable();
    table
      .integer(ColumnName.TRACK_ID)
      .references(ColumnName.ID)
      .inTable(ForeignTableName.TRACKS)
      .onUpdate(RelationRule.CASCADE)
      .onDelete(RelationRule.CASCADE)
      .notNullable();
  });
}

function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { down, up };
