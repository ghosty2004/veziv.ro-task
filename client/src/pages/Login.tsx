import { useState, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Layout } from '@/components';
import { useUser } from '@/context';
import { API } from '@/api';

export const Login = () => {
  const [type, setType] = useState<'LOGIN' | 'REGISTER'>('LOGIN');

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const user = useUser();

  const handleTypeSwitch = () => {
    setType((prevType) => (prevType === 'LOGIN' ? 'REGISTER' : 'LOGIN'));
  };

  const processResponseToken = (token?: string) => {
    if (typeof token !== 'string') return;
    localStorage.setItem('token', token);
    window.location.reload();
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const firstName = firstNameRef.current?.value;
    const lastName = lastNameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (typeof email === 'undefined' || typeof password === 'undefined') return;

    switch (type) {
      case 'LOGIN':
        const { response, error } = await API.makeRequest({
          path: '/api/auth/login',
          method: 'POST',
          body: {
            email,
            password,
          },
        });

        if (error) {
          toast(error.message, {
            type: 'error',
          });
        }

        processResponseToken(response.token);
        break;
      case 'REGISTER':
        if (typeof firstName === 'undefined' || typeof lastName === 'undefined')
          return;

        const { response: registerResponse, error: registerError } =
          await API.makeRequest({
            path: '/api/auth/register',
            method: 'POST',
            body: {
              firstName,
              lastName,
              email,
              password,
            },
          });

        if (registerError) {
          toast(registerError.message, {
            type: 'error',
          });
        }

        processResponseToken(registerResponse.token);
        break;
    }
  };

  return user ? (
    <Navigate to="/account" />
  ) : (
    <Layout>
      <div className="bg-black/50 max-sm:w-[270px] w-[600px] self-center m-24 p-5 rounded flex flex-col gap-10 items-center">
        <div className="flex w-full justify-center font-semibold text-xl">
          {type === 'LOGIN' ? 'Log in to your account' : 'Create your account'}
        </div>
        <form className="flex w-full flex-col gap-10" onSubmit={handleSubmit}>
          {type === 'REGISTER' && (
            <>
              <div className="flex flex-col">
                <label className="text-sm">First name</label>
                <input
                  className="outline-none bg-white/5 p-2 rounded text-sm"
                  type="text"
                  placeholder="Enter first name"
                  ref={firstNameRef}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm">Last name</label>
                <input
                  className="outline-none bg-white/5 p-2 rounded text-sm"
                  type="text"
                  placeholder="Enter last name"
                  ref={lastNameRef}
                />
              </div>
            </>
          )}

          <div className="flex flex-col">
            <label className="text-sm">Email</label>
            <input
              className="outline-none bg-white/5 p-2 rounded text-sm"
              type="email"
              placeholder="Enter email"
              ref={emailRef}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm">Password</label>
            <input
              className="outline-none bg-white/5 p-2 rounded text-sm"
              type="password"
              placeholder="Enter password"
              ref={passwordRef}
            />
          </div>
          <button
            className="bg-white hover:bg-white/80 p-3 text-indigo-600 font-bold rounded"
            type="submit"
          >
            {type === 'LOGIN' ? 'Log in' : 'Register'}
          </button>
        </form>
        <span className="text-sm flex gap-1 flex-wrap justify-center">
          {type === 'LOGIN'
            ? "Don't have an account?"
            : 'Already have an account?'}{' '}
          <p
            className="hover:text-indigo-500 cursor-pointer"
            onClick={handleTypeSwitch}
          >
            Create one
          </p>
        </span>
      </div>
    </Layout>
  );
};
