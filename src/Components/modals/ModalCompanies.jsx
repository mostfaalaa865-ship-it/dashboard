import { useRef, useState, useEffect } from "react";
import profileImage from "../../assets/ava.svg";
import Loading from "../../Loading/Loading";
import Modal from "./Modal";
import Input from "../Input";
import useGetcompany from "../../hooks/Companies/useGetcompany";
import useUpdateCompanies from "../../hooks/Companies/useUpdateCompanie";
import useCreateCompany from "../../hooks/Companies/useCreateCompany";
import { useFormik } from "formik";
import { CompaniesSchema } from "../../schemas/CompaniesSchema";

function ModalCompanies({ showModal, setShowModal, id }) {
  const formik = useFormik({
    initialValues: {
      name: "",
      link: "",
      phone: "",
      location: "",
      last_iteraction: "",
    },
    validationSchema: CompaniesSchema,
    validateOnBlur: true,
    onSubmit: (values) => {
      const formData = new FormData();
      for (let i = 0; i < categories.length; i++) {
        formData.append("categories[]", categories[i]);
      }

      formData.append("name", values.name);
      formData.append("link", values.link);
      formData.append("phone", values.phone);
      formData.append("location", values.location);
      formData.append("last_interaction", values.last_iteraction);

      if (image) {
        formData.append("image", image);
      }

      if (id) {
        handleUpdateCompanies(id, formData);
      } else {
        handleCreatecompany(formData);
      }
    },
  });

  const openImage = useRef(null);
  const company = useGetcompany(id);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (!company) return;

    formik.setValues({
      name: company.company.name || "",
      link: company.company.link || "",
      phone: company.company.phone || "",
      location: company.company.location || "",
      last_iteraction: company.company.last_interaction || "",
    });
    setCategories(company.company.categories || []);
  }, [company]);

  const [image, setImage] = useState(null);
  const { handleCreatecompany, load: createLoading } = useCreateCompany({
    setShowModal,
  });

  const { handleUpdateCompanies, load: updateLoading } = useUpdateCompanies({
    setShowModal,
  });

  function handleclick() {
    setCategories((prev) => [...prev, ""]);
  }
  function deleteCategory(index) {
    setCategories((prev) => prev.filter((key, i) => i !== index));
  }

  function updateCategory(index, value) {
    setCategories((prev) => prev.map((cat, i) => (i === index ? value : cat)));
  }

  return (
    <div>
      {showModal && (
        <Modal id={id} setShowModal={setShowModal}>
          <form
            id="form"
            onSubmit={formik.handleSubmit}
            className="space-y-4 p-6 border-t border-b border-[#E2E4E9] mb-1 "
          >
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
                onBlur={formik.handleBlur}
                name={"name"}
                id={"name"}
                placeholder={"Name"}
                className={`border text-gray-900 text-sm rounded-lg block w-full p-2 focus:outline-none focus:ring-2 ${formik.touched.name && formik.errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-[#6696F5]"}`}
                onChange={formik.handleChange}
                value={formik.values.name}
              />

              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.name}
                </p>
              )}
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
                onBlur={formik.handleBlur}
                name={"link"}
                id={"link"}
                placeholder={"evernote.com"}
                className={`border text-gray-900 text-sm rounded-lg block w-full p-2 focus:outline-none focus:ring-2 ${formik.touched.link && formik.errors.link ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-[#6696F5]"}`}
                onChange={formik.handleChange}
                value={formik.values.link}
              />
              {formik.touched.link && formik.errors.link && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.link}
                </p>
              )}
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
                onBlur={formik.handleBlur}
                name={"phone"}
                id={"Phone"}
                placeholder={"+1 415-525-3888"}
                className={`border text-gray-900 text-sm rounded-lg block w-full p-2 focus:outline-none focus:ring-2 ${formik.touched.phone && formik.errors.phone ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-[#6696F5]"}`}
                onChange={formik.handleChange}
                value={formik.values.phone}
              />
              {formik.touched.phone && formik.errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.phone}
                </p>
              )}
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
                onBlur={formik.handleBlur}
                name={"location"}
                id={"Location"}
                placeholder={"San Francisco, USA"}
                className={`border text-gray-900 text-sm rounded-lg block w-full p-2 focus:outline-none focus:ring-2 ${formik.touched.location && formik.errors.location ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-[#6696F5]"}`}
                onChange={formik.handleChange}
                value={formik.values.location}
              />
              {formik.touched.location && formik.errors.location && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.location}
                </p>
              )}
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
                onBlur={formik.handleBlur}
                name={"last_iteraction"}
                id={"last_iteraction"}
                placeholder={"2026"}
                className={`border text-gray-900 text-sm rounded-lg block w-full p-2 focus:outline-none focus:ring-2 ${formik.touched.last_iteraction && formik.errors.last_iteraction ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-[#6696F5]"}`}
                onChange={formik.handleChange}
                value={formik.values.last_iteraction}
              />
              {formik.touched.last_iteraction &&
                formik.errors.last_iteraction && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.last_iteraction}
                  </p>
                )}
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
                    className={`border text-gray-900 text-sm rounded-lg block w-full p-2 focus:outline-none focus:ring-2 ${formik.touched.Categories && formik.errors.Categories ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-[#6696F5]"}`}
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
