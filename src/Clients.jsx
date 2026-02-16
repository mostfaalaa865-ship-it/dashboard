import TableNavlinks from "./Components/TableNavlinks";
import Table from "./Components/Table";
import useClients from "./hooks/useClients";
import useDeleteClient from "./hooks/useDeleteClient";

function Clients() {
  const Client = useClients();
  const { handleDelete } = useDeleteClient();

  const headers = [
    { key: "full_name", value: "Name" },
    { key: "status", value: "Status" },
    { key: "email", value: "Email address" },
    { key: "created_at", value: "Creation date" },
    { key: "phone", value: "Phone" },
    { key: "location", value: "Location" },
  ];

  return (
    <div>
      <TableNavlinks
        name={"Guests · 45"}
        name2={"Partners · 17"}
        name3={"Blocked · 3"}
      />
      <Table
        data={Client.clients.data}
        headers={headers}
        Delete={handleDelete}
      />
    </div>
  );
}

export default Clients;
