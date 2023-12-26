import { type Knex } from 'knex';

const ARTISTS_TABLE_NAME = 'artists';

const ForeignKeyTables = {
  IMAGES_TABLE_NAME: 'images',
};

const ColumnName = {
  ID: 'id',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
  ARTIST_NAME: 'artist_name',
  ARTIST_USERNAME: 'artist_username',
  DESCRIPTION: 'description',
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
    table.string(ColumnName.ARTIST_NAME).unique().notNullable();
    table.string(ColumnName.ARTIST_USERNAME).unique().notNullable();
    table.text(ColumnName.DESCRIPTION);
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
