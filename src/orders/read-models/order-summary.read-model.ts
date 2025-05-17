import { Entity, Column, PrimaryColumn } from 'typeorm';

interface OrderItem {
  idProduto: string;
  nomeProduto: string;
  descricaoProduto: string;
  categoria: string;
  precoUnitario: number;
  quantidade: number;
  precoTotal: number;
}

interface Payment {
  codigoTransacao: string;
  dataPagamento: string;
  totalPago: number;
}

@Entity('read_orders_summary')
export class OrderSummaryReadModel {
  @PrimaryColumn({ name: 'idPedido' })
  idPedido: string;

  @Column({ name: 'cpfCliente' })
  cpfCliente: string;

  @Column({ name: 'status' })
  status: string;

  @Column({ name: 'criadoEm' })
  criadoEm: Date;

  @Column({ name: 'pagamento', type: 'jsonb' })
  pagamento: Payment;

  @Column({ name: 'items', type: 'jsonb' })
  items: OrderItem[];
} 