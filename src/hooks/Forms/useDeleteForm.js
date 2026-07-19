import React from "react";
import { Axios } from "../../Api/Axios";
import { forms } from "../../Api/Api";
import { useContext } from "react";
import { ReRender } from "../../context/ReRender";

function useDeleteForm() {
  const { setRefresh } = useContext(ReRender);
  function deleteform(id) {
    Axios.delete(`${forms}/${id}`)
      .then((res) => {
        console.log(res);
        setRefresh((prev) => ({ ...prev, form: prev.form + 1 }));
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return deleteform;
}

export default useDeleteForm;
