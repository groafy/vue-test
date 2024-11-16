export interface IProdcutRating {
  rate: number,
  count: number
}

export interface IProductItem {
  category: string,
  description: string,
  id: number,
  image: string,
  rating: IProdcutRating,
  title: string
}

export interface ICategory {
  displayName: string;
  value: string;
  count: number;
}
