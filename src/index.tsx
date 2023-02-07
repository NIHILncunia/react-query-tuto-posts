import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { HomePage } from './pages';
import { TodoDetailPage } from './pages/TodoDetailPage';

import '@/styles/tailwind.css';
import { UsersPage } from './pages/UsersPage';
import { PageTest } from './pages/PageTest';

const queryClient = new QueryClient();

const ReduxApp = (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/todos/:id' element={<TodoDetailPage />} />
        <Route path='/users' element={<UsersPage />} />
        <Route path='/pagetest' element={<PageTest />} />
      </Routes>
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
  </QueryClientProvider>
);

const root = createRoot(document.querySelector('#root'));
root.render(ReduxApp);
