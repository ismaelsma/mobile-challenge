import React from 'react';
import { IInputTextProps } from './input-text.types';

const InputText: React.FC<IInputTextProps> = (props: IInputTextProps) => {
  const {
    value,
    onChange,
    placeholder,
    required,
    id,
    className,
    name,
    testId
  } = props;

  return (
    <input
      type="text"
      className={`input-text ${className}`}
      name={name}
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      placeholder={placeholder}
      required={Boolean(required)}
      id={id}
      data-testid={testId}
    />
  );
};

export default InputText;
