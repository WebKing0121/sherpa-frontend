import AxiosInstance from '../../axiosConfig';

export const campaignProspectList = (campaignId: number, apiParams: any) => {
  const url = `campaign-prospects/?page_size=20&campaign=${campaignId}${apiParams}`;
  return AxiosInstance.get(url);
};

export const campaignProspectListNextPage = (url: string) => {
  return AxiosInstance.get(url);
}
