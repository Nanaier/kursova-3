import { type Knex } from 'knex';

const IMAGES_TABLE_NAME = 'images';
const FILES_TABLE_NAME = 'files';

const ColumnName = {
  ID: 'id',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
  FILE_ID: 'file_id',
  IS_BASIC_IMAGE: 'is_basic_image',
} as const;

const RelationRule = {
  CASCADE: 'CASCADE',
} as const;

function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(IMAGES_TABLE_NAME, (table) => {
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
      .inTable(FILES_TABLE_NAME)
      .onUpdate(RelationRule.CASCADE)
      .onDelete(RelationRule.CASCADE);
    table.boolean(ColumnName.IS_BASIC_IMAGE);
  });
}

function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(IMAGES_TABLE_NAME);
}

export { down, up };
