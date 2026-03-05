import { Axios } from "../../Api/Axios";
import { baseURL, conversations, messages } from "../../Api/Api";

function useSendMessage() {
  function SendMessage(message, id) {
    Axios.post(`${baseURL}${conversations}/${id}${messages}`, {
      body: message,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return SendMessage;
}

export default useSendMessage;
