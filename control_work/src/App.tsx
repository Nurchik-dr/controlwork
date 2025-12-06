import React from 'react'
import { Calculator } from './logic/ProductList'
import { Table } from "./Table/Table";
import { Form } from "./Form/Form";

const App: React.FC = () => {
  const { items, addOrUpdate, decreaseStock, sortBy } = Calculator();
  return (
    <div style={{ padding: "20px" }}>
      <Table items={items} onDecrease={decreaseStock} onSort={sortBy} />
      <Form onAdd={addOrUpdate} />
    </div>
  )
}

export default App;