'use client'
import React, { useState } from 'react';
import bcrypt from 'bcryptjs';
import mutationClient from '@/sanity/lib/mutationClient';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [country, setCountry] = useState('');
  const [gender, setGender] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleForm = async () => {
    if (!termsAccepted) {
      alert('Please accept the terms and conditions.');
      return;
    }

    setIsLoading(true);

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      await mutationClient.create({
        _type: 'customer',
        email,
        password: hashedPassword,
        firstName,
        lastName,
        country,
        gender,
      });

      alert('Registration successful!');
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-lg max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Join Us</h1>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select Country</option>
            <option value="India">India</option>
            <option value="Pakistan">Pakistan</option>
            <option value="USA">USA</option>
          </select>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setGender('Male')}
              className={`p-2 w-full border rounded-md ${
                gender === 'Male' ? 'bg-black text-white' : 'bg-white'
              }`}
            >
              Male
            </button>
            <button
              type="button"
              onClick={() => setGender('Female')}
              className={`p-2 w-full border rounded-md ${
                gender === 'Female' ? 'bg-black text-white' : 'bg-white'
              }`}
            >
              Female
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            <span>Accept terms and conditions</span>
          </div>
          <button
            onClick={handleForm}
            disabled={isLoading || !email || !password || !firstName || !country || !gender}
            className="w-full bg-black text-white p-2 rounded-md"
          >
            {isLoading ? 'Processing...' : 'Join Us'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
