import { useRef, useState, useEffect } from "react";
import profileImage from "./assets/ava.svg";
import Loading from "./Loading/Loading";
import Modal from "./Components/modals/Modal";
import Input from "./Components/Input";
import useGetcompany from "./hooks/useGetcompany";
import useUpdateCompanies from "./hooks/useUpdateCompanie";
import useCreateCompany from "./hooks/useCreateCompany";

function ModalCompanies({ showModal, setShowModal, id }) {
  const openImage = useRef(null);
  const company = useGetcompany(id);

  const [formValues, setFormValues] = useState({
    name: "",
    link: "",
    phone: "",
    location: "",
  });

  useEffect(() => {
    if (!company) return;

    setFormValues({
      name: company.company.name || "",
      link: company.company.link || "",
      phone: company.company.phone || "",
      location: company.company.location || "",
    });
  }, [company]);

  const [image, setImage] = useState(null);
  const { handleCreatecompany, load: createLoading } = useCreateCompany({
    setShowModal,
  });

  const { handleUpdateCompanies, load: updateLoading } = useUpdateCompanies({
    setShowModal,
  });
  function handleChange(e) {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }
  function handleSubmit() {
    const formData = new FormData();

    formData.append("name", formValues.name);
    formData.append("link", formValues.link);
    formData.append("phone", formValues.phone);
    formData.append("location", formValues.location);

    if (image) {
      formData.append("image", image);
    }

    if (id) {
      handleUpdateCompanies(id, formData);
    } else {
      handleCreatecompany(formData);
    }
  }

  return (
    <div>
      {showModal && (
        <Modal id={id} handleSubmit={handleSubmit} setShowModal={setShowModal}>
          <form className="space-y-4 p-6 border-t border-b border-[#E2E4E9] mb-1 ">
            <div>
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                hidden
                ref={openImage}
              />
              <div className="flex gap-5 items-center">
                <div>
                  <p className="text-[#8F929C]  ">Photo</p>
                  <img className="my-2" src={profileImage} alt="" />
                </div>
                <div>
                  <h4
                    className="text-[#5B75D2] text-[17px] mb-1 cursor-pointer"
                    onClick={() => {
                      openImage.current.click();
                    }}
                  >
                    Upload new photo · Remove photo
                  </h4>
                  <p
                    className="text-[#8F929C] text-[13px]
"
                  >
                    Pick a photo up to 4MB.
                  </p>
                </div>
              </div>

              <label
                htmlFor="Full name"
                className="block mb-2 mt-3 text-sm font-medium text-gray-900"
              >
                Name
              </label>
              <Input
                type={"text"}
                value={formValues.name}
                name={"name"}
                id={"name"}
                placeholder={"Name"}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="link"
                className="block mb-2 mt-3 text-sm font-medium text-gray-900 dark:text-white"
              >
                Link
              </label>
              <Input
                type={"text"}
                value={formValues.link}
                name={"link"}
                id={"link"}
                placeholder={"evernote.com"}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="Phone"
                className="block mb-2 mt-3 text-sm font-medium text-gray-900 dark:text-white"
              >
                Phone
              </label>
              <Input
                type={"text"}
                value={formValues.phone}
                name={"phone"}
                id={"Phone"}
                placeholder={"+1 415-525-3888"}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="Location"
                className="block mb-2 mt-3 text-sm font-medium text-gray-900 dark:text-white"
              >
                Location
              </label>
              <Input
                type={"text"}
                value={formValues.location}
                name={"location"}
                id={"Location"}
                placeholder={"San Francisco, USA"}
                onChange={handleChange}
              />
            </div>
          </form>
        </Modal>
      )}
      {(createLoading || updateLoading) && <Loading />}
    </div>
  );
}

export default ModalCompanies;
