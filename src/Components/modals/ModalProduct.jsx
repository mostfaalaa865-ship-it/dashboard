import { useRef, useState, useEffect } from "react";
import Loading from "../../Loading/Loading";
import Modal from "./Modal";
import Input from "../Input";
import useCreateProdcut from "../../hooks/Products/useCreateProdcut";
import useUpdateProduct from "../../hooks/Products/useUpdateProduct";
import useGetProduct from "../../hooks/Products/useGetProduct";
import { ProductSchema } from "../../schemas/ProductSchema";
import { useFormik } from "formik";

function ModalProduct({ showModal, setShowModal, id }) {
  const openImage = useRef(null);
  const product = useGetProduct(id);

  const formik = useFormik({
    initialValues: {
      Product_name: "",
      Category: "",
      Qty: "",
      SKU: "",
      Price: "",
      sales: "",
    },
    validationSchema: ProductSchema,
    validateOnBlur: true,
    onSubmit: (values) => {
      const formData = new FormData();

      formData.append("title", values.Product_name);
      formData.append("sku", values.SKU);
      formData.append("price", values.Price);
      formData.append("qty", values.Qty);
      formData.append("tags[]", values.Category);
      formData.append("sales", values.sales);

      if (image) {
        formData.append("image", image);
      }

      if (id) {
        handleUpdateproducts(id, formData);
      } else {
        handleCreateClient(formData);
      }
    },
  });

  useEffect(() => {
    if (!product) return;

    formik.setValues({
      Product_name: product.product.title || "",
      Category: product.product.tags[0] || "",
      Qty: product.product.qty || "",
      SKU: product.product.sku || "",
      sales: product.product.sales || "",
      Price: product.product.price || "",
    });
  }, [product]);

  const [image, setImage] = useState(null);
  const { handleCreateClient, load: createLoading } = useCreateProdcut({
    setShowModal,
  });

  const { handleUpdateproducts, load: updateLoading } = useUpdateProduct({
    setShowModal,
  });

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
                onBlur={formik.handleBlur}
                name={"Product_name"}
                id={"Product_name"}
                placeholder={"Product name...."}
                className={`border text-gray-900 text-sm rounded-lg block w-full p-2 focus:outline-none focus:ring-2 ${formik.touched.Product_name && formik.errors.Product_name ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-[#6696F5]"}`}
                onChange={formik.handleChange}
                value={formik.values.Product_name}
              />
              {formik.touched.Product_name && formik.errors.Product_name && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.Product_name}
                </p>
              )}
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
                className={`border text-gray-900 text-sm rounded-lg block w-full p-2 focus:outline-none focus:ring-2 ${formik.touched.Category && formik.errors.Category ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-[#6696F5]"}`}
                onChange={formik.handleChange}
                value={formik.values.Category}
              >
                <option value="Sneakers">Sneakers</option>
                <option value="Sneakers">Sneakers</option>
                <option value="Sneakers">Sneakers</option>
              </select>
              {formik.touched.Category && formik.errors.Category && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.Category}
                </p>
              )}
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
                  type={"number"}
                  onBlur={formik.handleBlur}
                  name={"SKU"}
                  id={"SKU"}
                  placeholder={"SKU-036"}
                  className={`border text-gray-900 text-sm rounded-lg block w-full p-2 focus:outline-none focus:ring-2 ${formik.touched.SKU && formik.errors.SKU ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-[#6696F5]"}`}
                  onChange={formik.handleChange}
                  value={formik.values.SKU}
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
                  type={"number"}
                  onBlur={formik.handleBlur}
                  name={"Qty"}
                  id={"Qty"}
                  placeholder={"1, 2, 3, 4"}
                  className={`border text-gray-900 text-sm rounded-lg block w-full p-2 focus:outline-none focus:ring-2 ${formik.touched.Qty && formik.errors.Qty ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-[#6696F5]"}`}
                  onChange={formik.handleChange}
                  value={formik.values.Qty}
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
                  type={"number"}
                  onBlur={formik.handleBlur}
                  name={"Price"}
                  id={"Price"}
                  placeholder={"45.12"}
                  className={`border text-gray-900 text-sm rounded-lg block w-full p-2 focus:outline-none focus:ring-2 ${formik.touched.Price && formik.errors.Price ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-[#6696F5]"}`}
                  onChange={formik.handleChange}
                  value={formik.values.Price}
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
                  type={"number"}
                  onBlur={formik.handleBlur}
                  name={"sales"}
                  id={"sales"}
                  placeholder={"233...."}
                  className={`border text-gray-900 text-sm rounded-lg block w-full p-2 focus:outline-none focus:ring-2 ${formik.touched.sales && formik.errors.sales ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-[#6696F5]"}`}
                  onChange={formik.handleChange}
                  value={formik.values.sales}
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
