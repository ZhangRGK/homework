"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const Bill_1 = require("./Bill");
const Category_1 = require("./Category");
const { Router } = express;
const app = express();
const port = 3001;
const router = Router();
router.get("/bills", (req, res, next) => {
    res.send(req.app.locals.bill.getAll()).end();
});
router.post("/bills", (req, res, next) => {
    const newBill = req.body;
    req.app.locals.bill.add(newBill);
    res.status(200).end();
});
router.get("/categories", (req, res, next) => {
    res.send(req.app.locals.category.getAll()).end();
});
const bindDataProvider = () => {
    const billingDataProvider = new Bill_1.BillingDataProvider(path.resolve(__dirname, "./bill.csv"));
    const categoryProvider = new Category_1.CategoryProvider(path.resolve(__dirname, "./categories.csv"));
    return (req, res, next) => {
        Promise.all([
            billingDataProvider.initIfNeeded(),
            categoryProvider.initIfNeeded(),
        ]).then(() => {
            app.locals.bill = billingDataProvider;
            app.locals.category = categoryProvider;
            next();
        });
    };
};
app.use(bindDataProvider());
app.use("/api", router);
app.listen(port, async () => {
    console.log(`listening on port ${port}`);
});
//# sourceMappingURL=index.js.map