import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { clienteSchema } from '@/lib/schemas';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ message: 'ID inválido' }, { status: 400 });
  }
  const cliente = await db.cliente.findUnique({ where: { id } });
  if (!cliente) {
    return NextResponse.json({ message: 'Cliente não encontrado' }, { status: 404 });
  }
  return NextResponse.json(cliente);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ message: 'ID inválido' }, { status: 400 });
  }
  
  try {
    const body = await request.json();
    const data = clienteSchema.partial().parse(body);

    const clienteAtualizado = await db.cliente.update({
      where: { id },
      data,
    });

    if (!clienteAtualizado) {
      return NextResponse.json({ message: 'Cliente não encontrado' }, { status: 404 });
    }

    return NextResponse.json(clienteAtualizado);
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

  const clienteExcluido = await db.cliente.delete({ where: { id } });

  if (!clienteExcluido) {
    return NextResponse.json({ message: 'Cliente não encontrado' }, { status: 404 });
  }

  return NextResponse.json({ message: 'Cliente excluído com sucesso' });
}
