import Fastify from "fastify";
import cors from "@fastify/cors";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { PrismaClient } from "@prisma/client";
import { gasRoutes } from "./routes/gas.routes.js";

export const prisma = new PrismaClient();

const app = Fastify({ logger: true });

app.register(cors, { origin: true });

// 🧾 Swagger Docs
app.register(swagger, {
  openapi: {
    info: {
      title: "API do House",
      description: "Gerencia trocas das tarefas de casa",
      version: "1.0.0",
    },
  },
});

app.register(swaggerUi, {
  routePrefix: "/docs",
  uiConfig: {
    docExpansion: "list",
    deepLinking: false,
  },
});

// 🛠️ Rotas
app.register(gasRoutes, { prefix: "/gas" });

app.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
  console.log("🚀 Servidor rodando em http://localhost:3333");
  console.log("📘 Documentação Swagger: http://localhost:3333/docs");
});
