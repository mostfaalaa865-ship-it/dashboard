import TableNavlinks from "../Components/TableNavlinks";
import Table from "../Components/Table";
import useClients from "../hooks/Clients/useClients";
import useDeleteClient from "../hooks/Clients/useDeleteClient";
import TableSkeleton from "../TableSkeleton";

function Clients() {
  const { clients, page, setpage } = useClients();
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
