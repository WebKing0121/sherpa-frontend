import { ProspectRecord } from './interfaces'
export const prospectsResults = (state: any) => state.prospectStore.prospects;
export const propspectSearchResultsError = (state: any) => state.prospectStore.error;
export const prospectNextPageUrl = (state: any) => state.prospectStore.next;
export const prospectIsLoading = (state: any) => state.prospectStore.isLoading;


// individual prospects
export const getProspect = (id: any) => (state: any) => state.prospectStore.prospects[id] || ProspectRecord({}, false);
