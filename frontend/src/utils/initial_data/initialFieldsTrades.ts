// initialFieldsTrades.ts
import type FormField from "@/types/forms/FormField";
import type FormFieldsGroup from "@/types/forms/FormFieldsGroup";
import * as yup from "yup";

export const initialFieldsTrades: Array<FormField | FormFieldsGroup> = [
  {
    title: "General",
    fields: [
      {
        type: "input",
        name: "name",
        label: "Name",
        value: "",
        rules: yup.string().required("Name is required"),
      },
    ],
  },
];
