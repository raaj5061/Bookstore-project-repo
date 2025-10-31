import { useContext, useState } from "react";
import type { BookType } from "./Card";
import { bookContextObj } from "../Context/BookContext";
import EditModal from "./EditModal";

type EditCardType = {
    book: BookType;
}

function EditCard({ book }: EditCardType) { // Destructure props for cleaner code
    const { deleteBook } = useContext(bookContextObj);
    const [isModalOpen, setIsModalOpen] = useState(false); 

    function handleDelete(id: string) {
        deleteBook(id);
    }

    return (
        <div className="card-container mx-auto my-10 border col-sm-10">
            <div className="row flex flex-col md:flex-row">
                <div className="col-md-4 mx-auto my-auto">
                    
                    <img src={book.image} className="img-fluid rounded-start" alt="book pic" />
                </div>

                <div className="col-md-8">
                    <div className="card-body p-2">
                        <h5 className="card-title">{book.bookname.slice(0,20)}</h5>
                        <p className="card-text">Category: {book.category}</p>
                        <p className="card-text">Price: ₹{book.price}</p>
                        
                        <div className="flex mt-2 ">
                            {/* Button to open the modal */}
                            <button 
                                className="btn btn-primary btn-sm col-sm-5" 
                                onClick={() => setIsModalOpen(true)}
                            >
                                Edit
                            </button>

                            {/* Delete button */}
                            <button 
                                className="btn btn-danger btn-sm col-sm-5" 
                                onClick={() => { handleDelete(book.id as string) }}
                            >
                                X
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Render the modal if isModalOpen is true */}
            {isModalOpen && (
                <EditModal 
                    book={book} 
                    onClose={() => setIsModalOpen(false)} 
                />
            )}
        </div>
    );
}

export default EditCard;