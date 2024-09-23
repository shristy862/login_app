import React, { useState } from 'react';
import { AppstoreOutlined, HomeOutlined, PhoneOutlined, QuestionCircleOutlined, LogoutOutlined } from '@ant-design/icons';
import { Menu, Switch } from 'antd';

const Sidebar = ({ onSelectMenu, onLogout }) => {
  const [theme, setTheme] = useState('dark');
  const [current, setCurrent] = useState('1');

  const userType = localStorage.getItem('userType'); // Get user type from local storage

  const items = [
    {
      key: '1',
      label: 'Home',
      icon: <HomeOutlined />,
    },
    {
      key: '2',
      label: 'Contact Us',
      icon: <PhoneOutlined />,
    },
    {
      key: '4',
      label: 'Queries',
      icon: <QuestionCircleOutlined />,
    },
    {
      key: '5',
      label: 'Logout',
      icon: <LogoutOutlined />,
    },
  ];

  // Add the Dashboard item only if the user is an admin
  if (userType === 'admin') {
    items.splice(2, 0, {
      key: '3',
      label: 'Dashboard',
      icon: <AppstoreOutlined />,
    });
  }

  const changeTheme = (value) => {
    setTheme(value ? 'dark' : 'light');
  };

  const onClick = (e) => {
    setCurrent(e.key);
    onSelectMenu(e.key);

    if (e.key === '5') {
      onLogout();
    }
  };

  return (
    <div style={{ width: 200, height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Menu
        theme={theme}
        onClick={onClick}
        style={{ flex: 1, borderRight: 0 }}
        selectedKeys={[current]}
        mode="inline"
        items={items}
      />
      <div style={{ padding: '16px', textAlign: 'center' }}>
        <Switch
          checked={theme === 'dark'}
          onChange={changeTheme}
          checkedChildren="Dark"
          unCheckedChildren="Light"
        />
      </div>
    </div>
  );
};

export default Sidebar;