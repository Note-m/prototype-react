import { Field, Form, Formik } from "formik";
export default function SearchForm({ onSeach }) {
  return (
    <Formik
      initialValues={{ topic: "" }}
      onSubmit={(values, actions) => {
        onSeach(values.topic);
        actions.resetForm();
      }}
    >
      <Form action="">
        <Field type="text" name="topic" />
        <button type="submit">Search</button>
      </Form>
    </Formik>
  );
}
