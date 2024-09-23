import React, { useState } from 'react';
import { Modal, Input } from 'antd';

const AddCompanyModal = ({ visible, onClose, onAddCompany }) => {
  const [companyName, setCompanyName] = useState('');
  const [registrationNo, setRegistrationNo] = useState('');
  const [gstNo, setGstNo] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [location, setLocation] = useState('');
  const [representative, setRepresentative] = useState('');

  const [validationErrors, setValidationErrors] = useState({});

  const validateInput = (value) => {
    return value ? null : 'This field is required!';
  };

  const handleAdd = () => {
    const newCompany = {
      companyName,
      registrationNo,
      gstNo,
      companyId,
      contactNo,
      location,
      representative,
    };

    // Perform validations
    const errors = {
      companyName: validateInput(companyName),
      registrationNo: validateInput(registrationNo),
      gstNo: validateInput(gstNo),
      companyId: validateInput(companyId),
      contactNo: validateInput(contactNo),
      location: validateInput(location),
      representative: validateInput(representative),
    };

    if (Object.values(errors).some(error => error)) {
      setValidationErrors(errors);
      return; // Stop the process if there are errors
    }

    // Save new company to local storage
    const existingCompanies = JSON.parse(localStorage.getItem('companies')) || [];
    existingCompanies.push(newCompany);
    localStorage.setItem('companies', JSON.stringify(existingCompanies));

    // Call the parent function to add company
    onAddCompany(newCompany);
    
    // Reset fields and validation errors
    setCompanyName('');
    setRegistrationNo('');
    setGstNo('');
    setCompanyId('');
    setContactNo('');
    setLocation('');
    setRepresentative('');
    setValidationErrors({});
    onClose();
  };

  const handleBlur = (field, value) => {
    const error = validateInput(value);
    setValidationErrors((prev) => ({ ...prev, [field]: error }));
  };

  return (
    <Modal
      visible={visible}
      title="Add Company"
      onOk={handleAdd}
      onCancel={onClose}
    >
      <Input
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        onBlur={() => handleBlur('companyName', companyName)}
        placeholder="Enter company name"
        className={validationErrors.companyName ? 'border-red-500' : ''}
      />
      {validationErrors.companyName && <span style={{ color: 'red' }}>{validationErrors.companyName}</span>}
      
      <Input
        value={registrationNo}
        onChange={(e) => setRegistrationNo(e.target.value)}
        onBlur={() => handleBlur('registrationNo', registrationNo)}
        placeholder="Enter registration number"
        style={{ marginTop: 10 }}
        className={validationErrors.registrationNo ? 'border-red-500' : ''}
      />
      {validationErrors.registrationNo && <span style={{ color: 'red' }}>{validationErrors.registrationNo}</span>}
      
      <Input
        value={gstNo}
        onChange={(e) => setGstNo(e.target.value)}
        onBlur={() => handleBlur('gstNo', gstNo)}
        placeholder="Enter GST number"
        style={{ marginTop: 10 }}
        className={validationErrors.gstNo ? 'border-red-500' : ''}
      />
      {validationErrors.gstNo && <span style={{ color: 'red' }}>{validationErrors.gstNo}</span>}
      
      <Input
        value={companyId}
        onChange={(e) => setCompanyId(e.target.value)}
        onBlur={() => handleBlur('companyId', companyId)}
        placeholder="Enter company ID"
        style={{ marginTop: 10 }}
        className={validationErrors.companyId ? 'border-red-500' : ''}
      />
      {validationErrors.companyId && <span style={{ color: 'red' }}>{validationErrors.companyId}</span>}
      
      <Input
        value={contactNo}
        onChange={(e) => setContactNo(e.target.value)}
        onBlur={() => handleBlur('contactNo', contactNo)}
        placeholder="Enter contact number"
        style={{ marginTop: 10 }}
        className={validationErrors.contactNo ? 'border-red-500' : ''}
      />
      {validationErrors.contactNo && <span style={{ color: 'red' }}>{validationErrors.contactNo}</span>}
      
      <Input
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        onBlur={() => handleBlur('location', location)}
        placeholder="Enter location"
        style={{ marginTop: 10 }}
        className={validationErrors.location ? 'border-red-500' : ''}
      />
      {validationErrors.location && <span style={{ color: 'red' }}>{validationErrors.location}</span>}
      
      <Input
        value={representative}
        onChange={(e) => setRepresentative(e.target.value)}
        onBlur={() => handleBlur('representative', representative)}
        placeholder="Enter representative name"
        style={{ marginTop: 10 }}
        className={validationErrors.representative ? 'border-red-500' : ''}
      />
      {validationErrors.representative && <span style={{ color: 'red' }}>{validationErrors.representative}</span>}
    </Modal>
  );
};

export default AddCompanyModal;