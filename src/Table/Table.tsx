import React from 'react';
import type { ItemType } from '../logic/ProductList';
import Row from '../Row/Row';
import "./Table.css";

interface Props {
    items: ItemType[];
    onDecrease: (id: number) => void;
    onSort: (key: keyof ItemType) => void;
}

export const Table: React.FC<Props> = ({ items, onDecrease, onSort }) => {
    if ((items.length === 0)) {
        return <p className="noProduct">Нет товаров на складе</p>;
    }
    return (
        <table className='table'>
            <thead>
                <tr>
                    <th onClick={() => onSort("title")}>Title</th>
                    <th onClick={() => onSort("price")}>Price</th>
                    <th onClick={() => onSort("stock")}>Stock</th>
                </tr>
            </thead>
            <tbody>
                {items.map(item => (
                    <Row key={item.id} item={item} onDecrease={onDecrease} />
                ))}
            </tbody>
        </table>
    );
};
