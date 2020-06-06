"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parser = require("csv-parser");
const writer = require("csv-writer");
const fs = require("fs");
var BillType;
(function (BillType) {
    BillType[BillType["Expend"] = 0] = "Expend";
    BillType[BillType["Income"] = 1] = "Income";
})(BillType || (BillType = {}));
class BillingDataProvider {
    constructor(path) {
        this.path = path;
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
    sync() {
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(async () => {
            await this.billWriter.writerRecords(this.bills);
        }, 3000);
    }
    initIfNeeded() {
        if (this.bills != null) {
            return Promise.resolve();
        }
        return new Promise((resolve, reject) => {
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
    getAll() {
        return this.bills;
    }
    add(row) {
        this.bills.push(row);
        this.sync();
    }
}
exports.BillingDataProvider = BillingDataProvider;
//# sourceMappingURL=Bill.js.map