import { NextPage, NextPageContext } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { TestData } from '../../../server/entities';
import { PaginatedApiResponse } from '../../../server/utils';
import { Layout } from '../../components/layouts/plain';
import { fetchServerResponse } from '../../lib/api';

export async function getServerSideProps(context: NextPageContext): Promise<{
  props: Props;
}> {
  const page = Number(context.query.page || 1);
  const testData = await fetchServerResponse<
    PaginatedApiResponse<TestData>
  >(context, `/api/test-data?page=${page}&perPage=10`);
  const count = testData.count;
  const currentPage = page;
  const totalPages = testData.totalPages;

  return {
    props: {
      data: testData.data || [],
      count: count || 0,
      currentPage: currentPage,
      totalPages: totalPages || 0,
    },
  };
}

interface Props {
  data: TestData[];
  count: number;
  currentPage: number;
  totalPages: number;
}

const TestDataPage: NextPage<Props> = (props) => {
  const router = useRouter();
  const query = router.query;

  const renderTHead = (key: string, title?: string) => {
    return (
      <th
        key={key}
        scope="col"
        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal font-bold"
      >
        {title || ''}
      </th>
    );
  };
  const [authToken, setauthToken] = React.useState('');

  useEffect(() => {
    const authToken = localStorage.getItem('access_token');
    if (authToken != null) {
      setauthToken(authToken);
    } else {
      router.push('/login');
    }
  });

  const renderHeader = () => {
    return (
      <div className="p-3 w-full">
        <div className="space-x-4 w-full">
          <div className="inline-block w-1/2">
            <h6 className="text-2xl font-semibold text-gray-800 dark:text-white w-1/2">
              Test Data
            </h6>
            <h2 className="text-sm text-gray-400">{props.count} Total</h2>
          </div>
          <div className="inline-block float-right ">
            <Link href="/test/new" className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 border border-blue-500 rounded addNewBtn w-24 mt-2">
                Add New
            </Link>
            &nbsp;
          </div>
        </div>
      </div>
    );
  };

  const renderHeaders = () => {
    return (
      <thead className="block md:table-header-group">
        <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
          {renderTHead('name', 'Name')}
          {renderTHead('actions', 'Actions')}
        </tr>
      </thead>
    );
  };

  const renderRow = (data: TestData) => {
    return (
      <tr
        key={data._id?.toString()}
        className="bg-white border border-grey-500 md:border-none block md:table-row"
      >
        {renderValueCell(data.name)}
        {renderValueCell(
          <>
            <span className="inline-block w-1/3 md:hidden font-bold">
              Actions
            </span>
            <Link href={'/test/' + data._id} className="text-indigo-600 hover:text-indigo-900">Edit</Link>
            &nbsp;
          </>,
        )}
      </tr>
    );
  };

  const renderValueCell = (value: React.ReactNode) => {
    return (
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm p-2 md:border md:border-grey-500 text-left block md:table-cell">
        <div className="flex items-center">
          <p className="text-gray-900 whitespace-no-wrap">{value}</p>
        </div>
      </td>
    );
  };

  const handlePagination = (page) => {
    const path = router.pathname;
    if (page.selected !== Number(query.page) - 1) {
      query.page = `${page.selected + 1}`;

      router.push({
        pathname: path,
        query: query,
      });
    }
  };

  return (
    <>
      <Layout>
        <main className="bg-gray-100 dark:bg-gray-800">
          {renderHeader()}
          <div className="inline-block min-w-full shadow">
            <table className="min-w-full border-collapse block md:table">
              {renderHeaders()}
              <tbody className="block md:table-row-group">
                {props.data?.map(renderRow)}
              </tbody>
            </table>
          </div>

          <ReactPaginate
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            initialPage={Number(query.page || 1) - 1}
            pageCount={props.totalPages}
            onPageChange={handlePagination}
            containerClassName={'paginate-wrap'}
            pageClassName={'paginate-li'}
            pageLinkClassName={'paginate-a'}
            activeClassName={'paginate-active'}
            nextLinkClassName={'paginate-next-a'}
            previousLinkClassName={'paginate-prev-a'}
            breakLinkClassName={'paginate-break-a'}
          />
        </main>{' '}
      </Layout>
    </>
  );
};

export default TestDataPage;
