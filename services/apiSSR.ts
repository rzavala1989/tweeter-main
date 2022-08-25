import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import { parseCookies } from 'nookies';

export const getApiClient = (ctx?: GetServerSidePropsContext) => {
  const { 'tweeter.data': user } = parseCookies(ctx);
  //declare api
  const api = axios.create({
    baseURL: `${
      process.env.NEXT_PUBLIC_API_URL
        ? process.env.NEXT_PUBLIC_API_URL
        : 'http://localhost:3333'
    }`,
  });
  if (user) {
    //pick up and display token
    const { token } = JSON.parse(user);
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  }
  return api;
};
