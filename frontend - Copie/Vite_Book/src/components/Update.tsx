import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { createForm } from './Create.tsx';
import { Book } from '../types.ts'; // Assurez-vous que les types sont définis correctement

function Update() {
    const fields = [
        { name: "titre", type: "text", placeholder: "A meaningful title" },
        { name: "auteur", type: "text", placeholder: "Author's name" },
        { name: "ISBN", type: "text", placeholder: "ISBN number" }
    ];

    const navigate = useNavigate();
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

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const res = await axios.put(`http://localhost:3000/api/books/${id}`, book);
            console.log(res);
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <h1>Update: {id}</h1>
            {book ? createForm(fields, book, setBook, handleSubmit) : <p>Loading...</p>}
        </>
    );
}

export default Update;
