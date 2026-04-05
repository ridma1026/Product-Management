export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  image?: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
  category: string;
}