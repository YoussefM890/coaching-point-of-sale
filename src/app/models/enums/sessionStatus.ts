export enum SessionStatus {
  Open = 'open',
  Closed = 'closed',
}

export const genders = [
  {
    value: null,
    viewValue: '',
  },
  {
    value: SessionStatus,
    viewValue: 'Open',
  },
  {
    value:SessionStatus.Closed,
    viewValue: 'Closed'
  }

];
