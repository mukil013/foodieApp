import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface FormData {
  email: string;
  password: string;
  userName: string;
  seller: string;
}

interface Errors {
  email?: string;
  password?: string;
  userName?: string;
  seller?: string;
}

export default function Register() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    userName: "",
    seller: ""
  });
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  
  const validateForm = (): boolean => {
    const newErrors: Errors = {};
    
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.userName) newErrors.userName = "Username is required";
    if (!formData.seller) newErrors.seller = "Seller type is required";
    
    setErrors(newErrors); 
    
    
    return Object.keys(newErrors).length === 0;
  };

  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    
    if (validateForm()) {
      setIsSubmitting(true); 
      try {
        console.log(formData);
        
        const response = await axios.post('http://localhost:5555/user/register', formData);
        console.log("Registration successful:", response.data);
        window.location.href = '/'
      } catch (err:any) {
        console.log("Registration failed:", err.message);
        
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-red-300 gap-5">
      <h1 className="text-6xl text-white font-bold">Foodiee</h1>
      <form onSubmit={handleSubmit} className="h-fit w-1/2 bg-white rounded-md shadow-xl flex flex-col justify-center items-center p-4">
        <div className="mb-4 w-full">
          <label className="block mb-2" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-blue-500"
          />
          {errors.email && <span className="text-sm text-red-600">{errors.email}</span>}
        </div>
        <div className="mb-4 w-full">
          <label className="block mb-2" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-blue-500"
          />
          {errors.password && <span className="text-sm text-red-600">{errors.password}</span>}
        </div>
        <div className="mb-4 w-full">
          <label className="block mb-2" htmlFor="userName">Username</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-blue-500"
          />
          {errors.userName && <span className="text-sm text-red-600">{errors.userName}</span>}
        </div>
        <div className="mb-4 w-full">
          <label className="block mb-2" htmlFor="seller">Seller Type</label>
          <select
            id="seller"
            name="seller"
            value={formData.seller}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-blue-500"
          >
            <option value="">[Select]</option>
            <option value="Buyer">Buyer</option>
            <option value="Seller">Seller</option>
          </select>
          {errors.seller && <span className="text-sm text-red-600">{errors.seller}</span>}
        </div>
        <button 
          type="submit" 
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300" 
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Register"}
        </button>
        <p className="p-2">Already a User ? <Link to='/login' className="underline">Login Here</Link></p>
      </form>
    </div>
  );
}
