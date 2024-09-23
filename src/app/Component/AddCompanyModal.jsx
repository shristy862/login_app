import React, { useState } from 'react';
import { Modal, Input } from 'antd';

const AddCompanyModal = ({ visible, onClose, onAddCompany }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    registrationNo: '',
    gstNo: '',
    companyId: '',
    contactNo: '',
    location: '',
    representative: '',
  });

  const [validationErrors, setValidationErrors] = useState({});

  const validateInput = (value) => value ? null : 'This field is required!';

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setValidationErrors({ ...validationErrors, [field]: validateInput(value) });
  };

  const handleAddCompany = () => {
    const errors = Object.keys(formData).reduce((acc, field) => {
      acc[field] = validateInput(formData[field]);
      return acc;
    }, {});

    if (Object.values(errors).some((error) => error)) {
      setValidationErrors(errors);
      return; // Stop if there are validation errors
    }

    // Call parent function to add the company
    onAddCompany(formData);

    // Reset form data and errors
    setFormData({
      companyName: '',
      registrationNo: '',
      gstNo: '',
      companyId: '',
      contactNo: '',
      location: '',
      representative: '',
    });
    setValidationErrors({});
    onClose();
  };

  const renderInputField = (label, value, field) => (
    <>
      <Input
        value={value}
        onChange={(e) => handleInputChange(field, e.target.value)}
        onBlur={() => handleInputChange(field, value)}
        placeholder={`Enter ${label.toLowerCase()}`}
        style={{ marginTop: 10 }}
        className={validationErrors[field] ? 'border-red-500' : ''}
      />
      {validationErrors[field] && <span style={{ color: 'red' }}>{validationErrors[field]}</span>}
    </>
  );

  return (
    <Modal
      open={visible}
      title="Add Company"
      onOk={handleAddCompany}
      onCancel={onClose}
    >
      {renderInputField('Company Name', formData.companyName, 'companyName')}
      {renderInputField('Registration Number', formData.registrationNo, 'registrationNo')}
      {renderInputField('GST Number', formData.gstNo, 'gstNo')}
      {renderInputField('Company ID', formData.companyId, 'companyId')}
      {renderInputField('Contact Number', formData.contactNo, 'contactNo')}
      {renderInputField('Location', formData.location, 'location')}
      {renderInputField('Representative Name', formData.representative, 'representative')}
    </Modal>
  );
};

export default AddCompanyModal;
