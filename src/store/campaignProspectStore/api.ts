import AxiosInstance from '../../axiosConfig';

export const campaignProspectList = (campaignId: number, apiParams: any) => {
  console.log('apiParams', apiParams)
  const url = `campaign-prospects/?page_size=20&campaign=${campaignId}${apiParams}`;
  console.log('URL', url);
  return AxiosInstance.get(url);
};
