import React, { useMemo } from "react";
import dayjs from "dayjs";
import { IBill, BillType, ICategory } from "../constants";

interface IProps {
  bill: IBill;
  categories: ICategory[];
}

const BillListItem = (props: IProps) => {
  const { bill, categories } = props;

  const billType = useMemo(() => {
    if (bill.type === BillType.Expend) {
      return "支出";
    } else if (bill.type === BillType.Income) {
      return "收入";
    }
    return "未知";
  }, [bill.type]);

  const categoryName = useMemo(() => {
    const category = categories.find((c) => c.id === bill.category);
    if (category == null) {
      return "未知";
    }
    return category.name;
  }, [categories, bill.category]);

  return (
    <tr>
      <td>{categoryName}</td>
      <td>{billType}</td>
      <td>￥{bill.amount}</td>
      <td>{dayjs(bill.time).format("YYYY-MM-DD HH:mm:ss")}</td>
    </tr>
  );
};

export default BillListItem;
