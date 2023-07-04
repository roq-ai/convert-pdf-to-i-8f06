import * as yup from 'yup';

export const conversionValidationSchema = yup.object().shape({
  format: yup.string().required(),
  input_file_id: yup.string().nullable(),
  output_file_id: yup.string().nullable(),
  user_id: yup.string().nullable(),
});
