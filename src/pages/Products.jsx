import React from "react";
import Table from "../Components/Table";
import TableNavlinks from "../Components/TableNavlinks";
import useProducts from "../hooks/Products/useProducts";
import useDeleteProduct from "../hooks/Products/useDeleteProduct";
import TableSkeleton from "../TableSkeleton";

function Products() {
  const { products2, page, setpage, searchValue, setsearchValue } =
    useProducts();
  const { handleDelete } = useDeleteProduct();
  const headers = [
    { key: "title", value: "Name" },
    { key: "tags", value: "Tags" },
    { key: "sales", value: "Sales" },
    { key: "sku", value: "SKU" },
    { key: "qty", value: "Qty" },
    { key: "price", value: "Price" },
  ];
  return (
    <div>
      <TableNavlinks
        name={"All products"}
        name2={"Features"}
        name3={"Coupons"}
        name4={"Tax rates"}
        setsearchValue={setsearchValue}
        searchValue={searchValue}
      />

      <Table
        headers={headers}
        data={products2}
        Delete={handleDelete}
        modal={"products"}
        page={page}
        setpage={setpage}
      />
    </div>
  );
}

export default Products;
