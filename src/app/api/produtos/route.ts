import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { produtoSchema } from '@/lib/schemas';

export async function GET() {
  const produtos = await db.produto.findMany();
  return NextResponse.json(produtos);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = produtoSchema.parse(body);
    const novoProduto = await db.produto.create({ data });
    return NextResponse.json(novoProduto, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Erro de validação", issues: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
