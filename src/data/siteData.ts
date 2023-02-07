import { ISiteData } from '@/types/site.types';

export const siteData: ISiteData = {
  title: '리액트 쿼리 테스트',
  url: process.env.NODE_ENV !== 'production'
    ? 'https://localhost:3000'
    : '',
  image: '',
  author: 'NIHILncunia',
  description: '그냥 테스트',
  keywords: '리액트,리액트쿼리,React,ReactQuery',
  type: 'website',
  version: 'v0.0.0',
};
