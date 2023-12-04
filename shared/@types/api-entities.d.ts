declare module 'shared/api-entities' {
  export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    personalWebsite: string | null;
    portfolios?: Portfolio[];
  }

  export interface Portfolio {
    id: number;
    name: string;
    website: string | null;
    hidden: boolean;
    dataURL: string;
  }
}
