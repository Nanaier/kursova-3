import { type Knex } from 'knex';

const TABLE_NAME = 'playlists_to_tracks';

const ForeignTableName = {
  PLAYLISTS: 'playlists',
  TRACKS: 'tracks',
} as const;

const ColumnName = {
  ID: 'id',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
  PLAYLIST_ID: 'playlist_id',
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
      .integer(ColumnName.PLAYLIST_ID)
      .references(ColumnName.ID)
      .inTable(ForeignTableName.PLAYLISTS)
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
