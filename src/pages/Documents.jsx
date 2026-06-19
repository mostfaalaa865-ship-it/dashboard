import React from "react";
import useDocuments from "../hooks/Documents/useDocuments";
import Table from "../Components/Table";
import TableSkeleton from "../TableSkeleton";
import { useNavigate } from "react-router-dom";

function Documents() {
  const { documentsData } = useDocuments();
  const navgatie = useNavigate();
  const headers = [
    { key: "name", value: "Name" },
    { key: "description", value: "description" },
    { key: "status", value: "status" },
    // { key: "last_modified", value: "last_modified" },
    // { key: "created_by", value: "created_by" },
  ];
  return (
    <div>
      <Table
        data={documentsData}
        headers={headers}
        // page={page}
        // setpage={setpage}
        actions={[
          {
            label: "✏️",
            onClick: (item) => {
              navgatie(`update/${item.id}`);
            },
          },

          {
            label: "🗑",
            onClick: (item) => {
              handleDeleteCompanies(item.id);
            },
          },
        ]}
      />

      <TableSkeleton rows={4} cols={6} />
    </div>
  );
}

export default Documents;
