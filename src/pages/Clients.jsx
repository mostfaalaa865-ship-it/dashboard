import TableNavlinks from "../Components/TableNavlinks";
import Table from "../Components/Table";
import ModalClient from "../Components/modals/ModalClient";
import useClients from "../hooks/Clients/useClients";
import useDeleteClient from "../hooks/Clients/useDeleteClient";
import TableSkeleton from "../TableSkeleton";
import { useContext, useEffect, useState } from "react";
import { FilterContext } from "../context/FilterProvider";
import TopBar from "../Components/TopBar/TopBar";
import ModalDelete from "../Components/modals/modalDelet";

function Clients() {
  const { clients, page, setpage, setsearchValue, searchValue } = useClients();
  const { handleDelete } = useDeleteClient();
  const [open, setOpen] = useState(false);
  const { resetFilter } = useContext(FilterContext);
  const [showModal, setShowModal] = useState(false);
  const [currentClient, setCurrentClient] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    resetFilter();
  }, []);

  const headers = [
    { key: "full_name", value: "Name" },
    { key: "status", value: "Status" },
    { key: "email", value: "Email address" },
    { key: "created_at", value: "Creation date" },
    { key: "phone", value: "Phone" },
    { key: "location", value: "Location" },
  ];

  const ClientsFilters = [
    { label: "status", value: "status" },
    { label: "Phone", value: "phone" },
    { label: "email", value: "email" },
    { label: "location", value: "location" },
  ];

  return (
    <div>
      <TopBar title="Clients" onCreate={() => setShowModal(true)} />
      <TableNavlinks
        tabs={[
          { label: "All · 40" },
          { label: "Guests · 45" },
          { label: "Partners · 17" },
          { label: "Blocked · 3" },
        ]}
        setsearchValue={setsearchValue}
        searchValue={searchValue}
        setOpen={setOpen}
        open={open}
        filterOptions={ClientsFilters}
      />

      <Table
        data={clients}
        headers={headers}
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
              setDeleteId(item.id);
              setDeleteModal(true);
            },
          },
        ]}
      />

      <ModalClient
        showModal={showModal}
        setShowModal={setShowModal}
        id={currentClient}
        title="Create Client"
      />
      <ModalDelete
        open={deleteModal}
        setOpen={setDeleteModal}
        title="Delete client "
        message="Are you sure you want to delete this client?"
        onConfirm={() => handleDelete(deleteId)}
      />
    </div>
  );
}

export default Clients;
