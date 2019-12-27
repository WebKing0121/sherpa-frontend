import { IState } from './reducers';
import { IResults } from './actions';

interface IProspectNotes {
  prospectNotes: IState & IResults;
}

export const prospectNotesList = ({ prospectNotes }: IProspectNotes) => prospectNotes.list;

export const prospectNotesStatus = ({ prospectNotes }: IProspectNotes) => prospectNotes.status;

export const dateSortedProspectList = ({ prospectNotes }: IProspectNotes) =>
  [...prospectNotes.list!].sort((a: any, b: any) => {
    const aDate = new Date(a.createdDate),
      bDate = new Date(b.createdDate);
    return aDate < bDate ? 1 : aDate > bDate ? -1 : 0;
  });
