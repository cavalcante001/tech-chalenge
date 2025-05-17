export class OrderSummaryViewModel {
  idPedido: string;
  cpfCliente: string;
  status: string;
  criadoEm: Date;
  pagamento: {
    codigoTransacao: string;
    dataPagamento: string;
    totalPago: number;
  };
  items: Array<{
    idProduto: string;
    nomeProduto: string;
    descricaoProduto: string;
    categoria: string;
    precoUnitario: number;
    quantidade: number;
    precoTotal: number;
  }>;
} 