import React, { Suspense } from 'react';
import '../../../css/pages/search.css';
import Loading from '../loading';
import { Metadata } from 'next';
import SearchContainer from './_components/SearchContainer';

export const metadata: Metadata = {
  title: 'BTH Ecommerce | Search',
  description: 'BTH Ecommerce | Search',
  icons: {
    icon: '/logo.svg',
    apple: '/logo.svg',
  },
};

const Search = async () => {
  return (
    <Suspense fallback={<Loading></Loading>}>
      <section className="container">
        <SearchContainer></SearchContainer>
      </section>
    </Suspense>
  );
};

export default Search;
