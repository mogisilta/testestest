import axios from 'axios';
export default async function getMainclub(page: number) {
    const API_URL = import.meta.env.VITE_KEY;
    const response = await axios.get(`${API_URL}/clubs?page=${page}&size=2`, {
        headers: { 'Access-Control-Allow-Origin': 'http://localhost:5173' },
    });
    return response.data.data;
}

export const getMaincommunity = async () => {
    const response = await axios.get(`${import.meta.env.VITE_KEY}/standards`, {
        params: {
            page: 1,
            size: 4,
        },
    });
    return {
        postData: response.data.data,
        pageInfo: response.data.pageInfo,
    };
};
