import { LoaderFunction, json } from 'react-router-dom';
import API from './api/api';
import { Facility, ServerResponse } from './common';

export const getFacilities: LoaderFunction = async () => {
    const response: ServerResponse<Facility[]> =
        await API.get<Facility[]>(`facilities`);
    if (response.success) {
        return json<Facility[]>(response.data as Facility[]);
    }
    return json<null>(null);
};
