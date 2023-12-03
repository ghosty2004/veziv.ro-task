import { useState, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { Layout } from '@/components';
import { useUser } from '@/context';

export const Login = () => {
  const [type, setType] = useState<'LOGIN' | 'REGISTER'>('LOGIN');

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const user = useUser();

  const handleTypeSwitch = () => {
    setType((prevType) => (prevType === 'LOGIN' ? 'REGISTER' : 'LOGIN'));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    console.log(
      `You just provided the following credentials:`,
      email,
      password
    );
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
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm">Last name</label>
                <input
                  className="outline-none bg-white/5 p-2 rounded text-sm"
                  type="text"
                  placeholder="Enter last name"
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
            className="bg-white hover:bg-white/80 p-3 text-violet-600 font-bold rounded"
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
            className="hover:text-violet-500 cursor-pointer"
            onClick={handleTypeSwitch}
          >
            Create one
          </p>
        </span>
      </div>
    </Layout>
  );
};
