import { clienteSchema, produtoSchema, pedidoSchema } from './schemas';
import { z } from 'zod';

const zodToJsonSchema = (schema: z.ZodType<any, any, any>) => {
  // A simple converter for demonstration. Real-world might need a library.
  if (schema instanceof z.ZodObject) {
    const shape = schema.shape;
    const properties: Record<string, any> = {};
    for (const key in shape) {
      properties[key] = zodToJsonSchema(shape[key]);
    }
    return { type: 'object', properties };
  }
  if (schema instanceof z.ZodArray) {
    return { type: 'array', items: zodToJsonSchema(schema.element) };
  }
  if (schema instanceof z.ZodString) {
    return { type: 'string', format: schema.isEmail ? 'email' : undefined };
  }
  if (schema instanceof z.ZodNumber) {
    return { type: 'number' };
  }
   if (schema instanceof z.ZodOptional || schema instanceof z.ZodNullable) {
    return { ...zodToJsonSchema(schema.unwrap()), optional: true };
  }
  if (schema instanceof z.ZodDefault) {
     return { ...zodToJsonSchema(schema.removeDefault()), default: schema._def.defaultValue() };
  }
  if (schema instanceof z.ZodEnum) {
    return { type: 'string', enum: schema.options };
  }
  return { type: 'any' };
};

const formatJson = (obj: any) => JSON.stringify(obj, null, 2);

const clienteExample = {
  nome: "Jose Couves",
  email: "jose.couves@example.com",
  telefone: "11912345678"
};

const produtoExample = {
  nome: "Monitor 4K",
  descricao: "Monitor de 27 polegadas com resolução 4K.",
  preco: 2500.50
};

const pedidoExample = {
  clienteId: 1,
  produtos: [
    { produtoId: 1, quantidade: 1 },
    { produtoId: 2, quantidade: 2 }
  ],
  status: "pendente"
};

export const apiSpec = [
  {
    resource: "Clientes",
    description: "Endpoints para gerenciar os clientes da plataforma.",
    endpoints: [
      {
        method: "GET",
        path: "/api/clientes",
        summary: "Listar todos os clientes",
        description: "Retorna uma lista completa de todos os clientes cadastrados no sistema.",
        responses: {
          '200': { description: "Lista de clientes.", code: formatJson([{ id: 1, ...clienteExample, createdAt: "2023-10-27T10:00:00.000Z" }]) },
        },
      },
      {
        method: "POST",
        path: "/api/clientes",
        summary: "Criar um novo cliente",
        description: "Cadastra um novo cliente no sistema. Os dados do cliente devem ser enviados no corpo da requisição.",
        requestBody: {
          description: "Dados do cliente para cadastro.",
          schema: zodToJsonSchema(clienteSchema),
          example: formatJson(clienteExample),
        },
        responses: {
          '201': { description: "Cliente criado com sucesso.", code: formatJson({ id: 4, ...clienteExample, createdAt: "2023-10-27T10:00:00.000Z" }) },
          '400': { description: "Dados inválidos.", code: formatJson({ error: "Erro de validação", issues: [] }) },
        },
      },
      {
        method: "GET",
        path: "/api/clientes/{id}",
        summary: "Buscar um cliente por ID",
        description: "Retorna os dados de um cliente específico com base no seu ID.",
        parameters: [{ name: "id", in: "path", description: "ID único do cliente.", required: true, schema: { type: 'integer' } }],
        responses: {
          '200': { description: "Dados do cliente.", code: formatJson({ id: 1, ...clienteExample, createdAt: "2023-10-27T10:00:00.000Z" }) },
          '404': { description: "Cliente não encontrado.", code: formatJson({ message: "Cliente não encontrado" }) },
        },
      },
      {
        method: "PUT",
        path: "/api/clientes/{id}",
        summary: "Atualizar um cliente",
        description: "Atualiza os dados de um cliente existente. Apenas os campos enviados no corpo da requisição serão atualizados.",
        parameters: [{ name: "id", in: "path", description: "ID único do cliente.", required: true, schema: { type: 'integer' } }],
        requestBody: {
          description: "Dados do cliente para atualização.",
          schema: zodToJsonSchema(clienteSchema.partial()),
          example: formatJson({ email: "novo.email@example.com" }),
        },
        responses: {
          '200': { description: "Cliente atualizado com sucesso.", code: formatJson({ id: 1, ...clienteExample, email: "novo.email@example.com", createdAt: "2023-10-27T10:00:00.000Z" }) },
          '404': { description: "Cliente não encontrado.", code: formatJson({ message: "Cliente não encontrado" }) },
        },
      },
      {
        method: "DELETE",
        path: "/api/clientes/{id}",
        summary: "Excluir um cliente",
        description: "Remove um cliente do sistema com base no seu ID.",
        parameters: [{ name: "id", in: "path", description: "ID único do cliente.", required: true, schema: { type: 'integer' } }],
        responses: {
          '200': { description: "Cliente excluído com sucesso.", code: formatJson({ message: "Cliente excluído com sucesso" }) },
          '404': { description: "Cliente não encontrado.", code: formatJson({ message: "Cliente não encontrado" }) },
        },
      },
    ],
  },
  {
    resource: "Produtos",
    description: "Endpoints para gerenciar os produtos disponíveis.",
    endpoints: [
        {
        method: "GET",
        path: "/api/produtos",
        summary: "Listar todos os produtos",
        description: "Retorna uma lista de todos os produtos cadastrados.",
        responses: { '200': { description: "Lista de produtos.", code: formatJson([{ id: 1, ...produtoExample, createdAt: "2023-10-27T10:00:00.000Z" }]) } },
      },
      {
        method: "POST",
        path: "/api/produtos",
        summary: "Criar um novo produto",
        description: "Cadastra um novo produto no sistema.",
        requestBody: {
          description: "Dados do produto para cadastro.",
          schema: zodToJsonSchema(produtoSchema),
          example: formatJson(produtoExample),
        },
        responses: {
          '201': { description: "Produto criado com sucesso.", code: formatJson({ id: 4, ...produtoExample, createdAt: "2023-10-27T10:00:00.000Z" }) },
          '400': { description: "Dados inválidos.", code: formatJson({ error: "Erro de validação", issues: [] }) },
        },
      },
      {
        method: "GET",
        path: "/api/produtos/{id}",
        summary: "Buscar um produto por ID",
        description: "Retorna os dados de um produto específico.",
        parameters: [{ name: "id", in: "path", description: "ID único do produto.", required: true, schema: { type: 'integer' } }],
        responses: {
          '200': { description: "Dados do produto.", code: formatJson({ id: 1, ...produtoExample, createdAt: "2023-10-27T10:00:00.000Z" }) },
          '404': { description: "Produto não encontrado.", code: formatJson({ message: "Produto não encontrado" }) },
        },
      },
      {
        method: "PUT",
        path: "/api/produtos/{id}",
        summary: "Atualizar um produto",
        description: "Atualiza os dados de um produto existente.",
        parameters: [{ name: "id", in: "path", description: "ID único do produto.", required: true, schema: { type: 'integer' } }],
        requestBody: {
          description: "Dados do produto para atualização.",
          schema: zodToJsonSchema(produtoSchema.partial()),
          example: formatJson({ preco: 2750.00 }),
        },
        responses: {
          '200': { description: "Produto atualizado com sucesso.", code: formatJson({ id: 1, ...produtoExample, preco: 2750.00, createdAt: "2023-10-27T10:00:00.000Z" }) },
          '404': { description: "Produto não encontrado.", code: formatJson({ message: "Produto não encontrado" }) },
        },
      },
      {
        method: "DELETE",
        path: "/api/produtos/{id}",
        summary: "Excluir um produto",
        description: "Remove um produto do sistema.",
        parameters: [{ name: "id", in: "path", description: "ID único do produto.", required: true, schema: { type: 'integer' } }],
        responses: {
          '200': { description: "Produto excluído com sucesso.", code: formatJson({ message: "Produto excluído com sucesso" }) },
          '404': { description: "Produto não encontrado.", code: formatJson({ message: "Produto não encontrado" }) },
        },
      },
    ],
  },
  {
    resource: "Pedidos",
    description: "Endpoints para gerenciar pedidos, com relação a clientes.",
    endpoints: [
      {
        method: "GET",
        path: "/api/pedidos",
        summary: "Listar todos os pedidos",
        description: "Retorna uma lista de todos os pedidos, incluindo os dados do cliente associado a cada pedido.",
        responses: {
          '200': {
            description: "Lista de pedidos com dados do cliente.",
            code: formatJson([{ ...pedidoExample, id: 1, createdAt: "2023-10-27T10:00:00.000Z", cliente: { id: 1, ...clienteExample, createdAt: "2023-10-27T10:00:00.000Z" } }]),
          },
        },
      },
      {
        method: "POST",
        path: "/api/pedidos",
        summary: "Criar um novo pedido",
        description: "Cria um novo pedido associado a um cliente e contendo uma lista de produtos.",
        requestBody: {
          description: "Dados do pedido para cadastro.",
          schema: zodToJsonSchema(pedidoSchema),
          example: formatJson(pedidoExample),
        },
        responses: {
          '201': { description: "Pedido criado com sucesso.", code: formatJson({ id: 4, ...pedidoExample, createdAt: "2023-10-27T10:00:00.000Z" }) },
          '400': { description: "Dados inválidos.", code: formatJson({ error: "Erro de validação", issues: [] }) },
        },
      },
      {
        method: "GET",
        path: "/api/pedidos/{id}",
        summary: "Buscar um pedido por ID",
        description: "Retorna os dados de um pedido específico, incluindo os dados do cliente.",
        parameters: [{ name: "id", in: "path", description: "ID único do pedido.", required: true, schema: { type: 'integer' } }],
        responses: {
          '200': { description: "Dados do pedido.", code: formatJson({ ...pedidoExample, id: 1, createdAt: "2023-10-27T10:00:00.000Z", cliente: { id: 1, ...clienteExample, createdAt: "2023-10-27T10:00:00.000Z" } }) },
          '404': { description: "Pedido não encontrado.", code: formatJson({ message: "Pedido não encontrado" }) },
        },
      },
      {
        method: "PUT",
        path: "/api/pedidos/{id}",
        summary: "Atualizar um pedido",
        description: "Atualiza o status ou os produtos de um pedido existente.",
        parameters: [{ name: "id", in: "path", description: "ID único do pedido.", required: true, schema: { type: 'integer' } }],
        requestBody: {
          description: "Dados do pedido para atualização.",
          schema: zodToJsonSchema(pedidoSchema.partial()),
          example: formatJson({ status: "enviado" }),
        },
        responses: {
          '200': { description: "Pedido atualizado com sucesso.", code: formatJson({ ...pedidoExample, id: 1, status: 'enviado', createdAt: "2023-10-27T10:00:00.000Z" }) },
          '404': { description: "Pedido não encontrado.", code: formatJson({ message: "Pedido não encontrado" }) },
        },
      },
      {
        method: "DELETE",
        path: "/api/pedidos/{id}",
        summary: "Excluir um pedido",
        description: "Remove um pedido do sistema com base no seu ID.",
        parameters: [{ name: "id", in: "path", description: "ID único do pedido.", required: true, schema: { type: 'integer' } }],
        responses: {
          '200': { description: "Pedido excluído com sucesso.", code: formatJson({ message: "Pedido excluído com sucesso" }) },
          '404': { description: "Pedido não encontrado.", code: formatJson({ message: "Pedido não encontrado" }) },
        },
      },
    ],
  },
];
