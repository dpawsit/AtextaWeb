import axios from 'axios';

export const GET_USER_ID = 'GET_USER_ID';

export function getUserId(profile) {
  console.log('we sure showed ricky')
  const request = axios.post('/auth/login', {profile})

  return {
    type: GET_USER_ID,
    payload: request
  };
}