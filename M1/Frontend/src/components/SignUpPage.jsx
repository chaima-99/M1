/* global setTimeout */
/* global console */
import React, { useState, useEffect } from 'react';
import { User, Lock, Eye, EyeOff, Phone, Mail } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import women from '../assets/women.png'; // Make sure you have this image

const SignUpPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  // Initialize AOS (Animation On Scroll) effect
  useEffect(() => {
    const elements = document.querySelectorAll('[data-aos]');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Username validation
    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    // Phone validation
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-()]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      console.log('Attempting to register with data:', formData); // Debug log
      
      // Try multiple possible endpoints
      let response;
      try {
        // First try the register endpoint
        response = await axios.post('http://localhost:5000/api/users/register', {
          username: formData.username,
          phone: formData.phone,
          email: formData.email,
          password: formData.password
        });
      } catch (registerError) {
        console.log('Register endpoint failed, trying /users endpoint:', registerError.message);
        
        // If register fails, try the general users endpoint
        response = await axios.post('http://localhost:5000/api/users', {
          username: formData.username,
          phone: formData.phone,
          email: formData.email,
          password: formData.password
        });
      }

      console.log('Registration successful:', response.data); // Debug log
      
      // Show success message
      alert('Account created successfully! Please login.');
      
      // Navigate to login page
      navigate('/login');

    } catch (error) {
      console.error('Full error object:', error); // Debug log
      console.error('Error response:', error.response); // Debug log
      console.error('Error message:', error.message); // Debug log
      
      let errorMessage = 'Registration failed. Please try again.';
      
      if (error.response) {
        // Server responded with error status
        console.error('Server error status:', error.response.status);
        console.error('Server error data:', error.response.data);
        
        if (error.response.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.data?.error) {
          errorMessage = error.response.data.error;
        } else if (error.response.status === 404) {
          errorMessage = 'Registration endpoint not found. Please check your backend server.';
        } else if (error.response.status === 500) {
          errorMessage = 'Server error. Please try again later.';
        }
      } else if (error.request) {
        // Request was made but no response received
        console.error('No response received:', error.request);
        errorMessage = 'Cannot connect to server. Please check if your backend is running on http://localhost:5000';
      }
      
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginClick = () => {
    // Navigate to login page
    navigate('/login');
  };

  const handleGoogleSignUp = () => {
    // Implement Google OAuth signup
    console.log('Google signup clicked');
    // You can integrate with Google OAuth here
    alert('Google signup integration - implement OAuth flow');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Sign Up Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 bg-white relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0">
          <div 
            className="absolute top-20 left-8 w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-10"
            data-aos="fade-in"
            style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.6s ease' }}
          ></div>
          <div 
            className="absolute top-32 left-24 w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-20"
            data-aos="fade-in"
            style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.6s ease' }}
          ></div>
          <div className="absolute bottom-8 left-8 w-16 h-16 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full opacity-10"></div>
          <div className="absolute bottom-16 right-8 w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full opacity-20"></div>
          <div className="absolute top-1/4 right-12 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full opacity-15"></div>
        </div>

        <div className="w-full max-w-md relative z-10">
          {/* Header */}
          <div 
            className="text-center mb-8"
            data-aos="fade-up"
            style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.6s ease' }}
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">SIGN UP</h1>
            <p className="text-gray-600 text-sm sm:text-base">Create your account to get started</p>
          </div>

          {/* Sign Up Form */}
          <form onSubmit={handleSubmit}>
            <div 
              className="space-y-6"
              data-aos="fade-up"
              style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.6s ease' }}
            >
              {/* Username Input */}
              <div className="relative">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Username"
                    className={`w-full pl-12 pr-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                      errors.username ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                </div>
                {errors.username && (
                  <p className="mt-1 text-sm text-red-500">{errors.username}</p>
                )}
              </div>

              {/* Phone Input */}
              <div className="relative">
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone"
                    className={`w-full pl-12 pr-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                      errors.phone ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                )}
              </div>

              {/* Email Input */}
              <div className="relative">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    className={`w-full pl-12 pr-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                      errors.email ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Password Input */}
              <div className="relative">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    className={`w-full pl-12 pr-12 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                      errors.password ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              {/* Get Started Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 px-6 rounded-xl font-medium hover:from-purple-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating Account...
                  </div>
                ) : (
                  'Get Started'
                )}
              </button>

              {/* SignUp with Others */}
              <div 
                className="text-center"
                data-aos="fade-up"
                style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.6s ease' }}
              >
                <p className="text-gray-600 mb-4 font-medium">SignUp with Others</p>
                <button
                  type="button"
                  onClick={handleGoogleSignUp}
                  className="w-full flex items-center justify-center gap-3 py-3 px-6 border border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all transform hover:scale-[1.01] shadow-sm"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-gray-700 font-medium">Login with Google</span>
                </button>
              </div>
            </div>
          </form>

          {/* Login Link */}
          <div 
            className="text-center mt-8"
            data-aos="fade-up"
            style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.6s ease' }}
          >
            <p className="text-gray-800 font-semibold mb-4">you have an account ?</p>
            <button
              onClick={handleLoginClick}
              className="w-full bg-gradient-to-r from-pink-400 to-pink-500 text-white py-3 px-6 rounded-xl font-medium hover:from-pink-500 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-all transform hover:scale-[1.02] shadow-lg"
            >
              Login
            </button>
          </div>
        </div>
      </div>

      {/* Right Side - Hero Section */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-purple-400 via-purple-500 to-blue-500 items-center justify-center p-8 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute top-40 right-32 w-16 h-16 bg-white rounded-full"></div>
          <div className="absolute bottom-32 left-32 w-24 h-24 bg-white rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-8 h-8 bg-white rounded-full"></div>
        </div>

        <div 
          className="text-center text-white max-w-md relative z-10"
          data-aos="fade-left"
          style={{ opacity: 0, transform: 'translateX(50px)', transition: 'all 0.8s ease' }}
        >
          {/* Decorative Element */}
          <div className="mb-8 relative">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-white/20 to-white/10 rounded-full flex items-center justify-center backdrop-blur-sm shadow-xl">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-orange-400 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          {/* Image placeholder */}
          <div className="mb-8">
            <div className="w-64 h-64 mx-auto bg-white/10 rounded-3xl backdrop-blur-sm flex items-center justify-center shadow-2xl border border-white/20">
              <div className="text-center">
                <img src={women} alt="women picture" className='relative right-10'/>
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute -top-8 -right-8 w-6 h-6 bg-yellow-300 rounded-full animate-bounce opacity-70"></div>
          <div className="absolute top-1/2 -left-12 w-4 h-4 bg-pink-300 rounded-full animate-pulse opacity-60"></div>
          <div className="absolute -bottom-4 right-1/4 w-8 h-8 bg-blue-300 rounded-full animate-bounce opacity-50" style={{ animationDelay: '0.5s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;