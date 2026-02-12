import { useRef, useState, useEffect } from "react";
import useCerateClient from "./hooks/useCerateClient";
import profileImage from "./assets/clientimage/img.svg";
import Loading from "./Loading/Loading";
import useUpdateClient from "./hooks/useUpdateClient";

function ModalClient({ showModal, setShowModal, client }) {
  console.log(client);

  const openImage = useRef(null);
  const [formValues, setFormValues] = useState({
    full_name: "",
    email: "",
    phone: "",
    location: "",
  });

  useEffect(() => {
    if (client) {
      setFormValues({
        full_name: client.full_name || "",
        email: client.email || "",
        phone: client.phone || "",
        location: client.location || "",
      });
    } else {
      setFormValues({
        full_name: "",
        email: "",
        phone: "",
        location: "",
      });
    }
  }, [client]);
  const id = client?.id;

  const [image, setImage] = useState(null);
  const { handleCreateClient, load: createLoading } = useCerateClient({
    setShowModal,
  });

  const { handleUpdateClient, load: updateLoading } = useUpdateClient({
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

    formData.append("full_name", formValues.full_name);
    formData.append("email", formValues.email);
    formData.append("phone", formValues.phone);
    formData.append("location", formValues.location);

    if (image) {
      formData.append("image", image);
    }

    if (client?.id) {
      handleUpdateClient(id, formData);
    } else {
      handleCreateClient(formData);
    }
  }

  return (
    <div>
      {showModal && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center  bg-black/50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg max-w-120 w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center bg-[#FBFBFC]  rounded-lg p-6 h-14.5 ">
              <h3 className="text-lg font-medium">
                {" "}
                {client ? "Update Client" : "Create Client"}
              </h3>
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                onClick={() => setShowModal(false)}
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18 17.94 6M18 18 6.06 6"
                />
              </svg>
            </div>

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
                  className="block mb-2 mt-3 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Full name
                </label>
                <input
                  type="text"
                  value={formValues.full_name}
                  name="full_name"
                  id="Full name"
                  className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500   focus:outline focus:outline-2 focus:outline-[#6696F5]   focus:outline focus:outline-2 focus:outline-[#6696F5]"
                  placeholder="Name"
                  required=""
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 mt-3 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formValues.email}
                  id="email"
                  className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500   focus:outline focus:outline-2 focus:outline-[#6696F5]   focus:outline focus:outline-2 focus:outline-[#6696F5]"
                  placeholder="name@company.com"
                  required=""
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="Phone"
                  className="block mb-2 mt-3 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  id="Phone"
                  name="phone"
                  value={formValues.phone}
                  className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500   focus:outline focus:outline-2 focus:outline-[#6696F5]   focus:outline focus:outline-2 focus:outline-[#6696F5]"
                  placeholder="+1 415-525-3888"
                  required=""
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
                <input
                  type="text"
                  name="location"
                  id="Location"
                  value={formValues.location}
                  className=" border border-gray-300 text-[#25272D] text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500   focus:outline focus:outline-2 focus:outline-[#6696F5]   focus:outline focus:outline-2 focus:outline-[#6696F5]"
                  placeholder="San Francisco, USA"
                  required=""
                  onChange={handleChange}
                />
              </div>
            </form>

            <div className="flex  gap-4 items-center   rounded-lg p-9 h-14.5 ">
              <button
                onClick={handleSubmit}
                className="h-9 px-4 flex justify-center items-center cursor-pointer text-white rounded-sm bg-[#6696F5] hover:bg-[#6287E6] transition whitespace-nowrap"
              >
                {client ? "Update" : "Create "}
              </button>
              <button
                type="button"
                className="h-9 px-4 flex justify-center items-center cursor-pointer  border border-[#E2E4E9]   transition hover:bg-[#F3F4F6] gap-2  "
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {(createLoading || updateLoading) && <Loading />}
    </div>
  );
}

export default ModalClient;
