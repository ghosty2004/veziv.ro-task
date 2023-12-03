import { Layout } from '@/components';
import { Component } from 'react';

export class Home extends Component {
  // static properties for page metadata
  static pagePath = '/';
  static visibleInHeader = true;

  render() {
    return <Layout title="Home">Hello, World !</Layout>;
  }
}
