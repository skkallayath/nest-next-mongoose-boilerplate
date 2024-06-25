import { NextPage } from 'next';
import Router from 'next/router';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {  TestData } from '../../../server/entities';
import { ApiResponse } from '../../../server/utils';
import { Layout } from '../../components/layouts/plain';
import toast from '../../components/toast';
import {
  fetchServerResponse,
  postAndUpdateServerResponse,
} from '../../lib/api';

type FormValues = {
  _id: string;
  name: string;
};

export async function getServerSideProps(context): Promise<{
  props: Props;
}> {
  const id = context.params.id;
  const testData = await fetchServerResponse<ApiResponse<TestData>>(
    context,
    `/api/test-data/${id}`,
  );

  return { props: { testData: testData.data } };
}

interface Props {
  testData: TestData;
}

const edit: NextPage<Props> = (props) => {
  const [authToken, setauthToken] = React.useState('');

  useEffect(() => {
    const authToken = localStorage.getItem('access_token');
    if (authToken) {
      setauthToken(authToken);
    } else {
      Router.push('/login');
    }
  });

  const notify = React.useCallback((type, message, content) => {
    toast({ type, message, content });
  }, []);

  const dismiss = React.useCallback(() => {
    toast.dismiss();
  }, []);

  const renderHeader = () => {
    return (
      <div className="p-3">
        <h6 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Update Data
        </h6>
      </div>
    );
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async ({ ...data }) => {
    const id = data._id;

    const testData = await postAndUpdateServerResponse<ApiResponse<TestData>>(
      window.location.origin,
      `/api/test-data/${id}`,
      'PUT',
      JSON.stringify({ ...data }),
      authToken,
    );

    if (testData.status == 200) {
      Router.push(`/test`);
      notify('success', 'Success |', 'Test Data Updated Successfully');
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
            <div className="w-full p-3 h-auto float-left">
              <form
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 "
                onSubmit={handleSubmit(onSubmit)}
              >
                <input
                  type="hidden"
                  {...register('_id')}
                  defaultValue={props.testData._id?.toString()}
                />
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4 my-4">
                  <div className="mb-2 pr-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Name
                    </label>
                    <input
                      className=" appearance-none border w-full py-2 px-3 text-gray-700 leading-6 "
                      type="textbox"
                      placeholder="name"
                      id="name"
                      {...register('name', { required: 'Name is required' })}
                      defaultValue={props.testData.name}
                    />
                    {errors?.name && (
                      <p className="text-red-500 text-xs ">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
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

export default edit;
