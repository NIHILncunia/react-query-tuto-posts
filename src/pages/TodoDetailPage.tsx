import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { AppLayout } from '@/layouts/AppLayout';
import { ITodo } from '@/types/todos.types';
import { getTodo } from '@/data/queries';
import { siteData } from '@/data/siteData';

export function TodoDetailPage() {
  const { id, } = useParams();
  const {
    isLoading, isError, error, data,
  } = useQuery<ITodo, Error>([ 'getTodo', id, ], () => getTodo(id));
  // 게시글의 상세 페이지 같은 것들은 쿼리 키를 배열로 두어 식별 장치를 여러개로 만들어놔야한다.
  // 쿼리 함수에는

  const url = `/todos/${id}`;

  if (isLoading) {
    return (
      <AppLayout title='로딩중...' url={url}>
        <div>로딩중...</div>
      </AppLayout>
    );
  }

  if (isError) {
    return (
      <AppLayout title={`에러 - ${error.name}`} url={url}>
        <div>{error.message}</div>
      </AppLayout>
    );
  }

  return (
    <>
      <AppLayout title={`${data.title} - ${siteData.title}`} url={url}>
        <div>
          <h1>테스트 상세 페이지</h1>

          <div>
            <h2>{data.title}</h2>
            <div>{data.content}</div>
          </div>
        </div>
        <div>
          <Link to='/'>[ 홈 ]</Link>
        </div>
      </AppLayout>
    </>
  );
}
