import React from 'react';
import { useQuery } from 'react-query';
import { AppLayout } from '@/layouts/AppLayout';
import { getUsers } from '@/data/queries';
import { IUser } from '@/types/todos.types';

export function UsersPage() {
  const {
    isLoading, isError, error, data,
  } = useQuery<IUser[], Error>([ 'getUsers', ], getUsers);

  const url = '/users';

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
      <AppLayout title='유저 목록' url={url}>
        <div>
          <h1>유저 목록</h1>

          <div>
            {data.map((user) => (
              <div key={user.id}>
                <h2>{user.userId}</h2>
              </div>
            ))}
          </div>
        </div>
      </AppLayout>
    </>
  );
}
