import React, { useMemo } from "react";
import { IBill, BillType, ICategory } from "../constants";

interface IProps {
  bills: IBill[];
  categories: ICategory[];
  month: string;
}

const Statistics = (props: IProps) => {
  const { month, bills, categories } = props;

  const spend = useMemo(
    () =>
      bills
        .filter((b) => b.type === BillType.Expend)
        .reduce((sum, b) => sum + Number.parseFloat(b.amount), 0),
    [bills]
  );

  const income = useMemo(
    () =>
      bills
        .filter((b) => b.type === BillType.Income)
        .reduce((sum, b) => sum + Number.parseFloat(b.amount), 0),
    [bills]
  );

  const spendItemized = useMemo<Array<{ category: string; amount: number }>>(
    () =>
      bills
        .filter((b) => b.type === BillType.Expend)
        .reduce((array: Array<{ category: string; amount: number }>, b) => {
          const category = b.category || "other";
          let sum = array.find((c) => c.category === b.category)?.amount;
          if (!sum) {
            sum = 0;
          }
          return [
            ...array.filter((c) => c.category !== category),
            { category: category, amount: sum + Number.parseFloat(b.amount) },
          ];
        }, [])
        .map((c) => {
          let categoryName = categories.find(
            (category) => category.id === c.category
          )?.name;

          if (!categoryName) {
            categoryName = "其他";
          }
          return {
            category: categoryName,
            amount: c.amount,
          };
        }),
    [bills, categories]
  );

  return (
    <div className="statistics">
      <h3>{month === "all" ? "所有记录" : `${month}月`}统计:</h3>
      <div className="row">
        <div className="total">
          总支出: {spend}, 总收入: {income}
        </div>
        <div className="itemized">
          <h5>分项支出</h5>
          <div className="items">
            {spendItemized.map((i, index) => (
              <div key={`itemized-item-${index}`} className="item">
                {i.category} : {i.amount}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
