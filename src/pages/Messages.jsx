import TableNavlinks from ".././Components/TableNavlinks";
import Table from "../Components/Table";
import useListConversation from "../hooks/Messages/useListConversation.JS";
import TableSkeleton from "../TableSkeleton";
function Messages() {
  const { conversation } = useListConversation();
  const headers = [
    { key: "customer", value: "Customer" },
    { key: "conversation", value: "Conversation" },
    { key: "customer_email", value: "Assigned To" },
    { key: "number", value: "Number" },
    { key: "waiting", value: "Waiting" },
  ];
  return (
    <>
      <TableNavlinks
        name={"Inbox · 40"}
        name2={"Sent · 17"}
        name3={"Drafts · 3"}
      />
      {conversation.data ? (
        <Table
          headers={headers}
          data={conversation.data}
          modal={"client"}
          action={false}
        />
      ) : (
        <TableSkeleton rows={6} cols={headers.length} />
      )}
    </>
  );
}

export default Messages;
