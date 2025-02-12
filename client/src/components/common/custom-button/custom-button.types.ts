export interface ICustomButtonProps {
  text: string;
  disabled: boolean;
  onButtonPressed: () => void;
  testId?: string;
  type?: string;
}
