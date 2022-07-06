import { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { GetDeviceData, GetFrameData } from '../../api/device';
import { defaultQueryOptions } from '../../configs/query';
import { VIDEO_FPS } from '../../constants/frame';
import { FrameContext } from '../../contexts/FrameContext';
import ErrorAlert from '../ErrorAlert';
import Spinner from '../Spinner';

const SCALE = 0.6;
export interface IDataDisplayProps {
    selectedDevice: string;
}

export default function DataDisplay({ selectedDevice }: IDataDisplayProps) {
    const {
        setCurrentTime,
        setVideoDuration,
        setFrameData,
        frameData,
        setCurrentFrame,
        currentTime,
        videoDimensions,
        setVideoDimensions,
    } = useContext(FrameContext);

    const [frameUrl, setFrameUrl] = useState<string>();

    const { isLoading, data, error, refetch, isRefetching } = useQuery(
        'device',
        async () => {
            const result = await GetDeviceData({ deviceId: selectedDevice });
            setFrameUrl(result.output?.cvmdata);

            if (result.err) throw new Error(result.err).message;
            return result.output;
        },
        defaultQueryOptions,
    );

    // Refresh on device change
    useEffect(() => {
        refetch();
    }, [selectedDevice]);

    // Get frame data when frame url change
    useEffect(() => {
        (async () => {
            if (frameUrl) {
                const frameData = await GetFrameData({ url: frameUrl });
                setFrameData(frameData);
            } else {
                setFrameData(undefined);
            }
        })();
    }, [frameUrl]);

    // NOTE: idk why but Typescript does not recognize currentTime attribute so had to use "any"
    const handleTimeChange = (e: any) => {
        setCurrentFrame(frameData?.frame_data[Math.round(VIDEO_FPS * e.target.currentTime)]);
        setVideoDuration(e.target.duration);
        setCurrentTime(e.target.currentTime);
        setVideoDimensions({
            width: e.target.videoWidth * SCALE,
            height: e.target.videoHeight * SCALE,
        });
    };

    const boxHeight = frameData ? Math.abs(frameData?.RoI[1] - frameData?.RoI[2]) : 0;
    const boxWidth = frameData ? Math.abs(frameData?.RoI[0] - frameData?.RoI[3]) : 0;

    if (isLoading || isRefetching) return <Spinner />;
    if (error) return <ErrorAlert message={error as string} />;
    return (
        <div className='flex w-full justify-center'>
            <div className='relative'>
                <video
                    onTimeUpdate={handleTimeChange}
                    className={`rounded-lg shadow-2xl -z-10`}
                    style={{ width: videoDimensions.width }}
                    controls>
                    <source src={data?.videofiles} type='video/mp4' />
                    Your browser does not support the video tag.
                </video>
                {currentTime && (
                    <div
                        className='border-yellow-300 border-8 shadow rounded-3xl absolute z-10'
                        style={{
                            height: boxHeight * SCALE,
                            width: boxWidth * SCALE,
                            bottom: frameData?.RoI[2] ? frameData?.RoI[2] * SCALE : 0,
                            left: frameData?.RoI[0] ? frameData?.RoI[0] * SCALE : 0,
                        }}
                    />
                )}
            </div>
        </div>
    );
}
