import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { pedidoSchema } from '@/lib/schemas';

export async function GET() {
  const pedidos = await db.pedido.findMany({
    include: {
      cliente: true,
    },
  });
  return NextResponse.json(pedidos);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = pedidoSchema.parse(body);

    const clienteExists = await db.cliente.findUnique({ where: { id: data.clienteId } });
    if (!clienteExists) {
        return NextResponse.json({ message: `Cliente com ID ${data.clienteId} não encontrado.`}, { status: 400 });
    }

    for (const item of data.produtos) {
        const produtoExists = await db.produto.findUnique({ where: {id: item.produtoId}});
        if (!produtoExists) {
            return NextResponse.json({ message: `Produto com ID ${item.produtoId} não encontrado.`}, { status: 400 });
        }
    }

    const novoPedido = await db.pedido.create({ data });
    return NextResponse.json(novoPedido, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Erro de validação", issues: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
