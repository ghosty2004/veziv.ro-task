import { Component } from 'react';
import { Layout, UploadFile } from '@/components';

export class Account extends Component {
  static pagePath = '/account';

  render() {
    return (
      <Layout title="Account">
        <UploadFile />
      </Layout>
    );
  }
}
