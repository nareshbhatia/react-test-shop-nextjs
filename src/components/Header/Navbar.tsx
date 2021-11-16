import React from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

export const Navbar = () => {
  return (
    <nav className={styles.root}>
      <span className={styles.brand}>React Test Shop</span>

      <ul className="flex-1">
        <li>
          <Link href="/">
            <a className={styles.link}>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/orders">
            <a className={styles.link}>Orders</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
