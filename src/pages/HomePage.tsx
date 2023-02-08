import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import tw, { css } from 'twin.macro';
import { ITodo } from '@/types/todos.types';
import { AppLayout } from '@/layouts';
import { getTodos } from '@/data/queries';

export function HomePage() {
  /**
   * useQuery를 통해서 서버의 데이터를 가져올 수 있다. 가져온 데이터는 캐싱된다. 가져온 데이터는 얼마나 신선한지에 따라서 나뉜다. 신선하면 유지를 하고, 그렇지 않으면 다시 가져오는 시스템을 갖고 있다.
   *
   * 비동기이기 때문에 데이터를 가져오는 데에는 시간이 걸릴 수 있으며, 리액트 쿼리에서는 그러한 상황을 대비하게끔 하기 위해 가져오는 중엔 로딩, 가져왔으나 에러가 있으면 에러를 잡을 수 있게끔 만들어두었다.
   * 구조 분해를 통해서 원하는 기능을 사용할 수 있다.
   * 실질적인 데이터는 data 프로퍼티에 들어있다.
   * 신선한 데이터인지 아닌지를 나누는 기준은 staleTime이다. 기본값은 0이며 0이기 때문에 페이지를 벗어났다가 다시 포커싱하면 데이터를 새로 가져오게 된다. staleTime의 값을 바꾸면 그 시간동안은 다시 가져오지 않는다.
   * cacheTime의 경우에는 캐싱되는 기간을 의미한다. 이 시간이 다 하면 가비지 콜렉터가 가져가버린다.
   */
  const {
    isLoading, isError, error, data,
  } = useQuery<ITodo[], Error>(
    [ 'getTotos', ],
    getTodos,
    {
      staleTime: 2000,
    }
  );

  const noStyle = css`
    ${tw` mr-2 text-[1.2rem] p-2 bg-blue-500 inline-block rounded-1 text-black-50 `}
  `;

  const url = '/';

  /**
   * 로딩중인 경우에는 이렇게 isLoading 프로퍼티를 통해서 에러를 막을 수 있다.
   * 아래의 에러 부분도 마찬가지로 처리할 수 있다.
   *
   * isLoading과 isFetching의 차이는 isLoading의 경우는 요청은 보냈으나 캐시된 데이터가 존재하지 않을 때를 나타내고 isFetching의 경우는 요청을 보냈는지에 대한 여부를 나타낸다.
   */
  if (isLoading) {
    return (
      <AppLayout title='로딩중...' url={url}>
        <div>로딩중</div>
      </AppLayout>
    );
  }

  if (isError) {
    return (
      <AppLayout title={`에러 - ${error.message}`} url={url}>
        <div>{error.message}</div>
      </AppLayout>
    );
  }

  return (
    <>
      <AppLayout
        title='홈'
        url='/'
      >
        <div>
          <h1>홈</h1>

          <h2>투두리스트</h2>
          <div>
            {data?.map((todo) => (
              <div key={todo.id}>
                <span css={noStyle}>{todo.id}</span>
                <Link to={`/todos/${todo.id}`}>[ {todo.title} ]</Link>
              </div>
            ))}
          </div>
          <Link to='/pagetest'>페이지 테스트</Link>
        </div>
      </AppLayout>
    </>
  );
}
