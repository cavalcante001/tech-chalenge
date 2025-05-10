export class Product {
    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly description: string | null,
        public readonly price: number,
        public readonly categoryId: string,
        public readonly createdAt: Date,
        public readonly updatedAt: Date
    ) {}
}
