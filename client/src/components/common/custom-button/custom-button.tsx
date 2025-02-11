// Loader.tsx
import { ICustomButtonProps } from './custom-button.types';

const CustomButton = (props: ICustomButtonProps) => {
  const { text, disabled, onButtonPressed, type = 'black' } = props;

  return (
    <button
      className={`custom-button ${disabled ? '--disabled' : ''} ${type === 'white' ? '--white' : ''}`}
      onClick={() => {
        onButtonPressed();
      }}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default CustomButton;
