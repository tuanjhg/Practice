export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

export interface User {
  id: number;
  email: string;
  full_name: string;
  role: UserRole;
  tenant_id?: number;
  garage_name?: string;
  created_at?: string;
  updated_at?: string;
}

export type UserRole = 'admin' | 'garage_owner' | 'mechanic' | 'staff';

export interface AuthSession {
  user: User;
  expires: string;
  accessToken: string;
}


export const loginFormFields = [
  {
    name: 'email',
    label: 'Email',
    type: 'email' as const,
    placeholder: 'Enter your email',
    required: true,
    validation: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Please enter a valid email address'
    }
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password' as const,
    placeholder: 'Enter your password',
    required: true,
    validation: {
      minLength: 6,
      message: 'Password must be at least 6 characters'
    }
  }
] as const;