import { baseURL, conversations } from "../../Api/Api";
import { Axios } from "../../Api/Axios";

function useReadasMark() {
  function ReadMessages(id) {
    Axios.patch(`${baseURL}${conversations}/${id}/read`)
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  }
  return { ReadMessages };
}

export default useReadasMark;
