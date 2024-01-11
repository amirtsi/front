import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import './SignIn.css';


const SignIn = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (e) => {
    if (email === '' || password === '') {
      alert('Please fill in all fields');
      return;
    }
    history.push('/terminal');

    //return this after the  demo
    //  e.preventDefault();
    // try {
    //   const response = await axios.post('http://localhost:80/login', {
    //     email: email,
    //     password: password,
    //   });
  
    //   if (response.data.access_token) {
    //     // Login successful
    //     console.log('Login successful');
    //     // Save the token in localStorage or cookies
    //     localStorage.setItem('token', response.data.access_token);
    //     // Redirect to terminal page
    //     //TODO: change to dashboard
    //     history.push('/terminal');
    //   } else {
    //     // Handle case where login is not successful but no error is thrown
    //     console.error('Login failed');
    //   }
    // } catch (error) {
    //   // Handle errors such as incorrect credentials or server issues
    //   console.error(error.response ? error.response.data.detail : error.message);
    // }
  };
  
    return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <img
              className="mx-auto h-10 w-auto"
              src="/unicore_logo.svg"
              alt="Unicore"
            />
            <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Welcome back
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
            <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" onSubmit={handleSignIn}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                  <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={email} // Bind input value to the email state variable
                      onChange={(e) => setEmail(e.target.value)} // Update email state on change
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      required
                    />
                  </div>
                </div>
  
                <div>
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="mt-2">
                  <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      value={password} // Bind input value to the password state variable
                      onChange={(e) => setPassword(e.target.value)} // Update password state on change
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      required
                    />
                  </div>
                </div>
  
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-gray-900">
                      Remember me
                    </label>
                  </div>
  
                  <div className="text-sm leading-6">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div>
                </div>
  
                <div>
                  <button
                    type="submit"
                    onClick={handleSignIn}
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign in
                  </button>
                </div>
                <div className="text-sm leading-4">
                  <a href="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Don't have an account? Sign up
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    )
  }
  export default SignIn;
