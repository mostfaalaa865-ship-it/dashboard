import React, { useContext, useEffect, useState } from "react";
import { Axios } from "../../Api/Axios";
import { teams } from "../../Api/Api";
import { ReRender } from "../../context/ReRender";

function useTeam() {
  const { refresh } = useContext(ReRender);
  const [team, setTeam] = useState();
  const [page, setpage] = useState(1);
  const [debounceValue, setDebounceValue] = useState("");
  const [searchValue, setsearchValue] = useState("");

  function getData() {
    Axios.get(`${teams}?page=${page}&per_page=4&full_name=${debounceValue}`)
      .then((res) => {
        setTeam(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    setpage(1);
  }, [debounceValue]);

  useEffect(() => {
    getData();
  }, [page, debounceValue, refresh.teams]);

  // debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(searchValue);
    }, 700);
    return () => {
      clearTimeout(timer);
    };
  }, [searchValue, page]);
  return { team, setTeam, page, setpage, searchValue, setsearchValue };
}

export default useTeam;
