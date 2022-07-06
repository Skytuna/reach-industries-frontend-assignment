import axios from 'axios';
import frame from '../data/frame';
import {
    DeviceFrameDataResult,
    GetDeviceDataResponse,
    GetDevicesResponse,
    IGetDeviceDataParams,
    IGetDevicesParams,
    IGetFrameDataParams,
} from '../types/device';

export async function GetDevice({ userId, orgId }: IGetDevicesParams): Promise<GetDevicesResponse> {
    if (!userId || !orgId) return Promise.reject('Please enter a valid userId and orgId!');

    try {
        const res = await axios.get(
            `https://mockapi.lumi.systems/getdevices?userId=${userId}&orgId=${orgId}`,
        );
        return res.data;
    } catch (err) {
        return Promise.reject('Unable to fetch devices.');
    }
}

export async function GetDeviceData({
    deviceId,
}: IGetDeviceDataParams): Promise<GetDeviceDataResponse> {
    if (!deviceId) return Promise.reject('Please enter a valid deviceId!');

    try {
        const res = await axios.get(
            `https://mockapi.lumi.systems/getdevicedata?deviceId=${deviceId}`,
        );
        return res.data;
    } catch (err) {
        return Promise.reject('Unable to fetch device data.');
    }
}

// CANNOT USE THIS METHOD BECAUSE OF CORS FOR LOCALHOST:3000
export async function GetFrameData({ url }: IGetFrameDataParams): Promise<DeviceFrameDataResult> {
    // try {
    //     const res = await axios.get(url);
    //     return res.data;
    // } catch (err) {
    //     return Promise.reject('Unable to fetch device frame data.');
    // }

    return Promise.resolve(frame);
}
