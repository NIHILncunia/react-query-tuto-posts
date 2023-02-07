import React from 'react';
import { Link } from 'react-router-dom';

export function Nav() {
  return (
    <>
      <nav>
        <Link to='/'>홈</Link>
        <Link to='/users'>유저 목록</Link>
      </nav>
    </>
  );
}
