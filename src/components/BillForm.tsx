import React, { useCallback, useState, ChangeEvent } from "react";
import { ICategory, IBill, BillType } from "../constants";
import dayjs from "dayjs";

interface IProps {
  onBillFormSubmit: (bill: IBill) => void;
  categories: ICategory[];
}

const BillForm = (props: IProps) => {
  const { onBillFormSubmit, categories } = props;

  const [category, setCategory] = useState<string>(categories[0].id);
  const [type, setType] = useState<string>("0");
  const [amount, setAmount] = useState<string>("0");

  const onCategoryChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value),
    [setCategory]
  );
  const onTypeChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => setType(e.target.value),
    [setType]
  );
  const onAmountChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setAmount(e.target.value),
    [setAmount]
  );
  const onSubmit = useCallback(
    () =>
      onBillFormSubmit({
        type: type === BillType.Expend ? BillType.Expend : BillType.Income,
        category,
        amount,
        time: dayjs().valueOf(),
      }),
    [category, type, amount, onBillFormSubmit]
  );

  return (
    <div className="bill-form">
      <div className="row">
        <div className="form-item">
          <label htmlFor="form-category">账单分类</label>
          <select id="form-category" onChange={onCategoryChange}>
            {categories.map((c) => (
              <option key={`bill-form-${c.id}`} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-item">
          <label htmlFor="form-type">账单类型</label>
          <select id="form-type" onChange={onTypeChange}>
            <option value={1}>收入</option>
            <option value={0}>支出</option>
          </select>
        </div>
      </div>
      <div className="row">
        <div className="form-item">
          <label htmlFor="">账单金额</label>
          <input type="number" id="amount" onChange={onAmountChange} />
        </div>
        <div className="form-item buttons">
          <button className="btn" onClick={onSubmit}>
            提交
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillForm;
