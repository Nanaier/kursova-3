import { type Knex } from 'knex';

const TABLE_NAME = 'user_details';

const ColumnName = {
  ID: 'id',
  AVATAR_ID: 'avatar_id',
} as const;

const ForeignTable = {
  IMAGES: 'images',
} as const;

const RelationRule = {
  CASCADE: 'CASCADE',
} as const;

function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TABLE_NAME, (table) => {
    table
      .integer(ColumnName.AVATAR_ID)
      .references(ColumnName.ID)
      .inTable(ForeignTable.IMAGES)
      .onUpdate(RelationRule.CASCADE)
      .onDelete(RelationRule.CASCADE);
  });
}

function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TABLE_NAME, (table) => {
    table.dropColumn(ColumnName.AVATAR_ID);
  });
}

export { down, up };
