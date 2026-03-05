import { baseURL, conversations } from "../../Api/Api";
import { Axios } from "../../Api/Axios";

function useReadasMark() {
  function ReadMessages(id) {
    Axios.patch(`${baseURL}${conversations}/${id}/read`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return { ReadMessages };
}

export default useReadasMark;
