import { useRef, useState, useEffect } from "react";
import useCerateClient from "./hooks/useCerateClient";
import profileImage from "./assets/clientimage/img.svg";
import Loading from "./Loading/Loading";
import useUpdateClient from "./hooks/useUpdateClient";
import Modal from "./Components/modals/Modal";
import Input from "./Components/Input";
import useGetclient from "./hooks/useGetclient";

function ModalClient({ showModal, setShowModal, id }) {
  const openImage = useRef(null);
  const client = useGetclient(id);
  console.log(client);

  const [formValues, setFormValues] = useState({
    full_name: "",
    email: "",
    phone: "",
    location: "",
  });

  useEffect(() => {
    if (!client) return;

    setFormValues({
      full_name: client.client.full_name || "",
      email: client.client.email || "",
      phone: client.client.phone || "",
      location: client.client.location || "",
    });
  }, [client]);

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

    if (id) {
      handleUpdateClient(id, formData);
    } else {
      handleCreateClient(formData);
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
                Full name
              </label>
              <Input
                type={"text"}
                value={formValues.full_name}
                name={"full_name"}
                id={"Full name"}
                placeholder={"Name"}
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
              <Input
                type={"email"}
                value={formValues.email}
                name={"email"}
                id={"email"}
                placeholder={"name@company.com"}
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

export default ModalClient;
