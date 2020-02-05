import {
  SET_CAMPAIGN_DESKTOP_PAGE_ACTIVE_TAB,
  SET_CAMPAIGN_DESKTOP_PAGE_ACTIVE_SORT,
  SET_CAMPAIGN_DESKTOP_TAB_DATA
} from './actionTypes';

const initialState = {
  activeSort: '-created_date',
  activeTab: 'all',
  tabs: {
    'all': {
      count: 0,
      sortOrder: [],
      sortedBy: null,
      nextPage: null
    },
    'active': {
      count: 0,
      sortOrder: [],
      sortedBy: null,
      nextPage: null
    },
    'followup': {
      count: 0,
      sortOrder: [],
      sortedBy: null,
      nextPage: null
    },
    'ownedbyme': {
      count: 0,
      sortOrder: [],
      sortedBy: null,
      nextPage: null
    },
    'archived': {
      count: 0,
      sortOrder: [],
      sortedBy: null,
      nextPage: null
    }
  }
};

export const path = [
  'uiStore',
  'campaignsPageDesktopView',
  'campaignsList',
  'filterData'
];

export default function reducer(state: any = initialState, action: any) {
  switch (action.type) {
    case SET_CAMPAIGN_DESKTOP_PAGE_ACTIVE_SORT:
      return {
        ...state,
        activeSort: action.payload
      };
    case SET_CAMPAIGN_DESKTOP_PAGE_ACTIVE_TAB:
      return {
        ...state,
        activeTab: action.payload
      };
    case SET_CAMPAIGN_DESKTOP_TAB_DATA: {
      let newSortOrder = [];

      // we're just adding on to the set order as sorting is the same
      if (state.tabs[action.payload.tab].sortedBy === state.activeSort) {
        newSortOrder = [
          ...state.tabs[action.payload.tab].sortOrder,
          ...action.payload.data.sortOrder
        ]
      } else {
        newSortOrder = action.payload.data.sortOrder
      }

      return {
        ...state,
        tabs: {
          ...state.tabs,
          [action.payload.tab]: {
            sortOrder: newSortOrder,
            nextPage: action.payload.data.nextPage,
            sortedBy: action.payload.data.sortedBy,
            count: action.payload.data.count
          }
        }
      }
    }
    default:
      return state;
  }
}
