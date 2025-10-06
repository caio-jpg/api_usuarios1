# API de Usuários - Documentação

Este projeto é uma API RESTful moderna construída com Next.js e TypeScript para a matéria de Tópicos Especiais em TI, fornecendo endpoints para gerenciamento de clientes, produtos e pedidos.

## 🚀 Estrutura do Projeto

```
src/
├── app/                    # Rotas e configurações do Next.js
│   ├── api/               # Endpoints da API
│   │   ├── clientes/      # Gerenciamento de clientes
│   │   ├── pedidos/       # Gerenciamento de pedidos
│   │   └── produtos/      # Gerenciamento de produtos
│   └── globals.css        # Estilos globais
├── components/            # Componentes React reutilizáveis
│   ├── ui/               # Componentes de UI (shadcn/ui)
│   └── api-documentation # Documentação interativa da API
├── hooks/                # Hooks personalizados
└── lib/                  # Utilitários e configurações
```

## 🛠️ Tecnologias Utilizadas

- **Framework**: Next.js com TypeScript
- **UI Components**: shadcn/ui customizados
- **Estilização**: Tailwind CSS
- **Database**: Configurável através de `lib/db.ts`

## 📚 Endpoints da API

### Clientes
- `GET /api/clientes` - Lista todos os clientes
- `GET /api/clientes/[id]` - Obtém um cliente específico
- `POST /api/clientes` - Cria novo cliente
- `PUT /api/clientes/[id]` - Atualiza cliente
- `DELETE /api/clientes/[id]` - Remove cliente

### Produtos
- `GET /api/produtos` - Lista todos os produtos
- `GET /api/produtos/[id]` - Obtém um produto específico
- `POST /api/produtos` - Cria novo produto
- `PUT /api/produtos/[id]` - Atualiza produto
- `DELETE /api/produtos/[id]` - Remove produto

### Pedidos
- `GET /api/pedidos` - Lista todos os pedidos
- `GET /api/pedidos/[id]` - Obtém um pedido específico
- `POST /api/pedidos` - Cria novo pedido
- `PUT /api/pedidos/[id]` - Atualiza pedido
- `DELETE /api/pedidos/[id]` - Remove pedido

## 🎨 Componentes UI

O projeto inclui uma extensa biblioteca de componentes UI customizáveis:
- Accordions, Alerts, e Dialogs
- Forms e Inputs
- Tables e Cards
- Menus e Dropdowns
- Toasts e Notifications
- Charts e Visualizações

## 🔧 Configuração

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```
3. Configure as variáveis de ambiente em `.env`
4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## 📖 Documentação

A documentação interativa da API está disponível em:
- Interface da documentação: `/`
- Especificações da API: `src/lib/api-spec.ts`
- Schemas: `src/lib/schemas.ts`

## 💼 Recursos Adicionais

- Interface responsiva com suporte mobile (`hooks/use-mobile`)
- Sistema de notificações com toasts (`hooks/use-toast`)
- Schemas e validação de dados
- Suporte a imagens com placeholder
- UI Components altamente customizáveis

## 🤝 Contribuindo

1. Fork o projeto
2. Crie sua branch de feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

