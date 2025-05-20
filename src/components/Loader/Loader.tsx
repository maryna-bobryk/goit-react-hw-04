import { DotLoader } from 'react-spinners';

interface LoaderProps {
  loading: boolean;
}

const Loader = ({ loading }: LoaderProps) => {
  return (
    <div>
      <DotLoader
        color='#f96c00'
        size={32}
        speedMultiplier={1}
        loading
        cssOverride={{
          display: 'block',
          margin: '20px auto',
          padding: '10px',
          borderRadius: '8px',
        }}
      />
    </div>
  );
};

export default Loader;
