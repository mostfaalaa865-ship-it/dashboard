import { useContext, useEffect, useState } from "react";
import Table from "../Components/Table";
import TableNavlinks from "../Components/TableNavlinks";
import useCompanieS from "../hooks/Companies/useCompanies";
import useDeleteCompanies from "../hooks/Companies/useDeleteCompanies";
import TableSkeleton from "../TableSkeleton";
import { FilterContext } from "../context/FilterProvider";
import ModalCompanies from "../Components/modals/ModalCompanies";
import TopBar from "../Components/TopBar/TopBar";
import ModalDelete from "../Components/modals/modalDelet";

function Companies() {
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const { resetFilter } = useContext(FilterContext);

  const { handleDeleteCompanies } = useDeleteCompanies();

  const { companies, page, setpage, searchValue, setsearchValue } =
    useCompanieS();
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentClient, setCurrentClient] = useState(null);

  useEffect(() => {
    resetFilter();
  }, []);

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
    { label: "location", value: "Last_iteraction" },
  ];

  return (
    <div>
      <TopBar title="Companies" onCreate={() => setShowModal(true)} />

      <TableNavlinks
        // name={"All · 40"}
        // name2={"US companies · 25"}
        // name3={"North Europe · 17"}
        // name4={"Africa · 3"}
        tabs={[
          { label: "All · 40" },
          { label: "US companies · 25" },
          { label: "North Europe · 17" },
          { label: "Africa · 3" },
        ]}
        setsearchValue={setsearchValue}
        searchValue={searchValue}
        setOpen={setOpen}
        open={open}
        filterOptions={CompaniesFilters}
      />

      <Table
        data={companies}
        headers={headers}
        // name={"companies"}
        // Delete={handleDeleteCompanies}
        // modal={ModalCompanies}
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
      <ModalDelete
        open={deleteModal}
        setOpen={setDeleteModal}
        title="Delete Company "
        message="Are you sure you want to delete this Company?"
        onConfirm={() => handleDeleteCompanies(deleteId)}
      />

      <ModalCompanies
        showModal={showModal}
        setShowModal={setShowModal}
        id={currentClient}
      />
      {/* <TableSkeleton rows={4} cols={6} /> */}
    </div>
  );
}

export default Companies;
