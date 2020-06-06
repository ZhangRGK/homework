import React, {
  useContext,
  useEffect,
  Fragment,
  useCallback,
  useState,
  useMemo,
} from "react";
import { DataContext } from "../dataContext";
import { getAllBills, getCategories, addBill } from "../service";
import BillListItem from "../components/BillListItem";
import Filters from "../components/Filters";
import dayjs from "dayjs";
import BillForm from "../components/BillForm";
import { IBill } from "../constants";

const BillList = () => {
  const { bills, setBills, categories, setCategories } = useContext(
    DataContext
  );

  const [selectedMonth, setSelectedMonth] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setBills(await getAllBills());
      setCategories(await getCategories());
    })();
  }, [setBills, setCategories]);

  const onMonthSelectChange = useCallback(
    (month: string) => setSelectedMonth(month),
    [setSelectedMonth]
  );

  const onCategorySelectChange = useCallback(
    (category: string) => setSelectedCategory(category),
    [setSelectedCategory]
  );

  const toggleFormDisplay = useCallback(() => setShowForm(!showForm), [
    setShowForm,
    showForm,
  ]);

  const onBillFormSubmit = useCallback(
    async (bill: IBill) => {
      await addBill(bill);
      setBills([...bills, bill]);
    },
    [bills]
  );

  const filteredBills = useMemo(
    () =>
      bills
        .filter((b) =>
          selectedMonth === "all"
            ? true
            : (dayjs(b.time).get("month") + 1).toString() === selectedMonth
        )
        .filter((b) =>
          selectedCategory === "all" ? true : b.category === selectedCategory
        ),
    [bills, selectedMonth, selectedCategory]
  );

  return (
    <Fragment>
      <h2>简易记账本</h2>
      <div className="action-bar">
        <Filters
          onMonthSelectChange={onMonthSelectChange}
          onCategorySelectChange={onCategorySelectChange}
          bills={bills}
          categories={categories}
        />
        <div className="action-buttons">
          <button className="btn" onClick={toggleFormDisplay}>
            + 记账
          </button>
        </div>
      </div>
      {showForm && (
        <BillForm categories={categories} onBillFormSubmit={onBillFormSubmit} />
      )}
      <table cellSpacing={0}>
        <thead>
          <tr>
            <th>账单分类</th>
            <th>账单类型</th>
            <th>账单金额</th>
            <th>账单时间</th>
          </tr>
        </thead>
        <tbody>
          {filteredBills
            .sort((b1, b2) => b2.time - b1.time)
            .map((bill, index) => (
              <BillListItem
                key={`bill-item-${index}`}
                bill={bill}
                categories={categories}
              />
            ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default BillList;
