export async function up(knex) {
  await knex.schema.createTable("users", (table) => {
    table.increments('id').primary();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
  });
}


export async function down(knex) {
  await knex.schema.dropTableIfExists("users");
}
