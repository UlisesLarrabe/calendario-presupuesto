export interface Event {
  id?: string;
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  category: string;
  amount: number;
  month: number;
  year: number;
  type: string;
  isDone: boolean;
  person: string;
}
