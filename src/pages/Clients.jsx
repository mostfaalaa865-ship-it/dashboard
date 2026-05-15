import TableNavlinks from "../Components/TableNavlinks";
import Table from "../Components/Table";
import useClients from "../hooks/Clients/useClients";
import useDeleteClient from "../hooks/Clients/useDeleteClient";
import TableSkeleton from "../TableSkeleton";
import { useState } from "react";

function Clients() {
  const { clients, page, setpage, setsearchValue, searchValue } = useClients();
  const { handleDelete } = useDeleteClient();
  const [open, setOpen] = useState(false);

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
      <TableNavlinks
        name={"All · 40"}
        name2={"Guests · 45"}
        name3={"Partners · 17"}
        name4={"Blocked · 3"}
        setsearchValue={setsearchValue}
        searchValue={searchValue}
        setOpen={setOpen}
        open={open}
        filterOptions={ClientsFilters}
      />

      <Table
        data={clients}
        headers={headers}
        Delete={handleDelete}
        modal={"client"}
        page={page}
        setpage={setpage}
      />

      <TableSkeleton rows={4} cols={6} />
    </div>
  );
}

export default Clients;

///////////////////
