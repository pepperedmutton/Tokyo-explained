export async function up(knex) {
  await knex.schema.createTable("comment", (table) => {
    table.increments('id').primary();
    table.string('placeId')
    table.integer('userid').notNullable().references('id').inTable('users')
    table.text('content');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}


export async function down(knex) {
  await knex.schema.dropTableIfExists("comment");
}
