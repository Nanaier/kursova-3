import { type Knex } from 'knex';

const TRACKS_TABLE_NAME = 'tracks';

const ForeignKeyTables = {
  FILES_TABLE_NAME: 'files',
  IMAGES_TABLE_NAME: 'images',
  ARTISTS_TABLE_NAME: 'artists',
  GENRES_TABLE_NAME: 'genres',
};

const ColumnName = {
  ID: 'id',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
  FILE_ID: 'file_id',
  TITLE: 'title',
  ARTIST_ID: 'artist_id',
  GENRE_ID: 'genre_id',
  YEAR_OF_PUBLICATION: 'year_of_publication',
  IMAGE_ID: 'image_id',
} as const;

const RelationRule = {
  CASCADE: 'CASCADE',
} as const;

function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TRACKS_TABLE_NAME, (table) => {
    table.increments(ColumnName.ID).primary();
    table
      .dateTime(ColumnName.CREATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .dateTime(ColumnName.UPDATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
    table.integer(ColumnName.FILE_ID);
    table
      .foreign(ColumnName.FILE_ID)
      .references(ColumnName.ID)
      .inTable(ForeignKeyTables.FILES_TABLE_NAME)
      .onUpdate(RelationRule.CASCADE)
      .onDelete(RelationRule.CASCADE);
    table.string(ColumnName.TITLE).notNullable();
    table.integer(ColumnName.ARTIST_ID).nullable();
    table
      .foreign(ColumnName.ARTIST_ID)
      .references(ColumnName.ID)
      .inTable(ForeignKeyTables.ARTISTS_TABLE_NAME)
      .onUpdate(RelationRule.CASCADE)
      .onDelete(RelationRule.CASCADE);
    table.integer(ColumnName.GENRE_ID);
    table
      .foreign(ColumnName.GENRE_ID)
      .references(ColumnName.ID)
      .inTable(ForeignKeyTables.GENRES_TABLE_NAME)
      .onUpdate(RelationRule.CASCADE)
      .onDelete(RelationRule.CASCADE);
    table.integer(ColumnName.YEAR_OF_PUBLICATION);
    table.integer(ColumnName.IMAGE_ID);
    table
      .foreign(ColumnName.IMAGE_ID)
      .references(ColumnName.ID)
      .inTable(ForeignKeyTables.IMAGES_TABLE_NAME)
      .onUpdate(RelationRule.CASCADE)
      .onDelete(RelationRule.CASCADE);
  });
}

function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TRACKS_TABLE_NAME);
}

export { down, up };
