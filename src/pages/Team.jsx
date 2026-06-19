import React, { useState } from "react";
import TableNavlinks from "../Components/TableNavlinks";
import Table from "../Components/Table";
import useTeam from "../hooks/Team/useTeam";
import TableSkeleton from "../TableSkeleton";
import useDeleteTeam from "../hooks/Team/useDeleteTeam";
import ModalTeam from "../Components/modals/ModalTeam";
import TopBar from "../Components/TopBar/TopBar";
import person from "../assets/team/person.svg";
import date from "../assets/team/date.svg";
import time from "../assets/team/time.svg";

function Team() {
  const { team, page, setpage, searchValue, setsearchValue } = useTeam();
  const { handleDelete } = useDeleteTeam();
  const [showModal, setShowModal] = useState(false);
  const [currentteam, setCurrentteam] = useState(null);

  const headers = [
    { key: "full_name", value: "full_name" },
    { key: "job_title", value: "job_title" },
    { key: "email", value: "email" },
    { key: "projects", value: "projects" },
    { key: "team_groups", value: "team_groups" },
  ];

  return (
    <div>
      <TopBar title="Team" onCreate={() => setShowModal(true)} />

      <TableNavlinks
        tabs={[
          { label: "Members", icon: person },
          { label: "Timesheet", icon: time },
          { label: "Schedule", icon: date },
        ]}
        setsearchValue={setsearchValue}
        searchValue={searchValue}
      />

      <Table
        data={team}
        headers={headers}
        page={page}
        setpage={setpage}
        actions={[
          {
            label: "✏️",
            onClick: (item) => {
              setCurrentteam(item.id);
              setShowModal(true);
            },
          },

          {
            label: "🗑",
            onClick: (item) => {
              handleDelete(item.id);
            },
          },
        ]}
      />
      <TableSkeleton rows={4} cols={6} />

      <ModalTeam
        showModal={showModal}
        setShowModal={setShowModal}
        id={currentteam}
      />
    </div>
  );
}

export default Team;
