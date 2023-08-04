'use client';

import Link from 'next/link';
import React from 'react';

const NavLinkPagination = React.forwardRef((props: any, ref: any) => {
  const { href, active, eventKey, as, ...rest } = props;
  return (
    <Link
      href={`/search?page=${eventKey}`}
      className={active ? 'active' : ''}
      as={as}
      ref={ref}
      {...rest}
    ></Link>
  );
});

export default NavLinkPagination;
