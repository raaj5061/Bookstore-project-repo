import { createContext, useState, useCallback, type ReactNode, useContext } from "react";
import type { BookType } from "../components/Card";
import { bookContextObj } from "./BookContext";
 
export type ReviewType = {
  rating: number;
  title: string;
  content: string;
  displayName: string;
};
 
export type ReviewContextType = {
  reviews: ReviewType[];
  averageRating: number;
  isLoading: boolean;
  error: string | null;
  getReviewsForBook: (bookId: string) => {};
  addReviewForBook: (bookId: string, reviewData: ReviewType) => {};
  allBooks: BookType[];
  getAllReviews: ()=> {};
  deleteReview: (bookId: string, reviewToDelete: ReviewType) => {};
};
 
export const reviewContextObj = createContext<ReviewContextType>({
  reviews: [],
  averageRating: 0,
  isLoading: false,
  error: null,
  getReviewsForBook: async () => {},
  addReviewForBook: async () => {},
  allBooks: [],
  getAllReviews:async ()=> {},
  deleteReview: async ()=>{},
});
 
type ContextProps = { children: ReactNode };
 
function ReviewContext(props: ContextProps) {
  //state
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [allBooks, setAllBooks]= useState<BookType[]>([]);
  const {data}=useContext(bookContextObj)
 
  const getReviewsForBook = useCallback(async (bookId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:3000/book-api/books/${bookId}`);
      if (!res.ok) {
        throw new Error("Failed to fetch reviews.");
      }
      const book: BookType = await res.json();
      const bookReviews = book.reviews || [];
      setReviews(bookReviews);
 
      if (bookReviews.length > 0) {
        const totalRating = bookReviews.reduce((sum, review) => sum + review.rating, 0);
        setAverageRating(totalRating / bookReviews.length);
      } else {
        setAverageRating(0);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  }, []);
 
  const addReviewForBook = useCallback(
    async (bookId: string, newReview: ReviewType) => {
      setIsLoading(true);
      setError(null);
      try {
        // Step 1: Fetch the current book
        const bookRes = await fetch(`http://localhost:3000/books/${bookId}`);
        if (!bookRes.ok) {
          throw new Error("Could not find the book to review.");
        }
        const currentBook: BookType = await bookRes.json();
 
        // Step 2: Add the new review to the existing list
        const updatedReviews = [...(currentBook.reviews || []), newReview];
        const updatedBook: BookType = { ...currentBook, reviews: updatedReviews };
 
        // Step 3: Send the entire updated book object back to the server
        const updateResponse = await fetch(`http://localhost:3000/books/${bookId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedBook),
        });
 
        if (!updateResponse.ok) {
          throw new Error("Failed to submit the review.");
        }
 
        // Step 4: Refresh the reviews to show the new one
        await getReviewsForBook(bookId);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred.");
      } finally {
        setIsLoading(false);
      }
    },
    [getReviewsForBook]
  );
 
  const getAllReviews= async () =>{
    setIsLoading(true);
    setError(null);
    setAllBooks(data);
  }
 
  const deleteReview = async (bookId: string, reviewToDelete: ReviewType)=>{
      try{
        const bookRes= await fetch (`http://localhost:3000/books/${bookId}`);
        const bookData: BookType = await bookRes.json();
 
        const updatedList = {
          ...bookData, reviews: (bookData.reviews || []).filter((review)=> review.title !== reviewToDelete.title)
        };
 
        await fetch(`http://localhost:3000/books/${bookId}`,{
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedList),
        });
        await getAllReviews();
      }
      catch(err){
        console.error("Failed to delete review:", err);
      }
    }
 
  return (
    <reviewContextObj.Provider
      value={{ reviews, averageRating, isLoading, error, getReviewsForBook, addReviewForBook, allBooks, getAllReviews, deleteReview}}
    >
      {props.children}
    </reviewContextObj.Provider>
  );
}
 
export default ReviewContext;