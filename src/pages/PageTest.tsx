import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { AppLayout } from '@/layouts';
import { ITodo } from '@/types/todos.types';
import { getPageTodos, getTodos } from '@/data/queries';

export function PageTest() {
  const [ currentPage, setCurrentPage, ] = useState(1);

  const queryClient = useQueryClient();

  useEffect(() => {
    // 페이지 수가 마지막 페이지의 이전이라면 아래의 코드가 실행된다.
    if (currentPage < maxPage) {
      const nextPage = currentPage + 1;

      // 미리 가져오는 것을 통해 사용자 경험을 늘릴 수 있다.
      queryClient.prefetchQuery(
        [ 'pageData', nextPage, ],
        () => getPageTodos(nextPage)
      );
    }
    // 의존성은 반드시 넣어줘야한다.
  }, [ currentPage, queryClient, ]);

  /**
   * 하나의 컴포넌트에는 하나의 쿼리만 있어야한다는 보장은 없다. 여러개의 쿼리가 있을 수 있으며 자유롭게 사용이 가능하다. 쿼리 키만 잘 지켜주면 된다. 쿼리키는 고유한 것으로 겹치면 안된다.
   */
  const posts = useQuery<ITodo[], Error>(
    [ 'getTotos', ],
    getTodos,
    {
      staleTime: 2000,
    }
  );

  const { status, error, data, } = useQuery<ITodo[], Error>(
    [ 'pageData', currentPage, ],
    () => getPageTodos(currentPage),
    {
      staleTime: 2000,
      keepPreviousData: true, // 데이터를 유지하고 있게끔 할 수 있다.
    }
  );

  const total = posts.data?.length;
  const limit = 2;
  const maxPage = Math.ceil(total / limit);

  function prevPage() {
    console.log('이전 버튼 눌림');
    setCurrentPage((prev) => prev - 1);
  }

  function nextPage() {
    console.log('다음 버튼 눌림');
    setCurrentPage((prev) => prev + 1);
  }

  return (
    <>
      <AppLayout
        title='페이지 테스트'
        url='/page-test'
      >
        <div id='page-test-page'>
          {status === 'loading' && (
            <p>로딩중...</p>
          )}

          {status === 'error' && (
            <p>{error.message}</p>
          )}

          {status === 'success' && (
            <>
              <div>
                <h1>페이지 {currentPage}</h1>
                {data.map((item) => (
                  <div key={item.id}>
                    <h2>{item.title}</h2>
                    <p>{item.content}</p>
                  </div>
                ))}
              </div>
              <button onClick={prevPage} disabled={currentPage <= 1}>PREV</button>
              <button onClick={nextPage} disabled={currentPage >= maxPage}>NEXT</button>

              <Link to='/'>홈</Link>
            </>
          )}
        </div>
      </AppLayout>
    </>
  );
}
