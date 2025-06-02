declare module "#auth-utils" {
  interface UserSession {
    id: string;
    user: User;
    secure: SecureSessionData;
    metadata: unknown;
  }

  interface User {
    id: string;
    name: string;
    email: string;

    created_at: string;
    updated_at: string;
  }

  interface SecureSessionData {
    id: string;
    token: string;
  }
}

export {};
