import { Layout } from '@/components';
import { Component } from 'react';

export class Users extends Component {
  static pagePath = '/users';
  static visibleInHeader = true;

  render() {
    return (
      <Layout title="Users">
        <div className="flex flex-col bg-white/5 w-full rounded p-3"></div>
      </Layout>
    );
  }
}
