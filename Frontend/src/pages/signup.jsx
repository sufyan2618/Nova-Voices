import React, { useState } from 'react';
import useAuthStore from '../store/useAuthStore';
import { Navigate } from 'react-router';
import { ClipLoader } from 'react-spinners';


const Signup = () => {

    const [redirect, setRedirect] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const { signup, isSigningUp } = useAuthStore();

    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
      };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await signup(formData);
            if(res){
                console.log(res);
            setRedirect(true)
            }

            
        } catch (error) {
            setRedirect(false)
        }
    };
    if (redirect) {
        return <Navigate to="/signin" replace />;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
            >
                <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">Sign Up</h1>
                {/* Name Input */}
                <div className="mb-4">
                    <input
                        type="text"
                        name='name'
                        placeholder="Name"
                        value= {formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        required
                    />
                </div>
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
                    {isSigningUp ? (<ClipLoader color="white" />) : ("Sign Up")}
                   
                </button>
            </form>
        </div>
    );
};

export default Signup;