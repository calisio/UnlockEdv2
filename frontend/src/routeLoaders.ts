import { json, LoaderFunction } from 'react-router-dom';
import {
    Facility,
    OpenContentProvider,
    ResourceCategory,
    ServerResponse
} from './common';
import API from './api/api';

export const getRightSidebarData: LoaderFunction = async () => {
    const [resourcesResp, openContentResp] = await Promise.all([
        API.get(`left-menu`),
        API.get(`open-content`)
    ]);

    const resourcesData = resourcesResp.success
        ? (resourcesResp.data as ResourceCategory[])
        : [];
    const openContentData = openContentResp.success
        ? (openContentResp.data as OpenContentProvider[])
        : [];

    return json({ resources: resourcesData, providers: openContentData });
};

export const getFacilities: LoaderFunction = async () => {
    const response: ServerResponse<Facility[]> =
        await API.get<Facility[]>(`facilities`);
    if (response.success) {
        return json<Facility[]>(response.data as Facility[]);
    }
    return json<null>(null);
};
