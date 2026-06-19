import TableNavlinks from ".././Components/TableNavlinks";
import Table from "../Components/Table";
import useListConversation from "../hooks/Messages/useListConversation.JS";
import TableSkeleton from "../TableSkeleton";
import { useNavigate } from "react-router-dom";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TopBar from "../Components/TopBar/TopBar";
import { useState } from "react";

function Messages() {
  const [showModal, setShowModal] = useState(false);

  const { conversation } = useListConversation();
  const navgatie = useNavigate();

  const headers = [
    { key: "customer", value: "Customer" },
    { key: "conversation", value: "Conversation" },
    { key: "customer_email", value: "Assigned To" },
    { key: "number", value: "Number" },
    { key: "waiting", value: "Waiting" },
  ];
  return (
    <>
      <TopBar title="Messages" onCreate={() => setShowModal(true)} />

      <TableNavlinks
        tabs={[
          { label: "Inbox · 40" },
          { label: "Sent · 17" },
          { label: "Drafts · 3" },
        ]}
      />
      <Table
        headers={headers}
        data={conversation}
        action={true}
        actions={[
          {
            label: <FontAwesomeIcon icon={faEye} />,

            onClick: (item) => navgatie(`/dashboard/chat/${item.id}`),
          },
        ]}
      />
    </>
  );
}

export default Messages;
