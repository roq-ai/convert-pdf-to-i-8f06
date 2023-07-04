import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createConversion } from 'apiSdk/conversions';
import { Error } from 'components/error';
import { conversionValidationSchema } from 'validationSchema/conversions';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { FileInterface } from 'interfaces/file';
import { UserInterface } from 'interfaces/user';
import { getFiles } from 'apiSdk/files';
import { getUsers } from 'apiSdk/users';
import { ConversionInterface } from 'interfaces/conversion';

function ConversionCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ConversionInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createConversion(values);
      resetForm();
      router.push('/conversions');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ConversionInterface>({
    initialValues: {
      format: '',
      input_file_id: (router.query.input_file_id as string) ?? null,
      output_file_id: (router.query.output_file_id as string) ?? null,
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: conversionValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Conversion
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="format" mb="4" isInvalid={!!formik.errors?.format}>
            <FormLabel>Format</FormLabel>
            <Input type="text" name="format" value={formik.values?.format} onChange={formik.handleChange} />
            {formik.errors.format && <FormErrorMessage>{formik.errors?.format}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<FileInterface>
            formik={formik}
            name={'input_file_id'}
            label={'Select File'}
            placeholder={'Select File'}
            fetcher={getFiles}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <AsyncSelect<FileInterface>
            formik={formik}
            name={'output_file_id'}
            label={'Select File'}
            placeholder={'Select File'}
            fetcher={getFiles}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'conversion',
    operation: AccessOperationEnum.CREATE,
  }),
)(ConversionCreatePage);
