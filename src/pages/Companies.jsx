import { useState } from "react";
import Table from "../Components/Table";
import TableNavlinks from "../Components/TableNavlinks";
import useCompanieS from "../hooks/Companies/useCompanies";
import useDeleteCompanies from "../hooks/Companies/useDeleteCompanies";
import TableSkeleton from "../TableSkeleton";

function Companies() {
  const { handleDeleteCompanies } = useDeleteCompanies();

  const { companies, page, setpage, searchValue, setsearchValue } =
    useCompanieS();
  const [open, setOpen] = useState(false);

  const headers = [
    { key: "name", value: "Name" },
    { key: "categories", value: "Categories" },
    { key: "link", value: "Link" },
    { key: "last_interaction", value: "Last iteraction" },
    { key: "phone", value: "Phone" },
    { key: "location", value: "Location" },
  ];
  const CompaniesFilters = [
    { label: "Categories", value: "categories" },
    { label: "Phone", value: "phone" },
    { label: "Link", value: "link" },
    { label: "Last_iteraction", value: "Last_iteraction" },
    { label: "location", value: "location" },
  ];

  return (
    <div>
      <TableNavlinks
        name={"All · 40"}
        name2={"US companies · 25"}
        name3={"North Europe · 17"}
        name4={"Africa · 3"}
        setsearchValue={setsearchValue}
        searchValue={searchValue}
        setOpen={setOpen}
        open={open}
        filterOptions={CompaniesFilters}
      />

      <Table
        data={companies}
        headers={headers}
        name={"companies"}
        Delete={handleDeleteCompanies}
        modal={"companies"}
        page={page}
        setpage={setpage}
      />
    </div>
  );
}

export default Companies;
