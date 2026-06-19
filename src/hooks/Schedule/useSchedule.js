import { useContext, useState } from "react";
import React, { useEffect } from "react";
import { Axios } from "../../Api/Axios";
import { ReRender } from "../../context/ReRender";

function useSchedule() {
  const [date, setDate] = useState([]);
  const { refresh } = useContext(ReRender);

  console.log(date);

  useEffect(() => {
    Axios.get(`/schedule`)
      .then((res) => {
        setDate(
          res.data.data.map((item) => {
            return {
              id: item.id,
              title: item.title,
              start: item.start_date,
              end: item.end_date,
            };
          }),
        );
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);
  return date;
}

export default useSchedule;
