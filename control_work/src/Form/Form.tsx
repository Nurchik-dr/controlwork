import React, { useState } from 'react'
import "./Form.css";
interface Props {
    onAdd: (item: {
        title: string;
        price?: number;
        stock?: number
    }) => void;
}
export const Form: React.FC<Props> = ({ onAdd }) => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) {
            return alert("Введите название товара");
        }
        onAdd({
            title: title.trim(),
            price: price ? Number(price) : undefined,
            stock: stock ? Number(stock) : undefined,
        });
        setPrice("");
        setStock("");
        setTitle("");
    }
    return (
        <form onSubmit={handleSubmit} className='form'>
            <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
            <input placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} type="number" min={0} />
            <input placeholder="Stock" value={stock} onChange={e => setStock(e.target.value)} type="number" min={0} />
            <button type="submit">Add / Ubdate</button>
        </form>
    )
}

export default Form;