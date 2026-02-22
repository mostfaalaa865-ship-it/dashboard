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
  const [categories, setCategories] = useState([]);
  const [formValues, setFormValues] = useState({
    name: "",
    link: "",
    phone: "",
    location: "",
    last_iteraction: "",
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
    for (let i = 0; i < categories.length; i++) {
      formData.append("categories[]", categories[i]);
    }

    formData.append("name", formValues.name);
    formData.append("link", formValues.link);
    formData.append("phone", formValues.phone);
    formData.append("location", formValues.location);
    formData.append("last_interaction", formValues.last_iteraction);

    if (image) {
      formData.append("image", image);
    }

    if (id) {
      handleUpdateCompanies(id, formData);
    } else {
      handleCreatecompany(formData);
    }
  }
  function handleclick() {
    setCategories((prev) => [...prev, ""]);
  }
  function deleteCategory(index) {
    setCategories((prev) => prev.filter((key, i) => i !== index));
  }

  function updateCategory(index, value) {
    setCategories((prev) => prev.map((cat, i) => (i === index ? value : cat)));
  }
  console.log(categories);

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
                className="block mb-2 mt-2 text-sm font-medium text-gray-900"
              >
                Name
              </label>
              <Input
                type={"text"}
                value={formValues.name}
                name={"name"}
                id={"name"}
                placeholder={"Name"}
                className={
                  "border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2  focus:outline focus:outline-2 focus:outline-[#6696F5]   focus:outline focus:outline-2 focus:outline-[#6696F5]"
                }
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="link"
                className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Link
              </label>
              <Input
                type={"text"}
                value={formValues.link}
                name={"link"}
                id={"link"}
                placeholder={"evernote.com"}
                className={
                  "border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2  focus:outline focus:outline-2 focus:outline-[#6696F5]   focus:outline focus:outline-2 focus:outline-[#6696F5]"
                }
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
                className={
                  "border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2  focus:outline focus:outline-2 focus:outline-[#6696F5]   focus:outline focus:outline-2 focus:outline-[#6696F5]"
                }
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="Location"
                className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Location
              </label>
              <Input
                type={"text"}
                value={formValues.location}
                name={"location"}
                id={"Location"}
                placeholder={"San Francisco, USA"}
                className={
                  "border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2  focus:outline focus:outline-2 focus:outline-[#6696F5]   focus:outline focus:outline-2 focus:outline-[#6696F5]"
                }
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="last_iteraction"
                className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Last iteraction
              </label>
              <Input
                type={"date"}
                value={formValues.last_iteraction}
                name={"last_iteraction"}
                id={"last_iteraction"}
                placeholder={"2026"}
                className={
                  "border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2  focus:outline focus:outline-2 focus:outline-[#6696F5]   focus:outline focus:outline-2 focus:outline-[#6696F5]"
                }
                onChange={handleChange}
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <h3 className="block mb-2 mt-3 text-sm font-medium text-gray-900 dark:text-white">
                  {" "}
                  Categories
                </h3>
                <div
                  className="cursor-pointer font-medium"
                  onClick={handleclick}
                >
                  +
                </div>
              </div>
              {categories.map((item, index) => (
                <div className="mt-1 flex items-center justify-between gap-3">
                  <Input
                    type={"text"}
                    value={item}
                    name={"Categories"}
                    id={"Categories"}
                    placeholder={"Category........."}
                    className={
                      "border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2  focus:outline focus:outline-2 focus:outline-[#6696F5]   focus:outline focus:outline-2 focus:outline-[#6696F5]"
                    }
                    onChange={(e) => updateCategory(index, e.target.value)}
                  />
                  <h4
                    className="text-red-500 cursor-pointer text-[20px]  w-4"
                    onClick={() => deleteCategory(index)}
                  >
                    x
                  </h4>
                </div>
              ))}
            </div>
          </form>
        </Modal>
      )}
      {(createLoading || updateLoading) && <Loading />}
    </div>
  );
}

export default ModalCompanies;
