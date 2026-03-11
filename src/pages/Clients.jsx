import TableNavlinks from "../Components/TableNavlinks";
import Table from "../Components/Table";
import useClients from "../hooks/Clients/useClients";
import useDeleteClient from "../hooks/Clients/useDeleteClient";
import TableSkeleton from "../TableSkeleton";

function Clients() {
  const Clients = useClients();
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
        name={"All · 40"}
        name2={"Guests · 45"}
        name3={"Partners · 17"}
        name4={"Blocked · 3"}
      />
      {Clients.clients.data ? (
        <Table
          data={Clients.clients.data}
          headers={headers}
          Delete={handleDelete}
          modal={"client"}
        />
      ) : (
        <TableSkeleton rows={4} cols={headers.length} />
      )}
    </div>
  );
}

export default Clients;
