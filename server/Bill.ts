import * as parser from "csv-parser";
import * as writer from "csv-writer";
import * as fs from "fs";
import { IDataProvider } from ".";

enum BillType {
  Expend = 0,
  Income = 1,
}

interface IBill {
  type: BillType;
  time: number;
  category?: string;
  amount: string;
}

export class BillingDataProvider implements IDataProvider<IBill> {
  private readonly billWriter: any;
  private timeoutId: NodeJS.Timeout;
  constructor(private readonly path: string) {
    this.billWriter = writer.createObjectCsvWriter({
      path: this.path,
      header: [
        { id: "type", title: "type" },
        { id: "time", title: "time" },
        { id: "category", title: "category" },
        { id: "amount", title: "amount" },
      ],
    });
  }

  private sync() {
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(async () => {
      await this.billWriter.writerRecords(this.bills);
    }, 3000);
  }

  private bills: IBill[];

  initIfNeeded() {
    if (this.bills != null) {
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
          this.bills = rows;
          resolve();
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  }

  getAll(): IBill[] {
    return this.bills;
  }

  add(row: IBill) {
    this.bills.push(row);
    this.sync();
  }
}
