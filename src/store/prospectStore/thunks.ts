import * as api from './api';

// actions
import {
  searchProspects,
  searchProspectsFailure,
  searchProspectsSuccess,
  searchProspectsNextPage,
  searchProspectsNextPageSuccess
} from '../uiStore/prospectSearchView/actions';
import {
  fetchProspectsSuccess,
  resetProspects,
  updateProspectList,
  updateProspectSuccess,
  fetchProspect,
  fetchProspectSuccess
} from '../prospectStore/actions';
import * as detailsViewActions from '../uiStore/prospectDetailsView/actions'
import { addNewToast } from '../Toasts/actions';

// selectors
import { getProspect } from './selectors';
import { getLeadStages } from '../leadstages/selectors';

// utils
import { arrayToMapIndex } from '../utils';
import { ProspectRecord, PartialProspectRecord } from './interfaces';

// search thunk generators
export const searchProspectsThunkCreator = (
  initActions: any,
  successActions: any,
  failActions: any
) => {
  // returns a thunk with specific custom init/success/fail actions
  return (term: string) => (dispatch: any, getState: any) => {
    initActions(dispatch);
    return api.listProspects(term)
      .then(({ data }) => {
        const prospectRecords = data.results.map(
          (prospect: any) => ProspectRecord(prospect, false)
        )
        const prospectsMap = arrayToMapIndex('id', prospectRecords);

        dispatch(fetchProspectsSuccess({ ...data, results: prospectsMap }));
        successActions(dispatch);
      })
      .catch(_ => failActions(dispatch));
  }
}

// init actions
const searchInitActions = (dispatch: any) => {
  dispatch(resetProspects(true));
  dispatch(searchProspects(true));
}

// success actions
const searchSuccessActions = (dispatch: any) => {
  dispatch(searchProspectsSuccess(true));
}

// failure actions
const searchFailureActions = (dispatch: any) => {
  dispatch(searchProspectsFailure(true));
}

export const prospectSearch = searchProspectsThunkCreator(
  searchInitActions,
  searchSuccessActions,
  searchFailureActions
);

export const prospectSearchNextPage =
  () => (dispatch: any, getState: any) => {
    let {
      prospectStore: { next = null, isLoadingMore = false },
      leadStages: { leadStages }
    } = getState();

    if (next && !isLoadingMore) {
      dispatch(searchProspectsNextPage(true));
      return api.listProspectsNextPage(next)
        .then(({ data }) => {
          const prospectRecords = data.results.map(
            (prospect: any) => ProspectRecord(prospect, false)
          )
          const prospectsMap = arrayToMapIndex('id', prospectRecords);

          dispatch(updateProspectList({ ...data, results: prospectsMap }));
          dispatch(searchProspectsNextPageSuccess(false));
        });
    }

    return new Promise((resolve, __) => resolve({}));
  }

// prospect details
export const prospectFetchSingle =
  (id: any) => (dispatch: any, getState: any) => {
    dispatch(fetchProspect(true));

    return api.getProspect(id)
      .then(({ data }) => {
        let prospect = ProspectRecord(data, false);

        dispatch(updateProspectSuccess(prospect));
        dispatch(fetchProspectSuccess(false));

        if (prospect.campaigns.length === 1) {
          dispatch(
            detailsViewActions.setActiveCampaign(prospect.campaigns[0].id)
          );
        }
      })
      .catch(error => console.log('Error fetching prospect detail', error));
  }

export const prospectUpdate = async (
  id: any,
  payload: any,
  dispatch: any,
  optimistic: boolean,
  onSuccess: any = () => null) => {
  return api.patchProspect(id, payload)
    .then(({ data }) => {
      if (!optimistic) {
        const prospect = PartialProspectRecord(data, false);
        dispatch(updateProspectSuccess(prospect));
      }
      onSuccess();
    })
    .catch(error => console.log('Error updating prospect detail', error.response));
};

export const prospectUpdateStatus =
  (id: string, payload: any, attr: string) => (dispatch: any, getState: any) => {
    const state = getState()
    dispatch(
      detailsViewActions.setActionBtnStatus(
        { btn: attr, updating: true }
      )
    );
    const onSuccess = () => {
      dispatch(
        detailsViewActions.setActionBtnStatus(
          { btn: attr, updating: false }
        )
      )
    };
    return prospectUpdate(id, payload, dispatch, false, onSuccess);
  };

export const prospectUpdateOptimistically = (
  id: string,
  payload: any
) => (dispatch: any, getState: any) => {
  const state = getState();
  const prospect = getProspect(id)(state);
  const optimisticProspect = { ...prospect, ...payload };

  // dispatch optimistically
  dispatch(updateProspectSuccess(optimisticProspect));
  return prospectUpdate(id, payload, dispatch, true);
}

export const prospectSetRelay =
  (payload: any) => (dispatch: any, getState: any) => {
    const state = getState();
    const prospect = getProspect(payload.prospect)(state);
    const newProspect = {
      ...prospect,
      smsRelayMap: { rep: { id: payload.rep } }
    };

    // update optimistically
    dispatch(updateProspectSuccess(newProspect));
    return api.prospectSetRelay(payload)
      .catch(error => console.log('Error updating prospect detail', error.response));
  };

export const prospectRemoveRelay =
  (id: any, payload: any) => (dispatch: any, getState: any) => {
    const state = getState();
    const prospect = getProspect(id)(state);
    const newProspect = {
      ...prospect,
      smsRelayMap: { rep: { id: '' } }
    };

    // update optimistically
    dispatch(updateProspectSuccess(newProspect));
    return prospectUpdate(id, payload, dispatch, true);
  };

export const prospectSetReminder =
  (id: any, payload: any) => (dispatch: any, getState: any) => {
    return api.prospectSetReminder(id, payload)
      .then(({ data }) => {
        const state = getState();
        const newProspect = PartialProspectRecord(data, false);
        const prospect = getProspect(id)(state);
        const updatedProspect = {
          ...prospect,
          ...newProspect
        }

        // keep the leadstage title
        dispatch(updateProspectSuccess(updatedProspect));
      })
      .catch(error => console.log('Error updating prospect detail', error.response));
  };

export const prospectEmailToCrmAction =
  (id: number, payload: any) => (dispatch: any) => {
    return api.prospectEmailToPodio(id, payload)
      .then(() => {
        const message = {
          message: 'Email to CRM Success',
          color: 'success'
        };
        dispatch(addNewToast(message));
      })
      .catch(() =>
        dispatch(addNewToast({ message: 'Email to CRM Failed', color: 'danger' })));
  };

export const prospectPushToZapierAction =
  (id: number, payload: any) => (dispatch: any) => {
    return api.prospectPushToZapier(id, payload)
      .then(() => {
        const message = {
          message: 'Push to Zapier Success',
          color: 'success'
        };
        dispatch(addNewToast(message));
      })
      .catch(() => dispatch(addNewToast({ message: 'Push to Zapier Failed', color: 'danger' })));
  };