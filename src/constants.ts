export enum BillType {
  Expend = 0,
  Income = 1,
}

export interface IBill {
  type: BillType;
  time: number;
  category?: string;
  amount: string;
}

export interface ICategory {
  id: string;
  name: string;
  type: string;
}
