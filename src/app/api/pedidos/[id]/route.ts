import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { pedidoSchema } from '@/lib/schemas';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ message: 'ID inválido' }, { status: 400 });
  }

  const pedido = await db.pedido.findUnique({
    where: { id },
    include: { cliente: true },
  });

  if (!pedido) {
    return NextResponse.json({ message: 'Pedido não encontrado' }, { status: 404 });
  }
  return NextResponse.json(pedido);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ message: 'ID inválido' }, { status: 400 });
  }

  try {
    const body = await request.json();
    const data = pedidoSchema.partial().parse(body);
    const pedidoAtualizado = await db.pedido.update({
      where: { id },
      data,
    });
    if (!pedidoAtualizado) {
        return NextResponse.json({ message: 'Pedido não encontrado' }, { status: 404 });
    }
    return NextResponse.json(pedidoAtualizado);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Erro de validação", issues: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ message: 'ID inválido' }, { status: 400 });
  }

  const pedidoExcluido = await db.pedido.delete({ where: { id } });

  if (!pedidoExcluido) {
    return NextResponse.json({ message: 'Pedido não encontrado' }, { status: 404 });
  }

  return NextResponse.json({ message: 'Pedido excluído com sucesso' });
}
