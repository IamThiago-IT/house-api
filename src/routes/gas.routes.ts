import { FastifyInstance } from "fastify";
import { prisma } from "../server.js";

export async function gasRoutes(app: FastifyInstance) {
  // Criar
  app.post("/", {
    schema: {
      description: "Cria um novo registro de troca de gás",
      tags: ["Gás"],
      body: {
        type: "object",
        properties: {
          quantidade: { type: "integer" },
          preco_unitario: { type: "number" },
          local_compra: { type: "string" },
          telefone_contato: { type: "string" },
          observacao: { type: "string" },
        },
        required: ["quantidade", "preco_unitario", "local_compra", "telefone_contato"],
      },
    },
  }, async (req, reply) => {
    const { quantidade, preco_unitario, local_compra, telefone_contato, observacao } = req.body as any;
    const qtd = Number(quantidade);
    const preco = Number(preco_unitario);
    const custo_total = qtd * preco;

    const gas = await prisma.gasExchange.create({
      data: { quantidade: qtd, preco_unitario: preco, local_compra, telefone_contato, observacao, custo_total },
    });
    reply.send(gas);
  });

  // Listar
  app.get("/", {
    schema: { description: "Lista todas as trocas de gás", tags: ["Gás"] },
  }, async () => prisma.gasExchange.findMany());

  // Buscar por ID
  app.get("/:id", {
    schema: { description: "Busca uma troca de gás por ID", tags: ["Gás"] },
  }, async (req) => {
    const { id } = req.params as any;
    return prisma.gasExchange.findUnique({ where: { id: Number(id) } });
  });

  // Atualizar
  app.put("/:id", {
    schema: { description: "Atualiza uma troca de gás existente", tags: ["Gás"] },
  }, async (req, reply) => {
    const { id } = req.params as any;
    const { quantidade, preco_unitario, local_compra, telefone_contato, observacao } = req.body as any;
    const qtd = Number(quantidade);
    const preco = Number(preco_unitario);
    const custo_total = qtd * preco;

    const gas = await prisma.gasExchange.update({
      where: { id: Number(id) },
      data: { quantidade: qtd, preco_unitario: preco, local_compra, telefone_contato, observacao, custo_total },
    });

    reply.send(gas);
  });

  // Deletar
  app.delete("/:id", {
    schema: { description: "Remove uma troca de gás", tags: ["Gás"] },
  }, async (req) => {
    const { id } = req.params as any;
    return prisma.gasExchange.delete({ where: { id: Number(id) } });
  });

  // Média
  app.get("/media", {
    schema: { description: "Calcula o gasto médio e preço médio por botijão", tags: ["Gás"] },
  }, async () => {
    const registros = await prisma.gasExchange.findMany();
    if (registros.length === 0) return { mediaGasto: 0, mediaPorBotijao: 0 };

    const totalGasto = registros.reduce((acc, r) => acc + r.custo_total, 0);
    const totalQtd = registros.reduce((acc, r) => acc + r.quantidade, 0);
    return { mediaGasto: totalGasto / registros.length, mediaPorBotijao: totalGasto / totalQtd };
  });
}
