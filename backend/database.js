import knex from 'knex';

const db = knex({
  client: 'sqlite3',
  connection: { filename: './database.sqlite' },
  useNullAsDefault: true
});

// Criar tabelas se não existirem
async function initDB() {
  if (!await db.schema.hasTable('usuarios')) {
    await db.schema.createTable('usuarios', (table) => {
      table.increments('id');
      table.string('email').unique().notNullable();
      table.string('senha').notNullable();
    });
  }

  if (!await db.schema.hasTable('produtos')) {
    await db.schema.createTable('produtos', (table) => {
      table.increments('id');
      table.string('nome').notNullable();
      table.decimal('preco').notNullable();
      table.string('ano');
      table.string('dimensoes');
      table.string('imagem');
    });
  }
}

initDB();
export default db;