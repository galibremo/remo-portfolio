import axios from "axios";

const apiRoutePrefix = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export const axiosApi = axios.create({
	baseURL: apiRoutePrefix,
	withCredentials: true
});
