import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { createUser } from '../../store/usersSlice';
const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  birthday: '',
  isMale: true,
  avatar: '',
};
const FormRegister = () => {
  const dispatch = useDispatch();
  const onSubmit = (values, formikBag) => {
    dispatch(createUser(values));
    //formikBag.resetForm();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {(formikProps) => {
        const handleAvatar = ({ target }) => {
          formikProps.setFieldValue('avatar', target.files[0]);
        };
        return (
          <Form encType="multipart/form-data">
            <label>
              avatar:
              <input name="avatar" type="file" onChange={handleAvatar} />
              <ErrorMessage name="avatar" />
            </label>
            <label>
              first name:
              <Field name="firstName" />
              <ErrorMessage name="firstName" />
            </label>
            <label>
              last name:
              <Field name="lastName" />
              <ErrorMessage name="lastName" />
            </label>
            <label>
              email:
              <Field name="email" type="email" />
              <ErrorMessage name="email" />
            </label>
            <label>
              password:
              <Field name="password" type="password" />
              <ErrorMessage name="password" />
            </label>
            <label>
              birthday:
              <Field name="birthday" type="date" />
              <ErrorMessage name="birthday" />
            </label>
            <label>
              gender:
              <Field name="isMale" type="checkbox" />
            </label>
            <button type="submit">register</button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormRegister;
