import axios from 'axios';
import { serverAddress, port } from './config';
import { APIResponse } from './types';

const callAPIAuth = async (anonymousToken?: string): Promise<APIResponse> => {
  console.log('------- request anonymous token: ', anonymousToken)
  const response = 
    await axios.post(`${serverAddress}:${port}/api/auth/anonymous`, 
                  {}, 
                  { headers: anonymousToken ? {'authorization': `${anonymousToken}`} : {} }
    );

  return response.data
}

console.log('---------- first api calling without anonymous token ------------ ')
const firstAuth = callAPIAuth()
firstAuth.then(async res => {
  console.log('---- first api response: ', res);

  console.log('---------- second api calling with anonymous token ------------ ')
  const secApiResponse = await callAPIAuth(res.anonymousToken!!);
  console.log('---- sec api response: ', secApiResponse);
})