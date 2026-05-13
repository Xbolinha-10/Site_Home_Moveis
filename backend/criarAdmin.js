import bcrypt from 'bcryptjs';
import db from './database.js';

async function criarPrimeiroAdmin() {
  const email = 'admin@admin.com'; // Você pode alterar este e-mail
  const senha = 'admin123'; // Você pode alterar esta senha
  const senhaHash = await bcrypt.hash(senha, 10);

  try {
    await db('usuarios').insert({
      email: email,
      senha: senhaHash
    });
    console.log('--- SUCESSO ---');
    console.log('Usuário admin criado com sucesso!');
    console.log(`Login: ${email}`);
    console.log(`Senha: ${senha}`);
  } catch (error) {
    console.log('--- AVISO ---');
    console.log('O usuário já existe ou ocorreu um erro.');
  } finally {
    process.exit();
  }
}

criarPrimeiroAdmin();