import { useContext, useEffect, useState } from "react";
import { Axios } from "../../Api/Axios";
import { forms } from "../../Api/Api";
import { ReRender } from "../../context/ReRender";

function useGetForms() {
  const { refresh } = useContext(ReRender);

  const [Formsdata, setFormsdata] = useState([]);

  useEffect(() => {
    Axios.get(forms)
      .then((res) => {
        setFormsdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh.form]);

  return Formsdata;
}

export default useGetForms;
