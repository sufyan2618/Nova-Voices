import React, { useState } from 'react';
import useAuthStore from '../store/useAuthStore';
import { Navigate } from 'react-router';
import { ClipLoader } from 'react-spinners';


const Signin = () => {

    const [redirect, setRedirect] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const { login, isLoggingIn } = useAuthStore();

    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
      };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login(formData);
            if(res){
            setRedirect(true)
            }

            
        } catch (error) {
            setRedirect(false)
        }
    };
    if (redirect) {
        return <Navigate to="/home" replace />;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
            >
                <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">Sign Up</h1>
                {/* Email Input */}
                <div className="mb-4">
                    <input
                        type="email"
                        name='email'
                        placeholder="Email"
                        value= {formData.email}
                        onChange= {handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        required
                    />
                </div>
                {/* Password Input */}
                <div className="mb-6">
                    <input
                        type="password"
                        name='password'
                        placeholder="Password"
                        value= {formData.password}
                        onChange= {handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        required
                    />
                </div>
                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
                >
                    {isLoggingIn ? (<ClipLoader color="white" />) : ("Login")}
                   
                </button>
            </form>
        </div>
    );
};

export default Signin;