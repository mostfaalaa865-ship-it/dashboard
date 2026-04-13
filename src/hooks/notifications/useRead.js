import { useContext } from "react";
import { Axios } from "../../Api/Axios";
import { NotificationsContext } from "../../context/numNotifications";

function useRead() {
  const { notifications2, setnotifications2 } =
    useContext(NotificationsContext);

  function handleRead(id) {
    Axios.post(`/notifications/${id}/read`)
      .then(() => {
        const updated = notifications2.map((n) =>
          n.id === id ? { ...n, read_at: new Date().toISOString() } : n,
        );

        setnotifications2(updated);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return { handleRead };
}

export default useRead;
