export default interface IProduct {
  _id: string;
  productName: string;
  slug: string;
  category: string;
  price: number;
  inventory: number;
  description: string;
  quantity: number;
  colors: string[];
  status: string;
  image: string;
}