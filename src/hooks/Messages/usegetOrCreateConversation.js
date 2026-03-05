import { Axios } from "../../Api/Axios";
import { baseURL, conversations } from "../../Api/Api";

function useGetOrCreateConversation() {
  const getOrCreateConversation = async (client_id) => {
    try {
      const res = await Axios.post(`${baseURL}${conversations}`, {
        client_id,
      });
      console.log(res.data.conversation.id);

      return res.data.conversation;
    } catch (err) {
      console.log(err);
    }
  };

  return { getOrCreateConversation };
}

export default useGetOrCreateConversation;
