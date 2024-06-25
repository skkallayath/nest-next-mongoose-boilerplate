import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TestData } from '../../../server/entities';
import { ApiResponse } from '../../../server/utils';
import { Layout } from '../../components/layouts/plain';
import toast from '../../components/toast';
import {
  postAndUpdateServerResponse
} from '../../lib/api';
import { StorageKeys } from '../../lib/enums';

type FormValues = {
  name: string;
};

interface Props {
}

const addNew: NextPage<Props> = (props) => {
  const router = useRouter();
  const [authToken, setauthToken] = React.useState('');

  useEffect(() => {
    const authToken = localStorage.getItem(StorageKeys.AccessToken);
    if (authToken != '') {
      setauthToken(authToken);
    }
  });

  const renderHeader = () => {
    return (
      <div className="p-3">
        <h6 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Add New Data
        </h6>
      </div>
    );
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const notify = React.useCallback((type, message, content?: any) => {
    toast({ type, message, content });
  }, []);

  const onSubmit = async ({ ...data }) => {
    const testData = await postAndUpdateServerResponse<ApiResponse<TestData>>(
      window.location.origin,
      `/api/test-data`,
      'POST',
      JSON.stringify({ ...data }),
      authToken,
    );

    if (testData.status == 200) {
      router.push(`/test`);
      notify('success', 'Success |', 'Test Data added Successfully');
    } else {
      notify('error', 'Error !', 'Something went wrong');
    }
  };

  return (
    <>
      <Layout>
        <main className="bg-gray-100 dark:bg-gray-800">
          {renderHeader()}
          <div className="inline-block min-w-full">
            <div className="w-1/2 p-3 h-auto float-left">
              <form
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 "
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Name
                  </label>
                  <input
                    className=" appearance-none border w-full py-2 px-3 text-gray-700 leading-tight "
                    type="textbox"
                    placeholder="name"
                    id="name"
                    {...register('name', { required: 'Name is required' })}
                  />
                  {errors?.name && (
                    <p className="text-red-500 text-xs ">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="p-2 flex">
                  <div className="w-1/2"></div>
                  <div className="w-1/2 flex justify-end">
                    <input
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-40"
                      value="Submit"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
};
export default addNew;
