import {createContext, useEffect, useState, type ReactNode} from 'react'
import type { BookType } from '../components/Card'

export type CounterContextProps={
    children:ReactNode
}
export type BookContextType={
    data:BookType[],
    error:string;
    editBook:(b:BookType)=>void
    deleteBook:(b:string)=>void;
    fetchBooks: ()=>void
}
export const bookContextObj = createContext<BookContextType>({
    data:[],
    error:"",
    editBook:()=>{},
    deleteBook:()=>{},
    fetchBooks:async()=>{}
})
function BookContext(props:CounterContextProps){
 
    //state
    const [data, setData]=useState<BookType[]>([]);
    //const [sortBy, setSortBy]=useState("");
    const [error, setError] = useState<string>("");
    const editBook=async(book:BookType)=>{
      let res=await fetch(`http://localhost:3000/book-api/edit-book/${book._id}`,{
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
      });
      if(res.status===200){
        fetchBooks()
      }
      else{
        setError("error modifying changes")
      }
    }

    const deleteBook=async(id:string)=>{
      let res=await fetch(`http://localhost:3000/book-api/delete-book/${id}`,{
        method:'DELETE'
      })
      if(res.status===200){
        console.log("deleted Succesfully")
        fetchBooks()
      }
      else{
        setError("Deletion Error")
      }
    }

    const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:3000/book-api/books');
      const dataList = await response.json();
      setData(dataList.payload);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error occurred");
      }
    }
    }
        useEffect(()=>{
            fetchBooks();
        },[]);
 
 
 
    return(
     <bookContextObj.Provider value={{data,error,editBook,deleteBook,fetchBooks}}>
            {props.children}
        </bookContextObj.Provider>
       
    )
}
export default BookContext
 