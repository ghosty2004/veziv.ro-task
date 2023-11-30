import { Layout } from '@/components';
import { Component } from 'react';

export class Users extends Component {
  static pagePath = '/users';
  static visibleInHeader = true;

  render() {
    return <Layout title="Users">There are not available users...</Layout>;
  }
}
