import { useContext, useMemo } from 'react';
import { FrameContext } from '../../contexts/FrameContext';

export interface IFrameIndicatorProps {}

export default function FrameIndicator({}: IFrameIndicatorProps) {
    const { frameData, currentFrame, currentTime, videoDuration, videoDimensions } =
        useContext(FrameContext);

    const indicatorLength = videoDimensions.width - 22;

    const indicatorOffset = useMemo(() => {
        if (!frameData) return 0;
        return (currentTime / videoDuration) * indicatorLength;
    }, [currentFrame]);

    return (
        <div className='self-center flex flex-col justify-center items-center gap-2 relative'>
            <div className='flex flex-row rounded relative shadow-xl'>
                {frameData?.frame_data &&
                    Object.entries(frameData.frame_data).map(([frameIndex, frame]) => {
                        const color = `rgb(${frame.avgR},${frame.avgG},${frame.avgB})`;
                        return (
                            <div
                                key={frameIndex}
                                className='h-24'
                                style={{
                                    backgroundColor: color,
                                    width:
                                        indicatorLength / Object.keys(frameData.frame_data).length,
                                }}
                            />
                        );
                    })}
            </div>
            <div
                className='w-3 h-28 border-2 border-black rounded -top-2 absolute'
                style={{ left: indicatorOffset }}
            />
            <h2 className='text-primary-200 text-lg font-bold font-sans'>Average RGB</h2>
        </div>
    );
}
