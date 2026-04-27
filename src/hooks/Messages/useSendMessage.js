import { Axios } from "../../Api/Axios";
import { conversations, messages } from "../../Api/Api";

function useSendMessage() {
  function SendMessage(message, id, image) {
    const formDataMessage = new FormData();
    for (let i = 0; i < image.length; i++) {
      formDataMessage.append(`attachments[${i}]`, image[i]);
    }
    formDataMessage.append("body", message);
    Axios.post(`${conversations}/${id}${messages}`, formDataMessage)
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
