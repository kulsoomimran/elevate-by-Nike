export default interface IProduct {
  id: string;
  productName: string;
  category: string;
  price: number;
  inventory: number;
  status: string;
  colors: string[],
  image: string;
  description: string;
}