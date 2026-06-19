import React, { useState } from "react";
import Table from "../Components/Table";
import TableNavlinks from "../Components/TableNavlinks";
import useProducts from "../hooks/Products/useProducts";
import useDeleteProduct from "../hooks/Products/useDeleteProduct";
import TableSkeleton from "../TableSkeleton";
import ModalProduct from "../Components/modals/ModalProduct";

function Products() {
  const { products2, page, setpage, searchValue, setsearchValue } =
    useProducts();
  const [open, setOpen] = useState(false);

  const { handleDelete } = useDeleteProduct();
  const [showModal, setShowModal] = useState(false);
  const [currentClient, setCurrentClient] = useState(null);
  const headers = [
    { key: "title", value: "Name" },
    { key: "tags", value: "Tags" },
    { key: "sales", value: "Sales" },
    { key: "sku", value: "SKU" },
    { key: "qty", value: "Qty" },
    { key: "price", value: "Price" },
  ];
  const ProductsFilters = [
    { label: "Tags", value: "Tags" },
    { label: "Sales", value: "Sales" },
    { label: "SKU", value: "SKU" },
    { label: "Qty", value: "Qty" },
    { label: "Price", value: "Price" },
  ];
  return (
    <div>
      <TableNavlinks
        // name={"All products"}
        // name2={"Features"}
        // name3={"Coupons"}
        // name4={"Tax rates"}
        tabs={[
          { label: "All products" },
          { label: "Features" },
          { label: "Coupons" },
          { label: "Tax rates" },
        ]}
        setsearchValue={setsearchValue}
        searchValue={searchValue}
        setOpen={setOpen}
        open={open}
        filterOptions={ProductsFilters}
      />

      <Table
        headers={headers}
        data={products2}
        // Delete={handleDelete}
        // modal={ModalProduct}
        page={page}
        setpage={setpage}
        actions={[
          {
            label: "✏️",
            onClick: (item) => {
              setCurrentClient(item.id);
              setShowModal(true);
            },
          },

          {
            label: "🗑",
            onClick: (item) => {
              handleDelete(item.id);
            },
          },
        ]}
      />
      <ModalProduct
        showModal={showModal}
        setShowModal={setShowModal}
        id={currentClient}
      />
    </div>
  );
}

export default Products;
