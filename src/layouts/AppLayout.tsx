import React from 'react';
import {
  Footer, Header, Main, Meta, Nav
} from '@/components/Layout';
import { IAppLayoutProps, IMetaData } from '@/types/site.types';

export const AppLayout = ({
  children, title, url, description, keywords, author, image, created, updated, tags, type, section,
}: IAppLayoutProps) => {
  const meta: IMetaData = {
    title,
    url,
    description,
    keywords,
    author,
    image,
    tags,
    type,
    section,
    created,
    updated,
  };
  return (
    <>
      <Meta meta={meta} />
      <Header />
      <Nav />

      <Main>
        {children}
      </Main>

      <Footer />
    </>
  );
};
