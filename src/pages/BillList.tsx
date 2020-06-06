import React, { useContext, useEffect, Fragment } from "react";
import { DataContext } from "../dataContext";
import { getAllBills } from "../service";
import BillListItem from "../components/BillListItem";

const BillList = () => {
  const { bills, setBills } = useContext(DataContext);

  useEffect(() => {
    (async () => {
      setBills(await getAllBills());
    })();
  }, [setBills]);

  return (
    <Fragment>
      {bills.map((bill, index) => (
        <BillListItem key={`bill-item-${index}`} bill={bill} />
      ))}
    </Fragment>
  );
};

export default BillList;
