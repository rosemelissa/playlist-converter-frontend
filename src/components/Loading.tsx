interface LoadingProps {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

function Loading({ loading, setLoading }: LoadingProps): JSX.Element {
  return (
    <div className="loading-screen">
      <div className="spinner"></div>
    </div>
  );
}

export default Loading;
