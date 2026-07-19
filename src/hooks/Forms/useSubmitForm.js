import React from "react";
import { Axios } from "../../Api/Axios";

function useSubmitForm({ data, setData, id }) {
  function submitForm(e) {
    e.preventDefault();
    Axios.post(`/public/forms/${id}/submit`, {
      data: data,
    })
      .then((res) => {
        console.log(res);
        setData({});
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return submitForm;
}

export default useSubmitForm;
