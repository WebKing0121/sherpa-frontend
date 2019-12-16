import { IState } from './reducers';
import { IResults } from './actions';

interface IProspectNotes {
  prospectNotes: IState & IResults;
}

export const prospectNotesList = ({ prospectNotes }: IProspectNotes) => prospectNotes.list;
export const prospectNotesStatus = ({ prospectNotes }: IProspectNotes) => prospectNotes.status;
