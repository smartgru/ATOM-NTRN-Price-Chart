import axios from 'axios';

const API_URL = 'https://app.astroport.fi/api/trpc/charts.prices';

const queryJSON = {
  json: {
    tokens: [
      'ibc/C4CFF46FD6DE35CA4CF4CE031E643C8FDC9BA4B99AE598E9B0ED98FE3A2319F9', // $ATOM token on the Neutron network
      'untrn' // denomination of the $NTRN token on the Neutron network
    ],
    chainId: 'neutron-1', // ID of the Neutron network
    dateRange: 'D7' // 7 days
  }
};

export const get7DayPrice = async () => {
  const { data } = await axios({
    url: API_URL,
    method: 'GET',
    params: {
      input: JSON.stringify(queryJSON)
    }
  });

  return data;
};
