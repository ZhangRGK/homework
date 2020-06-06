import React, { useMemo, ChangeEvent, useState } from "react";
import { IBill, ICategory } from "../constants";
import dayjs from "dayjs";

interface IProps {
  bills: IBill[];
  categories: ICategory[];
  onMonthSelectChange: (month: string) => void;
  onCategorySelectChange: (category: string) => void;
}

const Filters = (props: IProps) => {
  const {
    onMonthSelectChange,
    onCategorySelectChange,
    bills,
    categories,
  } = props;

  const [selectedMonth, setMonth] = useState<String>("all");

  const months = useMemo(
    () =>
      Array.from(
        new Set(bills.map((b) => dayjs(b.time).get("month") + 1)).values()
      ),
    [bills]
  );

  const onMonthSelectChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    onMonthSelectChange(e.target.value);
    setMonth(e.target.value);
  };

  const filteredBills = useMemo(
    () =>
      selectedMonth == "all"
        ? bills
        : bills.filter(
            (b) => (dayjs(b.time).get("month") + 1).toString() === selectedMonth
          ),
    [bills, selectedMonth]
  );

  const categoryOptions = useMemo(
    () =>
      Array.from(new Set(filteredBills.map((b) => b.category)).values()).map(
        (c) => {
          const matchedCategory = categories.find(
            (category) => category.id === c
          );
          return {
            value: c,
            text: matchedCategory ? matchedCategory.name : "未知",
          };
        }
      ),
    [filteredBills, categories]
  );

  const onCategorySelectChangeHandler = (e: ChangeEvent<HTMLSelectElement>) =>
    onCategorySelectChange(e.target.value);

  return (
    <div className="filters">
      <div className="filter-item">
        <label htmlFor="month-select">月份</label>
        <select id="month-select" onChange={onMonthSelectChangeHandler}>
          <option value="all">全部</option>
          {months.map((m) => (
            <option key={m} value={m}>
              {m}月
            </option>
          ))}
        </select>
      </div>
      <div className="filter-item">
        <label htmlFor="category-select">分类</label>
        <select id="category-select" onChange={onCategorySelectChangeHandler}>
          <option value="all">全部</option>
          {categoryOptions.map((c) => (
            <option key={c.value} value={c.value}>
              {c.text}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filters;
