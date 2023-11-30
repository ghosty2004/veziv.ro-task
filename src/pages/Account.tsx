import { Component } from 'react';
import {
  HorizontalLine,
  Layout,
  UploadFiles,
  UploadedPortfolios,
} from '@/components';

const Profile = () => (
  <div className="flex flex-col gap-10">
    <div className="flex justify-between">
      <div className="flex flex-col gap-3">
        <span>Personal Info</span>
        <span className="text-xs">
          Update your photo and personal details here
        </span>
      </div>
      <div className="flex gap-5">
        <button className="text-violet-400 font-bold bg-white/10 hover:bg-white/20 px-10 rounded-lg">
          Cancel
        </button>
        <button className="text-white bg-violet-500 hover:bg-violet-500/80 px-10 rounded-lg">
          Save Changes
        </button>
      </div>
    </div>
    <HorizontalLine />

    <div className="flex justify-between items-center">
      <span className="w-[40%]">Name</span>
      <div className="flex gap-10 w-[60%]">
        <input
          className="outline-none bg-white/10 p-3 rounded-lg w-full"
          type="text"
          placeholder="ghosty"
        />
        <input
          className="outline-none bg-white/10 p-3 rounded-lg w-full"
          type="text"
          placeholder="2004"
        />
      </div>
    </div>
    <HorizontalLine />

    <div className="flex justify-between items-center">
      <span className="w-[40%]">Email</span>
      <div className="flex gap-10 w-[60%]">
        <input
          className="outline-none bg-white/10 p-3 rounded-lg w-full"
          type="text"
          placeholder="example@example.com"
        />
      </div>
    </div>
    <HorizontalLine />

    <div className="flex justify-between items-center">
      <span className="w-[40%]">Personal Website</span>
      <div className="flex gap-10 w-[60%]">
        <input
          className="outline-none bg-white/10 p-3 rounded-lg w-full"
          type="text"
          placeholder="example.com"
        />
      </div>
    </div>
    <HorizontalLine />
  </div>
);

const Portfolios = () => (
  <div className="flex gap-10">
    <div className="w-1/2">
      <UploadedPortfolios
        files={Array.from({ length: 30 }).map((_, index) => ({
          name: `name ${index}`,
          website: `website ${index}`,
        }))}
      />
    </div>
    <div className="w-1/2">
      <UploadFiles />
    </div>
  </div>
);

const Settings = () => null;

interface IState {
  currentSection: 'PROFILE' | 'PORTFOLIOS' | 'SETTINGS';
}

export class Account extends Component<{}, IState> {
  static pagePath = '/account';
  static visibleInHeader = false;

  static sections: Record<string, IState['currentSection']> = {
    ['My Profile']: 'PROFILE',
    ['My Portfolios']: 'PORTFOLIOS',
    ['Settings']: 'SETTINGS',
  };

  constructor(props: {}) {
    super(props);

    this.state = {
      currentSection: 'PROFILE',
    };
  }

  handleSectionChange = (section: IState['currentSection']) => () =>
    this.setState({ currentSection: section });

  render() {
    return (
      <Layout title="Your Account">
        <div className="flex flex-col bg-white/5 w-full min-h-[600px] rounded p-3">
          <div className="flex gap-10 cursor-pointer">
            {Object.entries(Account.sections).map(
              ([sectionName, section], index) => (
                <div className="relative" key={index}>
                  <span
                    className={`hover:text-violet-400/70 ${
                      this.state.currentSection === section
                        ? 'text-violet-500'
                        : ''
                    }`}
                    onClick={this.handleSectionChange(section)}
                  >
                    {sectionName}
                  </span>
                  {this.state.currentSection === section && (
                    <div className="absolute w-full h-[1px] bg-violet-500 my-5" />
                  )}
                </div>
              )
            )}
          </div>
          <div className="w-full h-[1px] bg-white/10 my-5" />

          <div className="w-full">
            {this.state.currentSection === 'PROFILE' ? (
              <Profile />
            ) : this.state.currentSection === 'PORTFOLIOS' ? (
              <Portfolios />
            ) : (
              <Settings />
            )}
          </div>
        </div>
      </Layout>
    );
  }
}
