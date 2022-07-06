import { Dropdown } from 'flowbite-react';
import { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { GetDevice } from '../../api/device';
import DataDisplay from '../../components/DataDisplay';
import ErrorAlert from '../../components/ErrorAlert';
import Spinner from '../../components/Spinner';
import { defaultQueryOptions } from '../../configs/query';
import { FrameContext } from '../../contexts/FrameContext';
import FrameIndicator from '../../components/FrameIndicator';
import FrameInformation from '../../components/FrameInformation';

export interface IDataPageProps {}

export default function DataPage({}: IDataPageProps) {
    const [selectedDevice, setSelectedDevice] = useState<string>();
    const { frameData } = useContext(FrameContext);

    const { isLoading, error, data } = useQuery(
        'devices',
        async () => GetDevice({ userId: '100', orgId: 'Lumi' }),
        defaultQueryOptions,
    );

    const handleDeviceSelection = (device: string) => {
        setSelectedDevice(device);
    };

    if (isLoading) return <Spinner />;
    if (error) return <ErrorAlert message={JSON.stringify(error)} />;
    return (
        <div className='flex flex-col gap-4'>
            <div className='flex flex-row mb-4'>
                <div className='flex flex-row gap-2'>
                    <h4 className='text-primary-200 text-lg font-bold font-sans'>
                        Selected device :
                    </h4>
                    <h3 className='text-primary-300 text-lg font-medium font-sans'>
                        {selectedDevice || '-'}
                    </h3>
                </div>
                <div className='ml-auto'>
                    <Dropdown label='Devices'>
                        {data?.output?.map((device) => (
                            <Dropdown.Item
                                key={device}
                                onClick={() => handleDeviceSelection(device)}>
                                {device}
                            </Dropdown.Item>
                        ))}
                    </Dropdown>
                </div>
            </div>

            {selectedDevice && <DataDisplay selectedDevice={selectedDevice} />}
            {frameData && (
                <>
                    <FrameIndicator />
                    <FrameInformation />
                </>
            )}
        </div>
    );
}
