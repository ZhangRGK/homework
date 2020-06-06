import React from "react";
import { IBill } from "../constants";

interface IProps {
  bill: IBill;
}

const BillListItem = (props: IProps) => {
  const { bill } = props;

  return (
    <div className="row">
      <div className="cell">{bill.category}</div>
      <div className="cell">{bill.type}</div>
      <div className="cell">{bill.amount}</div>
      <div className="cell">{bill.time}</div>
    </div>
  );
};

export default BillListItem;
