export class OrderItem {
    constructor(
        public readonly id: string,
        public readonly productId: string,
        public readonly productName: string,
        public readonly productDescription: string,
        public readonly unitPrice: number,
        public readonly quantity: number,
        public readonly categoryName: string,
    ) {}

    get totalPrice() {
        return this.unitPrice * this.quantity;
    }
}
