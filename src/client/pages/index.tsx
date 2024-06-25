import { NextPage, NextPageContext } from 'next';
import Router from 'next/router';
import React, { useEffect } from 'react';
import { ApiResponse } from '../../server/utils';
import { Layout } from '../components/layouts/plain';
import { fetchServerResponse } from '../lib/api';
import { TestData } from '../../server/entities';
import { TestDataHeader } from '../components/test-data/header';

export async function getServerSideProps(context: NextPageContext): Promise<{
  props: Props;
}> {
  const testData = await fetchServerResponse<
    ApiResponse<TestData[]>
  >(context, '/api/test-data');
  return {
    props: {
      data: testData.data || [],
    },
  };
}

interface Props {
  data: TestData[];
}

const Home: NextPage<Props> = (props) => {
  const [authToken, setauthToken] = React.useState('');

  useEffect(() => {
    const authToken = localStorage.getItem('access_token');
    if (authToken != null) {
      setauthToken(authToken);
    } else {
      Router.push('/login');
    }
  });

  return (
    <Layout>
      <div>
        {props.data?.map((testData) => {
          return (
            <div className="my-1 px-4 border-2">
              <TestDataHeader
                data={testData}
              />
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default Home;
