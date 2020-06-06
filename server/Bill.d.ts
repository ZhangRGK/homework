import { IDataProvider } from ".";
declare enum BillType {
    Expend = 0,
    Income = 1
}
interface IBill {
    type: BillType;
    time: number;
    category?: string;
    amount: string;
}
export declare class BillingDataProvider implements IDataProvider<IBill> {
    private readonly path;
    private readonly billWriter;
    private timeoutId;
    constructor(path: string);
    private sync;
    private bills;
    initIfNeeded(): Promise<void>;
    getAll(): IBill[];
    add(row: IBill): void;
}
export {};
