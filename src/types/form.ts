export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'email' | 'password' | 'textarea' | 'select' | 'date' | 'checkbox' | 'radio';
  placeholder?: string;
  required?: boolean;
  section?: string;
  options?: { value: string; label: string; class?: string }[];
  validation?: {
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    message?: string;
  };
}

export interface FormSection {
  title: string;
  fields: FormField[];
}