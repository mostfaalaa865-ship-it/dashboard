// import React, { useEffect, useState } from "react";
// import { Axios } from "../../Api/Axios";
// import { notifications } from "../../Api/Api";

// function useNotifications() {
//   const [notifications2, setnotifications2] = useState([]);

//   useEffect(() => {
//     Axios.get(`${notifications}?per_page=50`)
//       .then((res) => setnotifications2(res.data.data))
//       .catch();
//   }, []);
//   console.log(notifications2);

//   return { notifications2, setnotifications2 };
// }

// export default useNotifications;
