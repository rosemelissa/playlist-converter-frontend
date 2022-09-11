interface LoadingProps {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

function Loading({loading, setLoading}: LoadingProps): JSX.Element {
    return (
        <div className='loading-screen'>
            <p>Loading...</p>
        </div>
    )
}

export default Loading;