import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Book } from '../types.ts'; // Assurez-vous que les types sont définis correctement

const renderTable = (data: Book[]) => {
    return (
        <table className="table table-dark">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Titre</th>
                    <th scope="col">Auteur</th>
                    <th scope="col">ISBN</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map((book, index) => {
                        return (
                            <tr key={index} scope="row">
                                <td>{index + 1}</td>
                                <td>{book.titre}</td>
                                <td>{book.auteur}</td>
                                <td>{book.ISBN}</td>
                                <td>
                                    <Link to={`/read/${book.ISBN}`} className='btn btn-info'>Read</Link>
                                    <Link to={`/update/${book.ISBN}`} className='btn btn-primary'>Edit</Link>
                                    <Link to={`/delete/${book.ISBN}`} className='btn btn-danger'>Delete</Link>
                                </td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </table>
    );
}

function Home() {
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        const getBooks = async () => {
            try {
                const res = await axios.get('http://localhost:3000/api/books');
                setBooks(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        getBooks();
    }, []);

    return (
        <>
            <h1>Home</h1>
            <Link to='/create' className='btn btn-success'>Create +</Link>
            {renderTable(books)}
        </>
    );
}

export default Home;
