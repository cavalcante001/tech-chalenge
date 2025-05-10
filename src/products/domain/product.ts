import { ProductStock } from './value-objects/product-stock';

export class Product {
  constructor(
    public readonly id: string,
    private _name: string,
    private _description: string,
    private _price: number,
    private _categoryId: string,
    private _stock: ProductStock,
    private _createdAt: Date,
    private _updatedAt: Date,
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this._name) {
      throw new Error('O nome do produto é obrigatório.');
    }

    if (!this._description) {
      throw new Error('A descrição do produto é obrigatória.');
    }

    if (!this._categoryId) {
      throw new Error('O ID da categoria é obrigatório.');
    }

    if (!this._price || this._price <= 0) {
      throw new Error('O preço do produto é obrigatório e deve ser maior que zero.');
    }

    if (!this._stock) {
      throw new Error('O estoque é obrigatório.');
    }
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get price(): number {
    return this._price;
  }

  get categoryId(): string {
    return this._categoryId;
  }

  get stock(): ProductStock {
    return this._stock;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }
}
