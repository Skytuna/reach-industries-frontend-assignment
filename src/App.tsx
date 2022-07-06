import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import MainLayout from './layouts/MainLayout';
import DataPage from './pages/DataPage';
import FrameProvider from './contexts/FrameContext';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <FrameProvider>
                <MainLayout>
                    <DataPage />
                </MainLayout>
            </FrameProvider>
        </QueryClientProvider>
    );
}

export default App;
