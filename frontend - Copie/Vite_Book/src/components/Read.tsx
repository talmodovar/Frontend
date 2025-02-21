import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Book } from '../types.ts'; // Assurez-vous que les types sont définis correctement
import axios from 'axios';

function renderBook(book: Book) {
    return (
        <div>
            <h1>{book.titre}</h1>
            <p>{book.auteur}</p>
            <p>{book.ISBN}</p>
        </div>
    );
}

function Read() {
    const { id } = useParams();
    const [book, setBook] = useState<Book | null>(null);

    useEffect(() => {
        const getBook = async (isbn: string) => {
            try {
                const res = await axios.get(`http://localhost:3000/api/books/${isbn}`);
                const bookData = res.data;
                console.log(bookData);
                setBook(bookData);
            } catch (error) {
                console.log(error);
            }
        }
        if (id) {
            getBook(id);
        }
    }, [id]);

    return (
        <>
            {book ? renderBook(book) : <p>Loading...</p>}
            <h1>Read: {id}</h1>
            <Link to='/' className='btn btn-primary'>Home</Link>
        </>
    );
}

export default Read;
