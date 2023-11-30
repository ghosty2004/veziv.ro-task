import { Layout } from '@/components';
import { Component } from 'react';

export class Home extends Component {
  static pagePath = '/';

  render() {
    return <Layout title="Home">Hello, World !</Layout>;
  }
}
