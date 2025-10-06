import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { clienteSchema } from '@/lib/schemas';

export async function GET() {
  const clientes = await db.cliente.findMany();
  return NextResponse.json(clientes);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = clienteSchema.parse(body);
    const novoCliente = await db.cliente.create({ data });
    return NextResponse.json(novoCliente, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Erro de validação", issues: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
