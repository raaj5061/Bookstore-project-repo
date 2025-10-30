export interface ReviewI {
  rating: number; 
  title?: string;
  content?: string;
  displayName?: string;
}


export interface BookI {
  id: string;
  bookname: string;
  author?: string;
  image?: string;
  category: string;
  price: number; 
  quantity: number;
  publisher?: string;
  description?: string;
  reviews: ReviewI[];
}