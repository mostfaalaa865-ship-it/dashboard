import { useRef, useState, useEffect } from "react";
import Loading from "./Loading/Loading";
import Modal from "./Components/modals/Modal";
import Input from "./Components/Input";
import useCreateProdcut from "./hooks/useCreateProdcut";
import useUpdateProduct from "./hooks/useUpdateProduct";
import useGetProduct from "./hooks/useGetProduct";

function ModalProduct({ showModal, setShowModal, id }) {
  const openImage = useRef(null);
  const product = useGetProduct(id);
  console.log(product);

  const [formValues, setFormValues] = useState({
    Product_name: "",
    SKU: "",
    Qty: "",
    Category: "",
    Price: "",
    sales: "",
  });

  useEffect(() => {
    if (!product) return;

    setFormValues({
      Product_name: product.product.title || "",
      SKU: product.product.sku || "",
      Qty: product.product.qty || "",
      Category: product.product.tags || "",
      Price: product.product.price || "",
      sales: product.product.sales || "",
    });
  }, [product]);

  const [image, setImage] = useState(null);
  const { handleCreateClient, load: createLoading } = useCreateProdcut({
    setShowModal,
  });

  const { handleUpdateproducts, load: updateLoading } = useUpdateProduct({
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

    formData.append("title", formValues.Product_name);
    formData.append("sku", formValues.SKU);
    formData.append("price", formValues.Price);
    formData.append("qty", formValues.Qty);
    formData.append("tags[]", formValues.Category);
    formData.append("sales", formValues.sales);

    if (image) {
      formData.append("image", image);
    }

    if (id) {
      handleUpdateproducts(id, formData);
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
                <div className="w-full text-[#8F929C]">
                  <label htmlFor="">Link</label>
                  <div
                    className="bg-[#FBFBFC] w-full h-24 border-2 border-dotted border-gray-300 flex flex-col  items-center justify-center"
                    onClick={() => {
                      openImage.current.click();
                    }}
                  >
                    <h6 className="text-[#25272D] mb-1">Drag & Drop image</h6>
                    <p className="text-[#8F929C]">
                      Add up to 10 photos and 1 video
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="Product_name"
                className="block mb-2 mt-3 text-sm font-medium text-gray-900"
              >
                Product name
              </label>
              <Input
                type={"text"}
                value={formValues.Product_name}
                name={"Product_name"}
                id={"Product_name"}
                placeholder={"Product name...."}
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2  focus:outline focus:outline-2 focus:outline-[#6696F5]   focus:outline focus:outline-2 focus:outline-[#6696F5]"
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="Price"
                className="block mb-2 mt-3 text-sm font-medium text-gray-900 dark:text-white"
              >
                Category
              </label>
              <select
                name="Category"
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2  focus:outline focus:outline-2 focus:outline-[#6696F5]   focus:outline focus:outline-2 focus:outline-[#6696F5]"
                onChange={handleChange}
              >
                <option value="Sneakers">Sneakers</option>
                <option value="Sneakers">Sneakers</option>
                <option value="Sneakers">Sneakers</option>
              </select>
            </div>
            <div className="flex gap-2">
              {" "}
              <div>
                <label
                  htmlFor="SKU"
                  className="block mb-2 mt-3 text-sm font-medium text-gray-900 dark:text-white"
                >
                  SKU
                </label>
                <Input
                  type={"text"}
                  value={formValues.SKU}
                  name={"SKU"}
                  id={"SKU"}
                  placeholder={"SKU-036"}
                  className={
                    "border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[210px] p-2  focus:outline focus:outline-2 focus:outline-[#6696F5]   focus:outline focus:outline-2 focus:outline-[#6696F5]"
                  }
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="Qty"
                  className="block mb-2 mt-3 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Qty
                </label>
                <Input
                  type={"text"}
                  value={formValues.Qty}
                  name={"Qty"}
                  id={"Qty"}
                  placeholder={"1, 2, 3, 4"}
                  className={
                    "border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  w-[210px] p-2  focus:outline focus:outline-2 focus:outline-[#6696F5]   focus:outline focus:outline-2 focus:outline-[#6696F5]"
                  }
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <div>
                <label
                  htmlFor="Price"
                  className="block mb-2 mt-3 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Price
                </label>
                <Input
                  type={"text"}
                  value={formValues.Price}
                  name={"Price"}
                  id={"Price"}
                  placeholder={"45.12"}
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[210px] p-2  focus:outline focus:outline-2 focus:outline-[#6696F5]   focus:outline focus:outline-2 focus:outline-[#6696F5]"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="sales"
                  className="block mb-2 mt-3 text-sm font-medium text-gray-900"
                >
                  Sales
                </label>
                <Input
                  type={"text"}
                  value={formValues.sales}
                  name={"sales"}
                  id={"sales"}
                  placeholder={"233...."}
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[210px] p-2  focus:outline focus:outline-2 focus:outline-[#6696F5]   focus:outline focus:outline-2 focus:outline-[#6696F5]"
                  onChange={handleChange}
                />
              </div>
            </div>
          </form>
        </Modal>
      )}
      {(createLoading || updateLoading) && <Loading />}
    </div>
  );
}

export default ModalProduct;
