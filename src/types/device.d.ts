import { ApiResponseBase } from './api';
import { IFrameDataResult } from './frame';

/**
 * PARAMS
 */
export interface IGetDevicesParams {
    userId: string;
    orgId: string;
}

export interface IGetDeviceDataParams {
    deviceId: string;
}

export interface IGetFrameDataParams {
    url: string;
}

/**
 * RESPONSES
 */
export type GetDevicesResponse = ApiResponseBase<GetDevicesResult>;
export type GetDeviceDataResponse = ApiResponseBase<GetDeviceDataResult>;

/**
 * RESULTS
 */
export type GetDevicesResult = string[];
export type GetDeviceDataResult = {
    cvmdata: string;
    videofiles: string;
};
export type DeviceFrameDataResult = IFrameDataResult;
