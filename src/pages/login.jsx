import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext'; // Import the custom hook

function Login() {
    const navigate = useNavigate();
    const { setUserData } = useUserContext(); // Access the global state setter function

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '' });

    const handleSubmit = async (e) => {
      e.preventDefault();

      let formIsValid = true;
      const newErrors = { email: '', password: '' };

      if (!email) {
          formIsValid = false;
          newErrors.email = 'Email is required';
      }

      if (!password) {
          formIsValid = false;
          newErrors.password = 'Password is required';
      }

      setErrors(newErrors);

      if (formIsValid) {
          try {
              const response = await fetch('http://127.0.0.1:8000/login', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ email, password }),
              });

              if (!response.ok) {
                  const errorData = await response.json();
                  throw new Error(errorData.detail || 'Login failed');
              }

              const data = await response.json();
              console.log('API Response:', data);

              // Store the user data globally
              setUserData(data);

              // Navigate based on role
              switch (data.role) {
                  case 'admin':
                      navigate('/AdminAdd', { state: data });
                      break;
                  case 'maker':
                      navigate('/MakerComDet', { state: data });
                      break;
                  case 'authorizer':
                      navigate('/AuthComDet', { state: data });
                      break;
                  default:
                      throw new Error('Invalid role');
              }
          } catch (error) {
              console.error('Login error:', error.message);
              alert(error.message);
          }
      }
  };

    return (
        <div className="min-h-screen flex items-center justify-center w-full absolute inset-0 bg-cover bg-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', /* Dark overlay color */
        backgroundBlendMode: 'overlay'}}>

            {/* Header */}
            <header className="absolute top-0 left-0 right-0 px-10 py-4 bg-transparent flex justify-between items-center">
                <div className="text-4xl font-bold text-gray-800">DigiVCard</div>
            </header>

            {/* Login Form */}
            <div className="relative z-10 bg-white bg-opacity-90 rounded-lg shadow-lg p-8 w-full max-w-md mx-auto" >
                <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

                <form onSubmit={handleSubmit}>
                    
                    {/* Username Input */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="text"
                            className={`w-full px-4 py-2 mt-2 rounded-lg bg-gray-200 border ${errors.email ? 'border-red-500' : 'focus:border-gray-400'} focus:outline-none`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email id"
                        />
                        {errors.email && (
                            <span className="text-red-500 text-sm">{errors.email}</span>
                        )}
                    </div>

                    {/* Passcode Input */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                className={`w-full px-4 py-2 mt-2 rounded-lg bg-gray-200 border ${errors.password ? 'border-red-500' : 'focus:border-gray-400'} focus:outline-none`}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                            />
                            <span className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <i className="fas fa-eye text-gray-500"></i> {/* Replace with icon */}
                            </span>
                        </div>
                        {errors.password && (
                            <span className="text-red-500 text-sm">{errors.password}</span>
                        )}
                    </div>

                    {/* Forgot Passcode Link */}
                    <div className="text-right mb-4">
                        <a href="#" className="text-gray-600 hover:text-blue-500">
                            Forgot password?
                        </a>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-800 text-white py-2 rounded-lg hover:bg-blue-900"
                        onClick={() => handleSubmit}
                    >
                        LOGIN
                    </button>

                    {/* Create Account Link */}
                    <div className="mt-4 text-center">
                        <a href="#" className="text-gray-600 hover:text-blue-500">
                            New here? Register your company
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
