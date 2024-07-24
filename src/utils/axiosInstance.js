// axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://103.104.48.5:8282/api/v1',
  withCredentials: true // This ensures cookies are sent with requests
});

let isRefreshing = false;
let refreshSubscribers = [];

const onRrefreshed = (token) => {
  refreshSubscribers.map((callback) => callback(token));
}

const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
}

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status }
    } = error;

    const originalRequest = config;

    if (status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const refreshResponse = await axiosInstance.post('/user/auth/refresh-token');
          isRefreshing = false;

          // Update subscribers with new token
          onRefreshed(refreshResponse.data.accessToken);

          // Retry the original request with the new token
          originalRequest.headers['Authorization'] = 'Bearer ' + refreshResponse.data.accessToken;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
          // Handle refresh token failure (e.g., redirect to login)
        }
      }

      return new Promise((resolve) => {
        addRefreshSubscriber((token) => {
          // Retry the original request once the token refresh is done
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          resolve(axiosInstance(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
