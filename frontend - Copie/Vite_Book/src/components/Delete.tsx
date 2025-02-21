import { useParams, useNavigate, Link } from 'react-router-dom';
import { BACKEND_URL } from '../config.js';
import { useState, useEffect } from 'react';
import axios from 'axios';

function isLoading(loading: boolean) {
    return (
        loading ? <p>Loading...</p>
            : <>
                <p>Book successfully deleted</p>
                <Link to='/' className='btn btn-success'>Go Home</Link>
            </>
    );
}

function Delete() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const deleteBook = async () => {
            try {
                const res = await axios.delete(`${BACKEND_URL}/api/books/${id}`);
                console.log(res);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        deleteBook();
    }, [id]);

    return (
        <>
            {isLoading(loading)}
        </>
    );
}

export default Delete;
