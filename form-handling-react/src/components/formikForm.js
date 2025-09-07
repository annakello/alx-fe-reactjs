import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function FormikForm() {
  // Validation schema using Yup
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 chars").required("Password is required"),
  });

  return (
    <Formik
      initialValues={{ username: "", email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        console.log("Formik submitted:", values);
        // mock API call
        fetch("https://jsonplaceholder.typicode.com/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        })
          .then((res) => res.json())
          .then((data) => console.log("API Response:", data));
        resetForm();
      }}
    >
      {() => (
        <Form className="p-4 border rounded w-80 space-y-4">
          <h2 className="text-xl font-bold">Formik Registration Form</h2>

          <div>
            <label>Username:</label>
            <Field name="username" type="text" className="border w-full p-1 rounded" />
            <ErrorMessage name="username" component="p" className="text-red-500" />
          </div>

          <div>
            <label>Email:</label>
            <Field name="email" type="email" className="border w-full p-1 rounded" />
            <ErrorMessage name="email" component="p" className="text-red-500" />
          </div>

          <div>
            <label>Password:</label>
            <Field name="password" type="password" className="border w-full p-1 rounded" />
            <ErrorMessage name="password" component="p" className="text-red-500" />
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Register
          </button>
        </Form>
      )}
    </Formik>
  );
}
