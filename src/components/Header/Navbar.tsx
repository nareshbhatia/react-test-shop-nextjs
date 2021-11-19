import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Navbar.module.css';

const navItems = [
  { title: 'Home', path: '/' },
  { title: 'Orders', path: '/orders' },
];

export const Navbar = () => {
  const router = useRouter();

  return (
    <nav className={styles.root}>
      <span className={styles.brand}>React Test Shop</span>

      <ul className="flex-1">
        {navItems.map((item) => {
          const { title, path } = item;
          return (
            <li key={title}>
              <Link href={path}>
                <a
                  className={`${styles.link} ${
                    router.pathname === path ? styles.active : ''
                  }`}
                >
                  {title}
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
