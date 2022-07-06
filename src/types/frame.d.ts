import { IContextBase } from './context';

export interface IFrame {
    avgR: number;
    avgG: number;
    avgB: number;
    histDiff: number;
}

export interface IFrameData {
    [key: string]: IFrame;
}

export type IRoI = [number, number, number, number];

export interface IFrameDataResult {
    RoI: IRoI;
    frame_data: IFrameData;
}

export interface IFrameContext {
    currentTime: number;
    setCurrentTime: (time: number) => void;

    videoDuration: number;
    setVideoDuration: (duration: number) => void;

    frameData: IFrameDataResult | undefined;
    setFrameData: (data: IFrameDataResult | undefined) => void;

    currentFrame: IFrame | undefined;
    setCurrentFrame: (frame: IFrame | undefined) => void;

    videoDimensions: { width: number; height: number };
    setVideoDimensions: (duration: { width: number; height: number }) => void;
}
