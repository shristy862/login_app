"use client"; // Mark this file as a client component

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'; // Import icons from Ant Design

// Function to validate email format
const validateEmail = (email) => {
  if (!email.includes('@')) {
    return {
      validateStatus: 'warning',
      errorMsg: 'Email must contain "@"!',
    };
  }
  return {
    validateStatus: 'success',
    errorMsg: null,
  };
};

// Function to validate password
const validatePassword = (password) => {
  const capitalLetters = password.match(/[A-Z]/g);
  if (!capitalLetters || capitalLetters.length <= 1) {
    return {
      validateStatus: 'warning',
      errorMsg: 'Password must contain more than one capital letter!',
    };
  }
  return {
    validateStatus: 'success',
    errorMsg: null,
  };
};

// Function to validate user type selection
const validateUserType = (userType) => {
  if (userType === "admin" || userType === "employee") {
    return {
      validateStatus: 'success',
      errorMsg: null,
    };
  }
  return {
    validateStatus: 'error',
    errorMsg: 'Please select a valid user type!',
  };
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  const [emailValidation, setEmailValidation] = useState({});
  const [passwordValidation, setPasswordValidation] = useState({});
  const [userTypeValidation, setUserTypeValidation] = useState({});

  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    // Check if all validations pass
    if (
      emailValidation.validateStatus === 'success' &&
      passwordValidation.validateStatus === 'success' &&
      userTypeValidation.validateStatus === 'success'
    ) {
      console.log(`Logging in with : ${email}
         passcode: ${password} 
        accountType : ${userType}`);

      localStorage.setItem('userEmail', email);
      localStorage.setItem('userType', userType);

      if (userType === 'admin') {
        router.push('/Dashboard');
      } else {
        router.push('/Dashboard');
      }
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailValidation(validateEmail(value));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordValidation(validatePassword(value));
  };

  const handleUserTypeChange = (e) => {
    const value = e.target.value;
    setUserType(value);
    setUserTypeValidation(validateUserType(value));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-700">
      <h1 className="text-2xl text-black mb-4">Login</h1>
      <form onSubmit={handleLogin} className="flex text-black flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          onBlur={() => setEmailValidation(validateEmail(email))}
          className={`border-2 p-2 w-80 ${emailValidation.validateStatus === 'warning' ? 'border-yellow-600 ring-2 ring-yellow-400' :
            emailValidation.validateStatus === 'error' ? 'border-red-600 ring-2 ring-red-400' :
              emailValidation.validateStatus === 'success' ? 'border-green-600 ring-2 ring-green-400' : ''}`}
        />
        <span className={`text-${emailValidation.validateStatus === 'warning' ? 'yellow-600' : 'red-600'}`}>
          {emailValidation.errorMsg}
        </span>

        <div className="relative w-80">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            onBlur={() => setPasswordValidation(validatePassword(password))}
            className={`border-2 p-2 w-full ${passwordValidation.validateStatus === 'warning' ? 'border-yellow-600 ring-2 ring-yellow-400' :
              passwordValidation.validateStatus === 'error' ? 'border-red-600 ring-2 ring-red-400' :
                passwordValidation.validateStatus === 'success' ? 'border-green-600 ring-2 ring-green-400' : ''}`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 focus:outline-none"
          >
            {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
          </button>
        </div>
        <span className={`text-${passwordValidation.validateStatus === 'warning' ? 'yellow-600' : 'red-600'}`}>
          {passwordValidation.errorMsg}
        </span>

        <select
          value={userType}
          onChange={handleUserTypeChange}
          onBlur={() => setUserTypeValidation(validateUserType(userType))}
          className={`border-2 p-2 w-80 ${userTypeValidation.validateStatus === 'error' ? 'border-red-600 ring-2 ring-red-400' :
              userTypeValidation.validateStatus === 'success' ? 'border-green-600 ring-2 ring-green-400' : ''}`}
          required
        >
          <option value="">Select User Type</option>
          <option value="admin">Admin</option>
          <option value="employee">Employee</option>
        </select>
        <span className="text-red-500">{userTypeValidation.errorMsg}</span>

        <button
          type="submit"
          className={`bg-blue-600 text-white p-2 rounded ${emailValidation.validateStatus === 'success' &&
            passwordValidation.validateStatus === 'success' &&
            userTypeValidation.validateStatus === 'success' ? '' :
            'opacity-50 cursor-not-allowed'}`}
          disabled={
            emailValidation.validateStatus !== 'success' ||
            passwordValidation.validateStatus !== 'success' ||
            userTypeValidation.validateStatus !== 'success'}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;