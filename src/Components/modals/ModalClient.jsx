import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import useCerateClient from "../../hooks/Clients/useCerateClient";
import profileImage from "../../assets/clientimage/img.svg";
import Loading from "../../Loading/Loading";
import useUpdateClient from "../../hooks/Clients/useUpdateClient";
import Modal from "./Modal";
import Input from "../Input";
import useGetclient from "../../hooks/Clients/useGetclient";
import { ClientSchema } from "../../schemas/ClientSchema";
function ModalClient({ showModal, setShowModal, id }) {
  const client = useGetclient(id);

  const formik = useFormik({
    initialValues: {
      full_name: "",
      email: "",
      phone: "",
      location: "",
    },
    validationSchema: ClientSchema,
    validateOnBlur: true,

    onSubmit: (values) => {
      const formData = new FormData();

      formData.append("full_name", values.full_name);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("location", values.location);

      if (image) {
        formData.append("image", image);
      }

      if (id) {
        handleUpdateClient(id, formData);
      } else {
        handleCreateClient(formData);
      }
    },
  });
  useEffect(() => {
    if (!client) return;

    formik.setValues({
      full_name: client.client.full_name || "",
      email: client.client.email || "",
      phone: client.client.phone || "",
      location: client.client.location || "",
    });
  }, [client]);

  const openImage = useRef(null);
  const [image, setImage] = useState(null);
  const { handleCreateClient, load: createLoading } = useCerateClient({
    setShowModal,
  });

  const { handleUpdateClient, load: updateLoading } = useUpdateClient({
    setShowModal,
  });

  return (
    <div>
      {showModal && (
        <Modal
          id={id}
          setShowModal={setShowModal}
          disable={!(formik.isValid && formik.dirty)}
        >
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
                className="block mb-2 mt-3 text-sm font-medium text-gray-900"
              >
                Full name
              </label>
              <Input
                type={"text"}
                onChange={formik.handleChange}
                value={formik.values.full_name}
                onBlur={formik.handleBlur}
                name={"full_name"}
                id={"Full name"}
                placeholder={"Name"}
                className={`border text-gray-900 text-sm rounded-lg block w-full p-2 focus:outline-none focus:ring-2 ${formik.touched.full_name && formik.errors.full_name ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-[#6696F5]"}`}
              />

              {formik.touched.full_name && formik.errors.full_name && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.full_name}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 mt-3 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <Input
                type={"email"}
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
                name={"email"}
                id={"email"}
                placeholder={"name@company.com"}
                className={`border text-gray-900 text-sm rounded-lg block w-full p-2 focus:outline-none focus:ring-2 ${formik.touched.email && formik.errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-[#6696F5]"}`}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.email}
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
                onChange={formik.handleChange}
                value={formik.values.phone}
                onBlur={formik.handleBlur}
                name={"phone"}
                id={"Phone"}
                placeholder={"+1 415-525-3888"}
                className={`border text-gray-900 text-sm rounded-lg block w-full p-2 focus:outline-none focus:ring-2 ${formik.touched.phone && formik.errors.phone ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-[#6696F5]"}`}
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
                className="block mb-2 mt-3 text-sm font-medium text-gray-900 dark:text-white"
              >
                Location
              </label>
              <Input
                type={"text"}
                onChange={formik.handleChange}
                value={formik.values.location}
                onBlur={formik.handleBlur}
                name={"location"}
                id={"Location"}
                placeholder={"San Francisco, USA"}
                className={`border text-gray-900 text-sm rounded-lg block w-full p-2 focus:outline-none focus:ring-2 ${formik.touched.location && formik.errors.location ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-[#6696F5]"}`}
              />
              {formik.touched.location && formik.errors.location && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.location}
                </p>
              )}
            </div>
          </form>
        </Modal>
      )}
      {(createLoading || updateLoading) && <Loading />}
    </div>
  );
}

export default ModalClient;

////////////////////////////////////
///////////////////////////////////
/////////////////////////////////////
/////////////////////////////////
//////////////////////////////////
///////////////////////////////
///////////////////////////////
///////
//////
