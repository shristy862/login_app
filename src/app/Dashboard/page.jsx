"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Layout, Button, Table } from 'antd';
import 'antd/dist/reset.css';
import AddCompanyModal from '../Component/AddCompanyModal';
import Header from '../Component/Header';
import Sidebar from '../Component/Sidebar';
import Footer from '../Component/Footer';

const { Column } = Table;
const { Content, Sider } = Layout;

const Dashboard = () => {
  const [email, setEmail] = useState('');
  const [companies, setCompanies] = useState([]); 
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('1');
  const router = useRouter();

  useEffect(() => {
    
    if (typeof window !== 'undefined') {
      const userEmail = localStorage.getItem('userEmail');
      const userType = localStorage.getItem('userType');

      if (userType !== 'admin') {
        router.push('/login'); // Redirect to login if not admin
      } else {
        setEmail(userEmail);
      }
    }
  }, [router]);

  const handleAddCompany = (newCompany) => {
    setCompanies([...companies, newCompany]);
    setModalVisible(false); // Close the modal after adding the company
  };

  // Define the logout function
  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userType');
      window.location.href = '/login'; 
    }
  };

  const renderContent = () => {
    if (selectedMenu === '3') {
      // Dashboard content
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
      // Default content for other menu items
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
        <Footer />
      </Layout>
    </Layout>
  );
};

export default Dashboard;
