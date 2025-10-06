import { ApiDocumentation } from '@/components/api-documentation';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8 md:py-16">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-primary font-headline md:text-6xl">
          API 
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Bem-vindo à documentação da API. Explore nossos endpoints para gerenciar clientes, produtos e pedidos de forma eficiente e integrada.
        </p>
      </header>
      <ApiDocumentation />
    </main>
  );
}
