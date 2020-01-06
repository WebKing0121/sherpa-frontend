import { mapIndexToArray } from '../../utils';
import { prospectsResults } from '../../prospectStore/selectors';
import { mergeLeadStageTitle } from '../../prospectStore/transformers';

export const selectProspects = (state: any) => {
  const prospects = prospectsResults(state);
  const { leadStages: { leadStages } } = state;
  const prospectsArray = mapIndexToArray(prospects);
  return mergeLeadStageTitle(prospectsArray, leadStages);
}

export const selectIsLoadingMoreProspects = (state: any) => state.uiStore.prospectSearchView.isLoadingMore;

export const selectIsLoadingProspect = (state: any) => state.uiStore.prospectSearchView.isLoading;
