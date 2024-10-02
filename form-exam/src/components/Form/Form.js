import React, { useState } from 'react';
import './Form.css';
import {validateDateOfBirth, validateFullName, validatePhoneNumber, validateEmail, validateFutureDate} from './Utils.js'

const MainForm = () => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [email, setEmail] = useState('');
  const [futureDate, setFutureDate] = useState('');
  const [fullNameError, setFullNameError] = useState('');
  const [dateOfBirthError, setDateOfBirthError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [futureDateError, setFutureDateError] = useState('');

  const handleFullNameChange = (value) => {
    setFullName(value);
    if (value.trim() === '') {
      setFullNameError('ФИО не может быть пустым');
    } else if (!validateFullName(value)) {
      setFullNameError('Пожалуйста, введите корректное ФИО (хотя бы два слова кириллицей)');
    } else {
      setFullNameError('');
    }
  };

  const formatPhoneNumber = (value) => {
    const cleaned = ('' + value).replace(/\D/g, '');
    let match = cleaned.match(/^(7|8)?(\d{3})(\d{3})(\d{2})(\d{2})$/);
    if (match) {
      let intlCode = (match[1] ? '+7' : '');
      return [intlCode, match[2], match[3], match[4], match[5]].filter(Boolean).join('-');
    }
    return value;
  };

  const handlePhoneNumberChange = (value) => {
    const formattedValue = formatPhoneNumber(value);
    setPhoneNumber(formattedValue);

    if (value.trim() === '') {
      setPhoneNumberError('Номер телефона не может быть пустым');
    } else {
      setPhoneNumberError('');
    }
  };

  const handleDateOfBirthChange = (value) => {
    setDateOfBirth(value);
    if (value.trim() === '') {
      setDateOfBirthError('Выберете дату начала бронирования');
    } else {
      setDateOfBirthError('');
    }
  };

  const handleEmailChange = (value) => {
    setEmail(value);
    if (value.trim() === '') {
      setEmailError('Email не может быть пустым');
    } else if (!validateEmail(value)) {
      setEmailError('Пожалуйста, введите корректный адрес электронной почты');
    } else {
      setEmailError('');
    }
  };

  const handleFutureDateChange = (value) => {
    setFutureDate(value);
    if (value.trim() === '') {
      setFutureDateError('Выберете дату конца бронирования');
    } else if (!validateFutureDate(value)) {
      setFutureDateError('Пожалуйста, введите дату, которая как минимум следующий день от текущего');
    } else {
      setFutureDateError('');
    }
  };

  const handleBlur = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case 'fullName':
        handleFullNameChange(value);
        break;
      case 'dateOfBirth':
        handleDateOfBirthChange(value);
        break;
      case 'phoneNumber':
        handlePhoneNumberChange(value);
        break;
      case 'email':
        handleEmailChange(value);
        break;
      case 'futureDate':
        handleFutureDateChange(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Дополнительная проверка перед отправкой формы, если нужно
  };

  return (
    <main className="main">
      <form onSubmit={handleSubmit} className="form">
        <h1>Аренда фотостудии</h1>
        <div className="formGroup">
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => handleFullNameChange(e.target.value)}
            onBlur={handleBlur}
            placeholder="ФИО"
            required
          />
          <label htmlFor="fullName" className="label sr-only">ФИО</label>
          {fullNameError && <p className="error">{fullNameError}</p>}
        </div>
        <div className="formGroup">
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => handlePhoneNumberChange(e.target.value)}
            onBlur={handleBlur}
            placeholder="Номер телефона"
            required
          />
          <label htmlFor="phoneNumber" className="label sr-only">Номер телефона</label>
          {phoneNumberError && <p className="error">{phoneNumberError}</p>}
        </div>
        <div className="formGroup">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            onBlur={handleBlur}
            placeholder="Почта"
            required
          />
          <label htmlFor="email" className="label sr-only">Электронная почта</label>
          {emailError && <p className="error">{emailError}</p>}
        </div>
        <div className="formGroup">
          <input
            type="date"
            id="dateOfBirth"
            value={dateOfBirth}
            onChange={(e) => handleDateOfBirthChange(e.target.value)}
            onBlur={handleBlur}
            placeholder="01.01.1990"
            required
          />
          <label htmlFor="dateOfBirth" className="label sr-only">Дата начала бронирования</label>
          {dateOfBirthError && <p className="error">{dateOfBirthError}</p>}
          Дата начала бронирования
        </div>
        <div className="formGroup">
          <input
            type="date"
            id="futureDate"
            value={futureDate}
            onChange={(e) => handleFutureDateChange(e.target.value)}
            onBlur={handleBlur}
            required
          />
          <label htmlFor="futureDate" className="label sr-only">Дата конца бронирования</label>
          {futureDateError && <p className="error">{futureDateError}</p>}
          Дата конца бронирования
        </div>
        <button type="submit">Забронировать</button>
      </form>
    </main>
  );
};

export default MainForm;