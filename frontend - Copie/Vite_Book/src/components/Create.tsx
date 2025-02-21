import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Book, FormField } from '../types.ts'; // Assurez-vous que les types sont définis correctement

function createFormField(
    field: FormField,
    values: Book,
    setValues: any,
) {
    return (
        <div className="form-group" key={field.name}>
            <label htmlFor={field.name}>
                {field.name}
            </label>
            <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                className="form-control"
                value={values[field.name]}
                onChange={e => {
                    setValues(prev => ({
                        ...prev,
                        [field.name]: e.target.value
                    }));
                }}
            />
        </div>
    );
}

export const createForm = (fields: { name: string, type: string, placeholder: string }[], data: any, setData: any, handleSubmit: any) => {
    return (
        <form onSubmit={handleSubmit}>
            {fields.map((field, index) => (
                <div key={index}>
                    <label htmlFor={field.name}>{field.name}</label>
                    <input
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={data[field.name]}
                        onChange={(e) => setData({ ...data, [field.name]: e.target.value })}
                    />
                </div>
            ))}
            <button type="submit">Submit</button>
        </form>
    );
}
function Create() {
    const fields = [
        { name: "titre", type: "text", placeholder: "Titre du livre" },
        { name: "auteur", type: "text", placeholder: "Nom de l'auteur" },
        { name: "ISBN", type: "text", placeholder: "Numéro ISBN" }
    ];
    const navigate = useNavigate();

    const handleSubmit = async (
        e: any
    ) => {
        e.preventDefault();
        console.log(values);
        try {
            const res = await axios.post('http://localhost:3000/api/books', values);
            console.log(res);
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    }

    const [values, setValues] = useState<Book>({
        titre: '',
        auteur: '',
        ISBN: ''
    });

    return (
        <>
            <h1>Create</h1>
            {createForm(fields, values, setValues, handleSubmit)}
        </>
    );
}

export default Create;
