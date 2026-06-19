import * as Yup from "yup";

export const ScheduleSchema = Yup.object().shape({
  title: Yup.string()
    .trim()
    .min(2, "Title must be at least 2 characters")
    .max(20, "Title must not exceed 20 characters")
    .required("Title is required"),

  description: Yup.string()
    .trim()
    .min(2, "Description must be at least 2 characters")
    .max(300, "Description must not exceed 300 characters")
    .required("Description is required"),

  start_date: Yup.date().required("Start date is required"),

  end_date: Yup.date()
    .required("End date is required")
    .min(
      Yup.ref("start_date"),
      "End date must be after or equal to start date",
    ),
});
