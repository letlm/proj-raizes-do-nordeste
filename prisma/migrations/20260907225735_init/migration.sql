-- CreateEnum
CREATE TYPE "tipo_usuarios" AS ENUM ('ADMIN', 'CLIENTE', 'ATENDENTE', 'COZINHA', 'GERENTE');

-- CreateEnum
CREATE TYPE "tipo_status" AS ENUM ('AGUARDANDO_PAGAMENTO', 'CONFIRMADO', 'EM_PREPARO', 'PRONTO', 'ENTREGUE', 'CANCELADO');

-- CreateEnum
CREATE TYPE "canal_pedido" AS ENUM ('APP', 'TOTEM', 'BALCAO', 'PICKUP', 'WEB');

-- CreateEnum
CREATE TYPE "pagamento_status" AS ENUM ('PENDENTE', 'APROVADO', 'RECUSADO');

-- CreateEnum
CREATE TYPE "pagamento_metodo" AS ENUM ('PIX', 'DEBITO', 'CREDITO');

-- CreateEnum
CREATE TYPE "tipo_pontos" AS ENUM ('DEBITO', 'CREDITO');

-- CreateEnum
CREATE TYPE "fidelidade_status" AS ENUM ('DISPONIVEL', 'VINCULADO', 'UTILIZADO', 'EXPIRADO');

-- CreateEnum
CREATE TYPE "origem" AS ENUM ('CLIENTE', 'ESTABELECIMENTO', 'SISTEMA');

-- CreateTable
CREATE TABLE "usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "perfil" "tipo_usuarios" NOT NULL,
    "senha_hash" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "data_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP(3) NOT NULL,
    "unidade_id" INTEGER,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unidade" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "logradouro" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "data_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "unidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produto" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "preco" DECIMAL(10,2) NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "data_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "produto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estoque_unidade" (
    "id" SERIAL NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "disponivel" BOOLEAN NOT NULL DEFAULT true,
    "data_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP(3) NOT NULL,
    "unidade_id" INTEGER NOT NULL,
    "produto_id" INTEGER NOT NULL,

    CONSTRAINT "estoque_unidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pedido" (
    "id" SERIAL NOT NULL,
    "status" "tipo_status" NOT NULL DEFAULT 'AGUARDANDO_PAGAMENTO',
    "canal_pedido" "canal_pedido" NOT NULL,
    "data_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP(3) NOT NULL,
    "cliente_id" INTEGER NOT NULL,
    "criado_por" INTEGER NOT NULL,
    "unidade_id" INTEGER NOT NULL,
    "campanha_id" INTEGER,
    "valor_total" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "pedido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_pedido" (
    "id" SERIAL NOT NULL,
    "pedido_id" INTEGER NOT NULL,
    "produto_id" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "preco_unitario" DECIMAL(10,2) NOT NULL,
    "data_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "item_pedido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pagamento" (
    "id" SERIAL NOT NULL,
    "pedido_id" INTEGER NOT NULL,
    "status" "pagamento_status" NOT NULL DEFAULT 'PENDENTE',
    "valor" DECIMAL(10,2) NOT NULL,
    "metodo" "pagamento_metodo" NOT NULL,
    "identificador_unico" TEXT NOT NULL,
    "data_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pagamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "programa_pontos" (
    "id" SERIAL NOT NULL,
    "cliente_id" INTEGER NOT NULL,
    "saldo_pontos" INTEGER NOT NULL,
    "consentimento" BOOLEAN NOT NULL DEFAULT false,
    "data_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "programa_pontos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movimentacao_pontos" (
    "id" SERIAL NOT NULL,
    "programa_pontos_id" INTEGER NOT NULL,
    "pedido_id" INTEGER NOT NULL,
    "tipo" "tipo_pontos" NOT NULL,
    "data_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP(3) NOT NULL,
    "quantidade_pontos" INTEGER NOT NULL,

    CONSTRAINT "movimentacao_pontos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "beneficio_fidelidade" (
    "id" SERIAL NOT NULL,
    "programa_pontos_id" INTEGER NOT NULL,
    "pedido_id" INTEGER,
    "status" "fidelidade_status" NOT NULL DEFAULT 'DISPONIVEL',
    "valor_maximo" DECIMAL(10,2) NOT NULL,
    "valor_utilizado" DECIMAL(10,2),
    "data_liberacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_expiracao" TIMESTAMP(3) NOT NULL,
    "data_utilizacao" TIMESTAMP(3),
    "data_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "beneficio_fidelidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cancelamento" (
    "id" SERIAL NOT NULL,
    "pedido_id" INTEGER NOT NULL,
    "usuario_id" INTEGER,
    "origem" "origem" NOT NULL,
    "motivo" TEXT NOT NULL,
    "data_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cancelamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campanha" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "percentual_desconto" DECIMAL(10,2) NOT NULL,
    "data_inicio" TIMESTAMP(3) NOT NULL,
    "data_fim" TIMESTAMP(3) NOT NULL,
    "data_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP(3) NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "campanha_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "estoque_unidade_unidade_id_produto_id_key" ON "estoque_unidade"("unidade_id", "produto_id");

-- CreateIndex
CREATE UNIQUE INDEX "item_pedido_pedido_id_produto_id_key" ON "item_pedido"("pedido_id", "produto_id");

-- CreateIndex
CREATE UNIQUE INDEX "pagamento_identificador_unico_key" ON "pagamento"("identificador_unico");

-- CreateIndex
CREATE UNIQUE INDEX "programa_pontos_cliente_id_key" ON "programa_pontos"("cliente_id");

-- CreateIndex
CREATE UNIQUE INDEX "beneficio_fidelidade_pedido_id_key" ON "beneficio_fidelidade"("pedido_id");

-- CreateIndex
CREATE UNIQUE INDEX "cancelamento_pedido_id_key" ON "cancelamento"("pedido_id");

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_unidade_id_fkey" FOREIGN KEY ("unidade_id") REFERENCES "unidade"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estoque_unidade" ADD CONSTRAINT "estoque_unidade_unidade_id_fkey" FOREIGN KEY ("unidade_id") REFERENCES "unidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estoque_unidade" ADD CONSTRAINT "estoque_unidade_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedido" ADD CONSTRAINT "pedido_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedido" ADD CONSTRAINT "pedido_criado_por_fkey" FOREIGN KEY ("criado_por") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedido" ADD CONSTRAINT "pedido_unidade_id_fkey" FOREIGN KEY ("unidade_id") REFERENCES "unidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedido" ADD CONSTRAINT "pedido_campanha_id_fkey" FOREIGN KEY ("campanha_id") REFERENCES "campanha"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_pedido" ADD CONSTRAINT "item_pedido_pedido_id_fkey" FOREIGN KEY ("pedido_id") REFERENCES "pedido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_pedido" ADD CONSTRAINT "item_pedido_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pagamento" ADD CONSTRAINT "pagamento_pedido_id_fkey" FOREIGN KEY ("pedido_id") REFERENCES "pedido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "programa_pontos" ADD CONSTRAINT "programa_pontos_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movimentacao_pontos" ADD CONSTRAINT "movimentacao_pontos_programa_pontos_id_fkey" FOREIGN KEY ("programa_pontos_id") REFERENCES "programa_pontos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movimentacao_pontos" ADD CONSTRAINT "movimentacao_pontos_pedido_id_fkey" FOREIGN KEY ("pedido_id") REFERENCES "pedido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "beneficio_fidelidade" ADD CONSTRAINT "beneficio_fidelidade_programa_pontos_id_fkey" FOREIGN KEY ("programa_pontos_id") REFERENCES "programa_pontos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "beneficio_fidelidade" ADD CONSTRAINT "beneficio_fidelidade_pedido_id_fkey" FOREIGN KEY ("pedido_id") REFERENCES "pedido"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cancelamento" ADD CONSTRAINT "cancelamento_pedido_id_fkey" FOREIGN KEY ("pedido_id") REFERENCES "pedido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cancelamento" ADD CONSTRAINT "cancelamento_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
