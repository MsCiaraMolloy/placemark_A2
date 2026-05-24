declare global {
  namespace App {
    interface Locals {
      user?: {
        _id: string;
        firstName: string;
        lastName: string;
        email: string;
        isAdmin: boolean;
      };
    }
  }
}

export {};
