import React, { useContext, useEffect, Fragment } from "react";
import { DataContext } from "../dataContext";
import { getAllBills, getCategories } from "../service";
import BillListItem from "../components/BillListItem";

const BillList = () => {
  const { bills, setBills, categories, setCategories } = useContext(
    DataContext
  );

  useEffect(() => {
    (async () => {
      setBills(await getAllBills());
      setCategories(await getCategories());
    })();
  }, [setBills, setCategories]);

  return (
    <Fragment>
      <h2>简易记账本</h2>
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
          {bills
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
