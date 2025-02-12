import { ICustomButtonProps } from './custom-button.types';

const CustomButton = (props: ICustomButtonProps) => {
  const { text, disabled, onButtonPressed, testId, type = 'black' } = props;

  return (
    <button
      className={`custom-button ${disabled ? '--disabled' : ''} ${type === 'white' ? '--white' : ''}`}
      onClick={() => {
        onButtonPressed();
      }}
      disabled={disabled}
      data-testid={testId}
    >
      {text}
    </button>
  );
};

export default CustomButton;
