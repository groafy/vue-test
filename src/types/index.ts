export interface IProductRating {
  rate: number,
  count: number
}

export interface IProductItem {
  category: string,
  description: string,
  id: number,
  image: string,
  rating: IProductRating,
  title: string,
  price: number
}

export interface ICategory {
  displayName: string;
  value: string;
  count: number;
}
