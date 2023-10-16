import axios from 'axios';
import Cookies from 'js-cookie';

const FetchBaseStructure = {};
export const FetchBaseCookie = FetchBaseStructure;

const FetchBaseInstance = async (config) => {
    FetchBaseStructure.config = config;
    const nativeCookie = Cookies.get('gotocourseUTFToken');

    FetchBaseStructure.post = async (requestUri, data = {}, upload = false) => {
        const apiURL = config.apiBaseUrl + requestUri;
        try {
            const request = await axios({
                method: 'post',
                url: apiURL,
                data: data,
                headers: {
                    'content-type': upload ? 'multipart/form-data' : 'application/json',
                    'Authorization': `Bearer ${config.systemKey}:${nativeCookie}`,
                },
            });
            const getResponse = await request.data;
            const response = responseHandler(getResponse);
            return response;
        } catch (error) {
            const { response } = error;
            const { ...errorObject } = response;
            const getErrorMessage = responseHandler(errorObject.data);
            return getErrorMessage;
        }
    };

    FetchBaseStructure.get = async (requestUri) => {
        const apiURL = config.apiBaseUrl + requestUri;
        try {
            const request = await axios({
                method: 'get',
                url: apiURL,
                headers: {
                    Authorization: `Bearer ${config.systemKey}:${nativeCookie}`,
                },
                Credentials: false,
            });
            const getResponse = await request.data;
            const response = responseHandler(getResponse);
            return response;
        } catch (error) {
            const { response } = error;
            const { ...errorObject } = response;
            const getErrorMessage = responseHandler(errorObject.data);
            return getErrorMessage;
        }
    };

    const responseHandler = (data = {}) => {
        const returnHandler = {};
        returnHandler.on = (type, callable) => {
            if (type === 'static') {
                return callable(data);
            } else {
                throw new Error(`Unknown fetch dataset, use either (static or watch)`);
            }
        };
        return returnHandler;
    };
    return FetchBaseStructure;
};

export default FetchBaseInstance;
