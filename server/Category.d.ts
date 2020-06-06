import { IDataProvider } from ".";
interface ICategory {
    id: string;
    name: string;
    type: string;
}
export declare class CategoryProvider implements IDataProvider<ICategory> {
    private readonly path;
    constructor(path: string);
    private categories;
    initIfNeeded(): Promise<void>;
    getAll(): ICategory[];
    add(row: ICategory): void;
}
export {};
