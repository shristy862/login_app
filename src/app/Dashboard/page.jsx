"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Layout, Button, Table } from 'antd';
import 'antd/dist/reset.css';
import AddCompanyModal from '../Component/AddCompanyModal';
import Header from '../Component/Header';
import Sidebar from '../Component/Sidebar';

const { Column } = Table;
const { Content, Sider } = Layout;

const Dashboard = () => {
  const [email, setEmail] = useState('');
  const [companies, setCompanies] = useState([]); 
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('1');
  const router = useRouter();

  useEffect(() => {
    // Instead of localStorage, log user info to the console
    const userEmail = 'user@example.com';  // Replace with actual user email logic
    const userType = 'admin';               // Replace with actual user type logic

    console.log('User Email:', userEmail);
    console.log('User Type:', userType);

    if (userType !== 'admin') {
      router.push('/login'); // Redirect to login if not admin
    } else {
      setEmail(userEmail);
    }
  }, [router]);

  const handleAddCompany = (newCompany) => {
    // Update the companies state with the new company
    setCompanies((prevCompanies) => [...prevCompanies, newCompany]);
    setModalVisible(false); // Close the modal after adding the company
  };

  const handleLogout = () => {
    console.log('User logged out'); // Log logout action
    router.push('/login'); // Redirect to login
  };

  const renderContent = () => {
    if (selectedMenu === '3') {
      return (
        <>
          <Button
            type="primary"
            onClick={() => setModalVisible(true)}
            style={{ marginBottom: '20px' }}
          >
            Add Company
          </Button>
          <AddCompanyModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            onAddCompany={handleAddCompany}
          />
          <Table dataSource={companies} style={{ marginTop: '20px' }}>
            <Column title="Company Name" dataIndex="companyName" key="companyName" />
            <Column title="Registration No" dataIndex="registrationNo" key="registrationNo" />
            <Column title="GST No" dataIndex="gstNo" key="gstNo" />
            <Column title="Company ID" dataIndex="companyId" key="companyId" />
            <Column title="Contact No" dataIndex="contactNo" key="contactNo" />
            <Column title="Location" dataIndex="location" key="location" />
            <Column title="Representative" dataIndex="representative" key="representative" />
          </Table>
        </>
      );
    } else {
      return <h1>Welcome</h1>;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200}>
        <Sidebar
          onSelectMenu={(key) => setSelectedMenu(key)}
          onLogout={handleLogout} // Passed the handleLogout function as a prop
        />
      </Sider>
      <Layout>
        <Header email={email} />
        <Content style={{ margin: '16px' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            {renderContent()}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
