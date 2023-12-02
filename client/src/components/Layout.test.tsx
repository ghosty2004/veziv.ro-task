import { beforeEach, describe, test, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Footer, Header, Layout } from './Layout';

describe('Header', () => {
  beforeEach(() => {
    render(<Header />, {
      wrapper: BrowserRouter,
    });
  });

  test('Should contain Digital Worker Showcased Works or DWSW', () => {
    const title =
      screen.getByText(/Digital Worker Showcased Works/i) ||
      screen.getByText(/DWSW/i);
    expect(title).toBeDefined();
  });

  test('Should verify all pages redirects are working', async () => {
    const pages = screen.getByTestId('pages');
    const pagesLinks = pages.querySelectorAll('span');

    for (const page of pagesLinks) {
      const firstLocation =
        window.location.pathname === '/' ? null : window.location.pathname;

      page.click();

      await waitFor(() => window.location.pathname !== firstLocation);

      expect(window.location.pathname).not.toBe(firstLocation);
    }
  });

  test('Should redirect to /account after clicking on "My account"', async () => {
    const myAccountButton = screen.getByTestId('my-account-button');
    myAccountButton.click();

    await waitFor(() => window.location.pathname === '/account');

    expect(window.location.pathname).toBe('/account');
  });

  test("Should render at least one svg (which is the hamburger menu) when the screen's width is less than 640px", () => {
    const hamburgerMenu = screen.getByTestId('hamburger-menu');
    expect(hamburgerMenu).toBeDefined();
  });
});

describe('Footer', () => {
  beforeEach(() => {
    render(<Footer />);
  });

  test('Shoul contain ghosty2004 and his github link', () => {
    const ghosty2004 = screen.getByText(/ghosty2004/i);
    expect(ghosty2004).toBeDefined();
    const githubLink = ghosty2004.closest('a');
    expect(githubLink?.getAttribute('href')).toContain(
      'https://github.com/ghosty2004'
    );
  });

  test('Should contain veziv.ro and its link', () => {
    const veziv = screen.getByText(/veziv.ro/i);
    expect(veziv).toBeDefined();
    const vezivLink = veziv.closest('a');
    expect(vezivLink?.getAttribute('href')).toContain('https://veziv.ro');
  });
});

describe('Layout', () => {
  beforeEach(() => {
    render(<Layout title="Test title">Hello, World !</Layout>, {
      wrapper: BrowserRouter,
    });
  });

  test('Should set the document title', () => {
    expect(document.title).toBe('Test title');
  });

  test("Should contain the children's content", () => {
    const children = screen.getByText(/Hello, World !/i);
    expect(children).toBeDefined();
  });

  test('Should conatin header and footer components', () => {
    const header = screen.getByTestId('header');
    expect(header).toBeDefined();
    const footer = screen.getByTestId('footer');
    expect(footer).toBeDefined();
  });
});
