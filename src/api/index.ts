import axios, {AxiosInstance} from 'axios';

export default class AxiosService {
    static readonly instance: AxiosInstance = axios.create({
        baseURL: 'http://localhost:9999',
        timeout: 100000,
    });
}
