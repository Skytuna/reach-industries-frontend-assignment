import { createContext, useState } from 'react';
import { IFrame, IFrameContext, IFrameDataResult } from '../../types/frame';

const INITIAL_STATE: IFrameContext = {
    currentTime: 0,
    setCurrentTime: () => {},
    videoDuration: 0,
    setVideoDuration: () => {},
    frameData: undefined,
    setFrameData: () => {},
    currentFrame: undefined,
    setCurrentFrame: () => {},
    videoDimensions: { width: 640, height: 380 },
    setVideoDimensions: () => {},
};

export const FrameContext = createContext<IFrameContext>(INITIAL_STATE);

interface ProviderProps {
    children: React.ReactNode;
}
const FrameProvider: React.FC<ProviderProps> = ({ children }) => {
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [videoDuration, setVideoDuration] = useState<number>(0);
    const [frameData, setFrameData] = useState<IFrameDataResult>();
    const [currentFrame, setCurrentFrame] = useState<IFrame>();
    const [videoDimensions, setVideoDimensions] = useState<{ width: number; height: number }>({
        width: 640,
        height: 380,
    });

    return (
        <FrameContext.Provider
            value={{
                currentTime,
                setCurrentTime,
                videoDimensions,
                setVideoDimensions,
                videoDuration,
                setVideoDuration,
                frameData,
                setFrameData,
                currentFrame,
                setCurrentFrame,
            }}>
            {children}
        </FrameContext.Provider>
    );
};

export default FrameProvider;
