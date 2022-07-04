import type { NextPage } from 'next';
import Head from 'next/head';
import { AdminDataTable } from '../../components/UI/DataTable';

const SuperAgentList: NextPage = () => {
  return (
    <div>
      <AdminDataTable />
    </div>
  );
};

export default SuperAgentList;
