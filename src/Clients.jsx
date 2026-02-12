import TableNavlinks from "./Components/TableNavlinks";
import Table from "./Components/Table";
import useClients from "./hooks/useClients";
import ModalClient from "./ModalClient";

function Clients() {
  const Client = useClients();

  console.log(Client);
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
      <TableNavlinks />
      <Table data={Client.clients.data} headers={headers} />
    </div>
  );
}

export default Clients;
