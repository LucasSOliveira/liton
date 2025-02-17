import * as yup from 'yup';

export const clientSchema = yup.object().shape({
  email: yup.string().email().required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters'),
  name: yup
    .string()
    .min(3, 'Name must be at least 3 characters')
    .required('Name is required'),
});
