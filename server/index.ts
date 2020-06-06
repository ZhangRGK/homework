import * as express from "express";
import * as path from "path";
import { BillingDataProvider } from "./Bill";
import { CategoryProvider } from "./Category";

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

const bindDataProvider: () => express.RequestHandler = () => {
  const billingDataProvider = new BillingDataProvider(
    path.resolve(__dirname, "./bill.csv")
  );
  const categoryProvider = new CategoryProvider(
    path.resolve(__dirname, "./categories.csv")
  );

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

export interface IDataProvider<T> {
  initIfNeeded: () => Promise<void>;
  getAll: () => T[];
  add: (row: T) => void;
}
