import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { produtoSchema } from '@/lib/schemas';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ message: 'ID inválido' }, { status: 400 });
  }
  const produto = await db.produto.findUnique({ where: { id } });
  if (!produto) {
    return NextResponse.json({ message: 'Produto não encontrado' }, { status: 404 });
  }
  return NextResponse.json(produto);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ message: 'ID inválido' }, { status: 400 });
  }

  try {
    const body = await request.json();
    const data = produtoSchema.partial().parse(body);
    const produtoAtualizado = await db.produto.update({
      where: { id },
      data,
    });
     if (!produtoAtualizado) {
      return NextResponse.json({ message: 'Produto não encontrado' }, { status: 404 });
    }
    return NextResponse.json(produtoAtualizado);
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

  const produtoExcluido = await db.produto.delete({ where: { id } });

  if (!produtoExcluido) {
    return NextResponse.json({ message: 'Produto não encontrado' }, { status: 404 });
  }
  
  return NextResponse.json({ message: 'Produto excluído com sucesso' });
}
