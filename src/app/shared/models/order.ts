export class Order {
  quantity: number;
  user?: number;
  product: {
    product_name: string;
    product_price: number;
    link: number;
    comment?: string;
    supplier: number;
  };
}
