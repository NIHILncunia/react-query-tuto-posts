import React from 'react';

interface IMain {
  children: React.ReactNode;
}

export function Main({ children, }: IMain) {
  return (
    <>
      <main>{children}</main>
    </>
  );
}
