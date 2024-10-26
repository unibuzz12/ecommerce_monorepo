export interface Order {
    id?: string;
    product_id: string;
    name: string;
    inventory_count: number;
    price: number;
    date: Date;
  }
  