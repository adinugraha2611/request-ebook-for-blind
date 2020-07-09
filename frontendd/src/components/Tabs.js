/**
 * tabs props will appear based on login status
 * handleTab(value) akan dijalankan saat tab di klik
 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const handleTab = (e, value) => {
  e.preventDefault();
  alert(value);
};

export const Tabs = ({ activeTab, userStatus, isSignedIn }) => {
  const showTabs = () => {
    if (!isSignedIn) {
      return [
        { label: 'Home', value: 1, url: '/' },
        { label: 'Register', value: 2, url: '/register' },
        { label: 'Sign in', value: 3, url: '/sign-in' },
      ];
    } else {
      return userStatus.role === 'admin'
        ? [
            { label: 'Home', value: 1, url: '/' },
            { label: 'Admin Tools', value: 2, url: '/admin-tools' },
            { label: 'Sign out', value: 3, url: '/sign-out' },
          ]
        : [
            { label: 'Home', value: 1, url: '/' },
            { label: 'My Request List', value: 2, url: '/user/requests' },
            { label: 'Sign out', value: 3, url: '/sign-out' },
          ];
    }
  };
  const tabs = showTabs();
  const welcomeMessage = () => {
    if (!isSignedIn) return <span>Selamat datang. Silahkan Sign in</span>;
    else
      return userStatus.role === 'admin' ? (
        <span>{`Anda masuk dengan akun ${userStatus.email} sebagai admin`}</span>
      ) : (
        <span>{`Anda masuk dengan akun ${userStatus.email}`}</span>
      );
  };
  return (
    <nav className="tab-manager">
      {welcomeMessage()}
      <ul>
        {tabs.map(({ label, value, url }) => (
          <li
            key={value}
            className={`tab ${value === activeTab ? 'selected-tab' : ''}`}
          >
            <Link to={url}>{label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
