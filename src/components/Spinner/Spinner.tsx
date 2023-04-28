import './spinner.module.scss';

export interface SpinnerProps {
  size?: 'small' | 'big';
}

export const Spinner = ({ size = 'big' } : SpinnerProps) => (
  <div className={`spinner ${size}`}>
    <div className="spinner-circle"></div>
  </div>
);