import { useFormik } from "formik";
import Loading from "../../Loading/Loading";
import Modal from "./Modal";
import Input from "../Input";
import { ClientSchema } from "../../schemas/ClientSchema";
import { ScheduleSchema } from "../../schemas/ScheduleSchema";
import useCreateSchedule from "../../hooks/Schedule/useCreateSchedule";
import { useEffect } from "react";
import useGetschedule from "../../hooks/Schedule/useGetschedule";
import useDeleteSchedule from "../../hooks/Schedule/useDeleteSchedule";
function ModalSchedule({ showModal, setShowModal, id, selectedDate }) {
  const { createschedule, loading } = useCreateSchedule(setShowModal, id);
  const scheduleitem = useGetschedule(id);
  const deleteSchedule = useDeleteSchedule();
  const formik = useFormik({
    initialValues: {
      title: scheduleitem?.title || "",
      description: scheduleitem?.description || "",
      start_date: scheduleitem?.start_date || "",
      end_date: scheduleitem?.end_date || "",
      status: "in_progress",
    },
    validationSchema: ScheduleSchema,
    validateOnBlur: true,
    enableReinitialize: true,

    onSubmit: (values, { resetForm }) => {
      const formData = new FormData();

      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("start_date", values.start_date);
      formData.append("end_date", values.end_date);
      formData.append("status", values.status);
      createschedule(formData);
      resetForm();
    },
  });

  useEffect(() => {
    if (selectedDate) {
      formik.setFieldValue("start_date", selectedDate);
    }
  }, [selectedDate]);

  return (
    <div>
      {showModal && (
        <Modal
          id={id}
          setShowModal={setShowModal}
          disable={!(formik.isValid && formik.dirty)}
          title={id ? "Update task" : "Create task"}
          buttonText={id ? "Update" : "Create"}
          btndelete={"delete"}
          funDeleteSchedule={() => deleteSchedule(id)}
        >
          <form
            id="form"
            onSubmit={formik.handleSubmit}
            className="space-y-4 p-6 border-t border-b border-[#E2E4E9] mb-1 "
          >
            <div>
              <label
                htmlFor="title"
                className="block mb-2 mt-3 text-sm font-medium text-gray-900"
              >
                title{" "}
              </label>
              <Input
                type={"text"}
                onChange={formik.handleChange}
                value={formik.values.title}
                onBlur={formik.handleBlur}
                name={"title"}
                id={"title"}
                placeholder={"title"}
                className={`border text-gray-900 text-sm rounded-lg block w-full p-2 focus:outline-none focus:ring-2 ${formik.touched.title && formik.errors.title ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-[#6696F5]"}`}
              />

              {formik.touched.title && formik.errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.title}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="description"
                className="block mb-2 mt-3 text-sm font-medium text-gray-900 dark:text-white"
              >
                description
              </label>
              <Input
                type={"text"}
                onChange={formik.handleChange}
                value={formik.values.description}
                onBlur={formik.handleBlur}
                name={"description"}
                id={"description"}
                placeholder={"description"}
                className={`border text-gray-900 text-sm rounded-lg block w-full p-2 focus:outline-none focus:ring-2 ${formik.touched.description && formik.errors.description ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-[#6696F5]"}`}
              />
              {formik.touched.description && formik.errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.description}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="start_date"
                className="block mb-2 mt-3 text-sm font-medium text-gray-900 dark:text-white"
              >
                start_date
              </label>
              <Input
                type={"date"}
                onChange={formik.handleChange}
                value={formik.values.start_date}
                onBlur={formik.handleBlur}
                name={"start_date"}
                id={"start_date"}
                placeholder={"+1 415-525-3888"}
                className={`border text-gray-900 text-sm rounded-lg block w-full p-2 focus:outline-none focus:ring-2 ${formik.touched.start_date && formik.errors.start_date ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-[#6696F5]"}`}
              />
              {formik.touched.start_date && formik.errors.start_date && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.start_date}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="end_date"
                className="block mb-2 mt-3 text-sm font-medium text-gray-900 dark:text-white"
              >
                end_date
              </label>
              <Input
                type={"date"}
                onChange={formik.handleChange}
                value={formik.values.end_date}
                onBlur={formik.handleBlur}
                name={"end_date"}
                id={"end_date"}
                placeholder={"San Francisco, USA"}
                className={`border text-gray-900 text-sm rounded-lg block w-full p-2 focus:outline-none focus:ring-2 ${formik.touched.end_date && formik.errors.end_date ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-[#6696F5]"}`}
              />
              {formik.touched.end_date && formik.errors.end_date && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.end_date}
                </p>
              )}
            </div>
          </form>
        </Modal>
      )}
      {loading && <Loading />}
    </div>
  );
}

export default ModalSchedule;
