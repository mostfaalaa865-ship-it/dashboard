import { useContext } from "react";
import { notifications } from "../../Api/Api";
import { Axios } from "../../Api/Axios";
import { NotificationsContext } from "../../context/numNotifications";

function useReadAll() {
  const { notifications2, setnotifications2 } =
    useContext(NotificationsContext);

  function handleReadAll() {
    Axios.post(`${notifications}/read-all`)
      .then(() => {
        const updated = notifications2.map((n) => ({
          ...n,
          read_at: new Date().toISOString(),
        }));

        setnotifications2(updated);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return { handleReadAll };
}

export default useReadAll;
