"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parser = require("csv-parser");
const fs = require("fs");
class CategoryProvider {
    constructor(path) {
        this.path = path;
    }
    initIfNeeded() {
        if (this.categories != null) {
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
                this.categories = rows;
                resolve();
            })
                .on("error", (err) => {
                reject(err);
            });
        });
    }
    getAll() {
        return this.categories;
    }
    add(row) { }
}
exports.CategoryProvider = CategoryProvider;
//# sourceMappingURL=Category.js.map