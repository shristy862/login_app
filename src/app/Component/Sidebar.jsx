import React, { useContext, useState } from 'react';
import { AppstoreOutlined, HomeOutlined, PhoneOutlined, QuestionCircleOutlined, LogoutOutlined } from '@ant-design/icons';
import { Menu, Switch } from 'antd';
import { UserContext } from '../Component/userContext';

const Sidebar = ({ onSelectMenu, onLogout }) => {
  const { state, dispatch } = useContext(UserContext); // Use context to get state
  const [current, setCurrent] = useState('1'); // Default selected key
  const [theme, setTheme] = useState('dark'); // Default theme

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

  if (state.userType === 'admin') {
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
      dispatch({ type: 'CLEAR_USER' }); // Clear user state on logout
      onLogout();
    }
  };

  return (
    <div style={{ width: 200, height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Menu
        theme={theme} // Ensure theme is defined here
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