import React, { useEffect, useState } from "react";
import { Axios } from "../../Api/Axios";
import { notifications } from "../../Api/Api";

function useUnRead() {
  const [notifications2, setnotifications2] = useState(0);

  useEffect(() => {
    Axios.get(`${notifications}/unread-count?per_page=50`).then((res) =>
      setnotifications2(res.data.data),
    );
    console.log(notifications2);
  }, []);
  return { notifications2 };
}

export default useUnRead;
