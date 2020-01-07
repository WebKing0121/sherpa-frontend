// responsiveness
export const maxMobileWidth = 768;

// data fetch status
export const Initial = 'Initial';
export const Fetching = 'Fetching';
export const Success = 'Success';
export const FetchError = 'FetchError';
export const Updating = 'Updating';

// min spinner times
export const fastSpinner = 250;

// toast stuff
export const toastLingerTime = 5000;

// note messages
export const messageNewNote = 'New note added';
export const messageUpdateNote = 'Note updated';
export const messageDeleteNote = 'Note Deleted';

export const generalNetworkError = 'Something went wrong.  Please refresh or try again later.';

// reducer stuff
export const prospectDetailsReducer = 'prospectDetailsReducer';

// sms stuff
export const pollingInterval = 20000;
export const messagesPlaceholderText = 'Send a message to start a conversation with this prospect';

export const campaignHeaderInfo = {
  fromText: 'Campaign List',
  hasBackButton: true,
  tabs: [
    {
      idx: '1',
      name: 'Send',
      icon: 'paper-plane'
    },
    {
      idx: '2',
      name: 'Messages',
      icon: 'comment-dots'
    },
    {
      idx: '3',
      name: 'Notes',
      icon: 'sticky-note'
    }
  ]
};

export const prospectHeaderInfo = {
  fromText: 'Prospect List',
  hasBackButton: true,
  tabs: [
    {
      idx: '1',
      name: 'Details',
      icon: 'user'
    },
    {
      idx: '2',
      name: 'Messages',
      icon: 'comment-dots'
    },
    {
      idx: '3',
      name: 'Notes',
      icon: 'sticky-note'
    }
  ]
};
