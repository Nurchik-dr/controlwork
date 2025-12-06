import React from 'react'
import type { ItemType } from '../logic/ProductList'
import "./Row.css";
interface Props {
    item: ItemType;
    onDecrease: (id: number) => void;
}
export const Row: React.FC<Props> = ({ item, onDecrease }) => {
    return (
        <tr>
            <td>{item.title}</td>
            <td>{item.price ? `$${item.price}` : "-"}</td>
            <td>
                {item.stock > 0 ? item.stock : "Not avilable"}
                {item.stock > 0 && (
                    <button onClick={() => onDecrease(item.id)} style={{ marginLeft: 5 }}>-</button>
                )}
            </td>
        </tr>
    );
};

export default Row;