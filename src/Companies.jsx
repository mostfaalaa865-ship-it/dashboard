import Table from "./Components/Table";
import TableNavlinks from "./Components/TableNavlinks";
import useCompanieS from "./hooks/useCompanies";
import useDeleteCompanies from "./hooks/useDeleteCompanies";

function Companies() {
  const { handleDeleteCompanies } = useDeleteCompanies();

  const { companies } = useCompanieS();
  console.log(companies.data);

  const headers = [
    { key: "name", value: "Name" },
    { key: "categories", value: "Categories" },
    { key: "link", value: "Link" },
    { key: "last_interaction", value: "Last iteraction" },
    { key: "phone", value: "Phone" },
    { key: "location", value: "Location" },
  ];

  return (
    <div>
      <TableNavlinks
        name={"US companies · 25"}
        name2={"North Europe · 17"}
        name3={"Africa · 3"}
      />
      <Table
        data={companies.data}
        headers={headers}
        name={"companies"}
        Delete={handleDeleteCompanies}
      />
    </div>
  );
}

export default Companies;
