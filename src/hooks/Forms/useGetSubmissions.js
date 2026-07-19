import React, { useEffect, useState } from "react";
import { Axios } from "../../Api/Axios";
import { forms, submissions } from "../../Api/Api";

function useGetSubmissions(id) {
  const [submissionsData, setSubmissionsData] = useState([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    Axios.get(`${forms}/${id}${submissions}`)
      .then((res) => {
        console.log(res);
        setSubmissionsData(res.data.data);
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  }, []);

  return { submissionsData, loading };
}

export default useGetSubmissions;
