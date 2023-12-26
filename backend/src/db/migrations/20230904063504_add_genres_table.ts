import { type Knex } from 'knex';

const ARTISTS_TABLE_NAME = 'genres';

const ForeignKeyTables = {
  IMAGES_TABLE_NAME: 'images',
};

const ColumnName = {
  ID: 'id',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
  GENRE_NAME: 'genre_name',
  GENRE_DESCRIPTION: 'genre_description',
  IMAGE_ID: 'image_id',
} as const;

const RelationRule = {
  CASCADE: 'CASCADE',
} as const;

function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(ARTISTS_TABLE_NAME, (table) => {
    table.increments(ColumnName.ID).primary();
    table
      .dateTime(ColumnName.CREATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .dateTime(ColumnName.UPDATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
    table.string(ColumnName.GENRE_NAME).notNullable();
    table.text(ColumnName.GENRE_DESCRIPTION).notNullable();
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
  return knex.schema.dropTableIfExists(ARTISTS_TABLE_NAME);
}

export { down, up };
