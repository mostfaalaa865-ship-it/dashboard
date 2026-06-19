import React, { useEffect, useState } from "react";
import { Axios } from "../../Api/Axios";
import { teams } from "../../Api/Api";

function useGetTeam(id) {
  const [team, setTeam] = useState();
  console.log(id);

  useEffect(() => {
    Axios.get(`${teams}/${id}`)
      .then((res) => {
        setTeam(res.data.team);
        console.log(res.data.team);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  return team;
}

export default useGetTeam;
