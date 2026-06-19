import React, { useState } from "react";
import TopBar from "../Components/TopBar/TopBar";
import TableNavlinks from "../Components/TableNavlinks";
import Table from "../Components/Table";
import usepayments from "../hooks/Sales/usepayments";
import ModalDelete from "../Components/modals/modalDelet";
import useDeletepayment from "../hooks/Sales/useDeletepayment";

function Sales() {
  const [showModal, setShowModal] = useState(false);
  const [currentClient, setCurrentClient] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const { paymentsData, page, setpage } = usepayments();
  const Deletepayment = useDeletepayment();

  const headers = [
    { key: "amount", value: "Amount" },
    { key: "status", value: "Status" },
    // { key: "payment_method", value: "Payment methid" },
    { key: "description", value: "Description" },
    { key: "customer_email", value: "Customer" },
    { key: "transaction_date", value: "transaction_date" },
  ];
  return (
    <>
      <TopBar title="Sales" />
      <TableNavlinks
        tabs={[
          { label: "All payments" },
          { label: "Succeed" },
          { label: "Refunded" },
          { label: "Disputed" },
        ]}
      />
      <Table
        data={paymentsData}
        headers={headers}
        page={page}
        setpage={setpage}
        actions={[
          {
            label: "✏️",
            onClick: (item) => {
              setCurrentClient(item.id);
              //   setShowModal(true);
            },
          },

          {
            label: "🗑",
            onClick: (item) => {
              setDeleteId(item.id);
              setDeleteModal(true);
            },
          },
        ]}
      />
      <ModalDelete
        open={deleteModal}
        setOpen={setDeleteModal}
        title="Delete payment "
        message="Are you sure you want to delete this payment?"
        onConfirm={() => Deletepayment(deleteId)}
      />
    </>
  );
}

export default Sales;
