import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface FormData {
  email: string;
  password: string;
}

interface Errors {
  email?: string;
  password?: string;
}

export default function Login() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const response = await axios.post('http://localhost:5555/user/login', formData);
        console.log("Login successful:", response.data);
        window.location.href = '/'
      } catch (err:any) {
        console.error("Login failed:", err.response?.data || err.message);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-blue-300 gap-5">
      <h1 className="text-6xl text-white font-bold">Login</h1>
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
        <button 
          type="submit" 
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300" 
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
        <p className="p-2">New User ? <Link to='/register' className="underline">Register Here</Link></p>
      </form>
    </div>
  );
}
