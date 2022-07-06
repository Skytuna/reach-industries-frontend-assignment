import { useContext, useMemo } from 'react';
import { VIDEO_FPS } from '../../constants/frame';
import { FrameContext } from '../../contexts/FrameContext';

export interface IFrameInformationProps {}

export default function FrameInformation({}: IFrameInformationProps) {
    const { currentTime, frameData, currentFrame } = useContext(FrameContext);

    return (
        <div className='bg-slate-50 rounded-lg flex flex-col p-6 w-3/5 self-center mt-4 gap-4 shadow'>
            <h1 className='text-primary-200 text-3xl font-bold font-sans text-center'>
                Frame Information
            </h1>
            <div className='flex flex-row justify-between'>
                <div className='flex flex-col justify-evenly'>
                    <div className='flex flex-row gap-2 items-center'>
                        <p className='text-primary-200 text-lg font-medium font-sans'>
                            Frame Number:
                        </p>
                        <p className='text-primary-300 text-lg font-normal font-sans'>
                            {Math.round(currentTime * VIDEO_FPS)}
                        </p>
                    </div>
                    <div className='flex flex-row gap-2 items-center'>
                        <p className='text-primary-200 text-lg font-medium font-sans'>
                            Bounding Box:
                        </p>
                        <p className='text-primary-300 text-lg font-normal font-sans'>
                            {JSON.stringify(frameData?.RoI || '-')}
                        </p>
                    </div>
                    <div className='flex flex-row gap-2 items-center'>
                        <p className='text-primary-200 text-lg font-medium font-sans'>Histogram:</p>
                        <p className='text-primary-300 text-lg font-normal font-sans'>
                            {currentFrame?.histDiff || '-'}
                        </p>
                    </div>
                </div>

                <div>
                    <p className='text-primary-200 text-lg font-medium font-sans text-center'>
                        RGB
                    </p>
                    <div
                        className='w-48 h-24 rounded-xl'
                        style={{
                            backgroundColor: `rgba(${currentFrame?.avgR},${currentFrame?.avgG},${currentFrame?.avgB})`,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
