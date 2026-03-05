import Loading from "../../Loading/Loading";
import Modal from "./Modal";
import useClients from "../../hooks/Clients/useClients";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetOrCreateConversation from "../../hooks/Messages/usegetOrCreateConversation";

function ModalMessages({ showModal, setShowModal, id }) {
  const [client_id, setclient_id] = useState();
  const clients = useClients();
  const navigate = useNavigate();
  const { getOrCreateConversation } = useGetOrCreateConversation();
  console.log(client_id);

  const handlechat = async (e) => {
    e.preventDefault();

    if (!client_id) return;

    const conv = await getOrCreateConversation(client_id);

    setShowModal(false);

    navigate(`/dashboard/chat/${conv.id}`);
  };

  return (
    <div>
      {showModal && (
        <Modal id={id} setShowModal={setShowModal}>
          <form
            onSubmit={handlechat}
            id="form"
            className="space-y-4 p-6 border-t border-b border-[#E2E4E9] mb-1 "
          >
            <label htmlFor="client" className="text-[#8F929C] text-[16px]">
              Contact
            </label>
            <select
              value={client_id}
              onChange={(e) => setclient_id(e.target.value)}
              id="client"
              className={`border text-gray-900 text-sm rounded-lg block w-full p-2 focus:outline-none focus:ring-2  mt-2`}
            >
              <option value="">selet option</option>
              {clients.clients.data.map((item) => (
                <option value={item.id}>{item.full_name}</option>
              ))}
            </select>
          </form>
        </Modal>
      )}
      {/* {(createLoading || updateLoading) && <Loading />} */}
    </div>
  );
}

export default ModalMessages;
