import FetchInstance, { FetchBaseCookie } from './FetchInstance';
import useFetch from './useFetch';
import { configs } from './config';
//Below Snippers is only for development...
export const config = configs;
export { FetchBaseCookie };
export { useFetch };

const FetchBase = FetchInstance(config);
export default FetchBase;
