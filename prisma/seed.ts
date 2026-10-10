import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, UserType } from '../generated/prisma/client';
import * as bcrypt from 'bcrypt';

const databaseUrl = process.env.DATABASE_URL;
const adminPwd = process.env.ADMIN_PASSWORD;

if (!databaseUrl) {
  throw new Error('A variável DATABASE_URL não está definida.');
}

if (!adminPwd) {
  throw new Error('A variável ADMIN_PASSWORD não está definida.');
}

const adapter = new PrismaPg({
  connectionString: databaseUrl,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const user = await prisma.user.findUnique({
    where: {
      email: 'admin.da.api@teste.com',
    },
  });

  if (user) {
    console.log('Email já cadastrado.');
    return;
  }

  const salt = await bcrypt.genSalt();
  const pwd = await bcrypt.hash(adminPwd, salt);

  await prisma.user.create({
    data: {
      name: 'Admin da Api',
      email: 'admin.da.api@teste.com',
      passwordHash: pwd,
      phone: '99999999999',
      profile: UserType.ADMIN,
      active: true,
      unitId: null,
    },
  });

  console.log('User criado com sucesso');
}

main()
  .catch((err) => {
    console.error('Erro ao executar a seed: ', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
