import { SERVER_ADDRESS } from '../../constants';

const mockAjax = ({
  url = SERVER_ADDRESS,
  pathname,
  method,
  query = '',
  headers,
  data,
  mockResult,
}) => {
  const options = {
    url: `${url}/${pathname}${query}`,
    method,
    headers,
    withCredentials: true,
  };
  if (data) { options.data = data; }
  return new Promise(((resolve) => {
    setTimeout(() => {
      resolve(mockResult);
    }, 1000);
  }));
};

export default mockAjax;
