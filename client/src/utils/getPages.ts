import * as pages from '@/pages';

export const getPages = () =>
  Object.entries(pages).map(([pageName, Component]) => {
    const { pagePath, visibleInHeader } = Component;
    return {
      pageName,
      pagePath,
      visibleInHeader,
      Component,
    };
  });
