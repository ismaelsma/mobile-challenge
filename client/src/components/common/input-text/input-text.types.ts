import { ChangeEvent } from 'react';

export interface IInputTextProps {
  value: string;
  onChange: (event: string) => void;
  placeholder: string;
  name: string;
  id: string;
  className: string;
  required?: boolean;
}
