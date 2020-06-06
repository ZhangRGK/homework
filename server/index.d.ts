export interface IDataProvider<T> {
    initIfNeeded: () => Promise<void>;
    getAll: () => T[];
    add: (row: T) => void;
}
