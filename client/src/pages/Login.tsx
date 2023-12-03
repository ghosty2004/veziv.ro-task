import { Component, createRef } from 'react';
import { Layout } from '@/components';

export class Login extends Component<
  {},
  {
    type: 'LOGIN' | 'REGISTER';
  }
> {
  // static properties for page metadata
  static pagePath = '/login';
  static visibleInHeader = false;

  emailRef = createRef<HTMLInputElement>();
  passwordRef = createRef<HTMLInputElement>();

  constructor(props: {}) {
    super(props);

    this.state = {
      type: 'LOGIN',
    };
  }

  handleTypeSwitch = () => {
    this.setState((prevState) => ({
      ...prevState,
      type: prevState.type === 'LOGIN' ? 'REGISTER' : 'LOGIN',
    }));
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const email = this.emailRef.current?.value;
    const password = this.passwordRef.current?.value;

    console.log(
      `You just provided the following credentials:`,
      email,
      password
    );
  };

  render() {
    return (
      <Layout>
        <div className="bg-black/50 max-sm:w-[270px] w-[600px] self-center m-24 p-5 rounded flex flex-col gap-10 items-center">
          <div className="flex w-full justify-center font-semibold text-xl">
            {this.state.type === 'LOGIN'
              ? 'Log in to your account'
              : 'Create your account'}
          </div>
          <form
            className="flex w-full flex-col gap-10"
            onSubmit={this.handleSubmit}
          >
            {this.state.type === 'REGISTER' && (
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
                ref={this.emailRef}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm">Password</label>
              <input
                className="outline-none bg-white/5 p-2 rounded text-sm"
                type="password"
                placeholder="Enter password"
                ref={this.passwordRef}
              />
            </div>
            <button
              className="bg-white hover:bg-white/80 p-3 text-violet-600 font-bold rounded"
              type="submit"
            >
              {this.state.type === 'LOGIN' ? 'Log in' : 'Register'}
            </button>
          </form>
          <span className="text-sm flex gap-1 flex-wrap justify-center">
            {this.state.type === 'LOGIN'
              ? "Don't have an account?"
              : 'Already have an account?'}{' '}
            <p
              className="hover:text-violet-500 cursor-pointer"
              onClick={this.handleTypeSwitch}
            >
              Create one
            </p>
          </span>
        </div>
      </Layout>
    );
  }
}
