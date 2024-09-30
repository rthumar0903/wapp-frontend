import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export default function CustomerAttachment() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // ProductService.getProductsMini().then((data) => setProducts(data));
  }, []);

  return (
    <div className="card">
      <DataTable value={products} tableStyle={{ minWidth: "50rem" }}>
        <Column field="name" header="Name"></Column>
        <Column field="action" header="Action"></Column>
      </DataTable>
    </div>
  );
}
