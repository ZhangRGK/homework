import * as parser from "csv-parser";
import * as writer from "csv-writer";
import * as fs from "fs";
import { IDataProvider } from ".";

interface ICategory {
  id: string;
  name: string;
  type: string;
}

export class CategoryProvider implements IDataProvider<ICategory> {
  constructor(private readonly path: string) {}

  private categories: ICategory[];

  initIfNeeded() {
    if (this.categories != null) {
      return Promise.resolve();
    }
    return new Promise<void>((resolve, reject) => {
      const rows = [];
      fs.createReadStream(this.path)
        .pipe(parser())
        .on("data", (row) => {
          rows.push(row);
        })
        .on("end", () => {
          this.categories = rows;
          resolve();
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  }

  getAll(): ICategory[] {
    return this.categories;
  }

  add(row: ICategory) {}
}
