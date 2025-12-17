import { useState } from 'react'

export interface ItemType {
    id: number;
    title: string;
    price?: number;
    stock: number;
}

export const Calculator = () => {
    const [items, setItems] = useState<ItemType[]>([
        { id: 1, title: "Acer Predator", price: 1500, stock: 5 },
        { id: 2, title: "Asus ROG", price: 1200, stock: 3 },
        { id: 3, title: "MacBook Pro", price: 2500, stock: 2 },
    ]);

    const addOrUpdate = (newItem: Partial<ItemType> & { title: string }) => {
        setItems(prev => {
            const existingItem = prev.findIndex(
                item => item.title.toLowerCase() === newItem.title.toLowerCase()
            );
            const stockValue = newItem.stock !== undefined ? Number(newItem.stock) : 0;
            const priceValue = newItem.price !== undefined ? Number(newItem.price) : undefined;

            if (existingItem !== -1) {
                if (confirm(`Товар "${newItem.title}" уже существует. Заменить?`)) {
                    const updated = { ...prev[existingItem] };
                    const hasPrice = newItem.price !== undefined;
                    const hasStock = newItem.stock !== undefined;

                    if (hasPrice) updated.price = newItem.price;
                    if (hasStock) {
                        updated.stock = updated.stock <= 0
                            ? newItem.stock!
                            : updated.stock + newItem.stock!;
                    }

                    const copy = [...prev];
                    copy[existingItem] = updated;
                    return copy;
                } else {
                    const copy = [...prev];
                    const uniqueTitle = `${newItem.title}-${Date.now()}`;
                    copy.push({
                        id: Date.now(),
                        title: uniqueTitle,
                        price: priceValue,
                        stock: stockValue
                    });
                    return copy;
                }
            } else {
                return [
                    ...prev,
                    {
                        id: Date.now(),
                        title: newItem.title,
                        price: priceValue,
                        stock: stockValue
                    }
                ];
            }
        });
    };

    const [sortDirection, setSortDirection] = useState<{
        [key in keyof ItemType]?: "asc" | "desk";
    }>({});

    const decreaseStock = (id: number) => {
        setItems(prev =>
            prev.map(item =>
                item.id === id ? { ...item, stock: Math.max(item.stock - 1, 0) } : item
            )
        );
    };

    const sortBy = (key: keyof ItemType) => {
        const direction = sortDirection[key] === "asc" ? "desc" : "asc";
        setSortDirection(prev => ({ ...prev, [key]: direction }));

        setItems(prev => [...prev].sort((a, b) => {
            if (key === "title") {
                return direction === "asc"
                    ? a.title.localeCompare(b.title)
                    : b.title.localeCompare(a.title);
            } else {
                const valA = a[key] ?? 0;
                const valB = b[key] ?? 0;
                return direction === "asc" ? valA - valB : valB - valA;
            }
        }));
    };
    return { items, addOrUpdate, decreaseStock, sortBy };
};
