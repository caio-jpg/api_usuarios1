import { z } from 'zod';

export const clienteSchema = z.object({
  nome: z.string({ required_error: 'O nome é obrigatório.' }).min(3, { message: 'O nome deve ter no mínimo 3 caracteres.' }),
  email: z.string({ required_error: 'O email é obrigatório.' }).email({ message: 'Email inválido.' }),
  telefone: z.string().optional(),
});

export const produtoSchema = z.object({
  nome: z.string({ required_error: 'O nome é obrigatório.' }).min(3, { message: 'O nome do produto deve ter no mínimo 3 caracteres.' }),
  descricao: z.string().optional(),
  preco: z.number({ required_error: 'O preço é obrigatório.' }).positive({ message: 'O preço deve ser um número positivo.' }),
});

const pedidoProdutoSchema = z.object({
  produtoId: z.number({ required_error: 'O ID do produto é obrigatório.' }),
  quantidade: z.number({ required_error: 'A quantidade é obrigatória.' }).int().positive({ message: 'A quantidade deve ser um inteiro positivo.' }),
});

export const pedidoSchema = z.object({
  clienteId: z.number({ required_error: 'O ID do cliente é obrigatório.' }),
  produtos: z.array(pedidoProdutoSchema).min(1, { message: 'O pedido deve conter pelo menos um produto.' }),
  status: z.enum(['pendente', 'processando', 'enviado', 'entregue']).optional().default('pendente'),
});
