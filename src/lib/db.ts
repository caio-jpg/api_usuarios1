// Mock implementation of Prisma Client
type Cliente = {
  id: number;
  nome: string;
  email: string;
  telefone?: string | null;
  createdAt: Date;
};

type Produto = {
  id: number;
  nome:string;
  descricao?: string | null;
  preco: number;
  createdAt: Date;
};

type Pedido = {
  id: number;
  clienteId: number;
  produtos: { produtoId: number; quantidade: number }[];
  status: 'pendente' | 'processando' | 'enviado' | 'entregue';
  createdAt: Date;
  cliente?: Cliente;
};

const data: {
  clientes: Cliente[];
  produtos: Produto[];
  pedidos: Pedido[];
} = {
  clientes: [
    { id: 1, nome: 'João da Silva', email: 'joao.silva@example.com', telefone: '11987654321', createdAt: new Date() },
    { id: 2, nome: 'Maria Oliveira', email: 'maria.oliveira@example.com', telefone: '21912345678', createdAt: new Date() },
    { id: 3, nome: 'Carlos Pereira', email: 'carlos.pereira@example.com', telefone: '31999998888', createdAt: new Date() },
  ],
  produtos: [
    { id: 1, nome: 'Notebook Ultra Fino', descricao: 'Notebook leve e potente para trabalho.', preco: 7500.00, createdAt: new Date() },
    { id: 2, nome: 'Mouse Ergonômico Vertical', descricao: 'Previne lesões por esforço repetitivo.', preco: 350.00, createdAt: new Date() },
    { id: 3, nome: 'Teclado Mecânico RGB', descricao: 'Teclado para gamers e programadores.', preco: 550.00, createdAt: new Date() },
  ],
  pedidos: [
    { id: 1, clienteId: 1, produtos: [{ produtoId: 1, quantidade: 1 }], status: 'entregue', createdAt: new Date() },
    { id: 2, clienteId: 2, produtos: [{ produtoId: 2, quantidade: 1 }, { produtoId: 3, quantidade: 1 }], status: 'enviado', createdAt: new Date() },
    { id: 3, clienteId: 1, produtos: [{ produtoId: 3, quantidade: 2 }], status: 'processando', createdAt: new Date() },
  ],
};

const createPrismaMock = <T extends { id: number, createdAt: Date }>(store: T[]) => ({
  findMany: async (options?: { include?: any }) => {
    if (options?.include) {
      return store.map(item => {
        const relations: any = {};
        for (const key in options.include) {
          if (key === 'cliente' && 'clienteId' in item) {
            relations.cliente = data.clientes.find(c => c.id === (item as any).clienteId);
          }
        }
        return { ...item, ...relations };
      });
    }
    return [...store];
  },
  findUnique: async (query: { where: { id: number }, include?: any }) => {
    const item = store.find(item => item.id === query.where.id);
    if (!item) return null;
    
    if (query.include) {
        const relations: any = {};
        for (const key in query.include) {
          if (key === 'cliente' && 'clienteId' in item) {
            relations.cliente = data.clientes.find(c => c.id === (item as any).clienteId);
          }
        }
        return { ...item, ...relations };
    }
    return { ...item };
  },
  create: async (query: { data: Omit<T, 'id' | 'createdAt'> }) => {
    const newId = store.length > 0 ? Math.max(...store.map(i => i.id)) + 1 : 1;
    const newItem = { ...query.data, id: newId, createdAt: new Date() } as T;
    store.push(newItem);
    return { ...newItem };
  },
  update: async (query: { where: { id: number }, data: Partial<Omit<T, 'id' | 'createdAt'>> }) => {
    const itemIndex = store.findIndex(item => item.id === query.where.id);
    if (itemIndex === -1) return null;
    store[itemIndex] = { ...store[itemIndex], ...query.data };
    return { ...store[itemIndex] };
  },
  delete: async (query: { where: { id: number } }) => {
    const itemIndex = store.findIndex(item => item.id === query.where.id);
    if (itemIndex === -1) return null;
    const deletedItem = store.splice(itemIndex, 1);
    return deletedItem[0];
  },
});

export const db = {
  cliente: createPrismaMock<Cliente>(data.clientes),
  produto: createPrismaMock<Produto>(data.produtos),
  pedido: createPrismaMock<Pedido>(data.pedidos),
};
