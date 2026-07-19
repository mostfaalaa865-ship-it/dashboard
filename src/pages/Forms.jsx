import React, { useState } from "react";
import Table from "../Components/Table";
import TopBar from "../Components/TopBar/TopBar";
import TableNavlinks from "../Components/TableNavlinks";
import useGetForms from "../hooks/Forms/useGetForms";
import ModalCreateForm from "../Components/modals/ModalCreateForm";
import useDeleteForm from "../hooks/Forms/useDeleteForm";
import { useNavigate } from "react-router-dom";
import ModalDelete from "../Components/modals/modalDelet";

function Forms() {
  const Formsdata = useGetForms();
  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [CurrentForm, setCurrentForm] = useState();
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState(null);

  const deleteform = useDeleteForm();
  const headers = [
    { key: "title", value: "title" },
    { key: "description", value: "description" },
    { key: "slug", value: "slug" },
    { key: "fields_count", value: "fields_count" },
    { key: "status", value: "status" },
  ];
  return (
    <div>
      <TopBar title="Forms" onCreate={() => setShowModal(true)} />
      <TableNavlinks
        tabs={[
          { label: "Inbox · 40" },
          { label: "Sent · 17" },
          { label: "Drafts · 3" },
        ]}
      />

      <Table
        headers={headers}
        data={Formsdata}
        actions={[
          {
            label: "✏️",
            onClick: (item) => {
              setCurrentForm(item.id);
              setShowModal(true);
            },
          },

          {
            label: "🗑",
            onClick: (item) => {
              setDeleteId(item.id);
              setDeleteModal(true);
            },
          },
          {
            label: "👁",
            onClick: (item) => {
              navigate(`/dashboard/ShowSubmissions/${item.id}`);
            },
          },
        ]}
      />
      <ModalCreateForm
        showModal={showModal}
        setShowModal={setShowModal}
        title="Create form"
      />
      <ModalDelete
        open={deleteModal}
        setOpen={setDeleteModal}
        title="Delete Form "
        message="Are you sure you want to delete this Form?"
        onConfirm={() => deleteform(deleteId)}
      />
    </div>
  );
}

export default Forms;
