import { useState } from 'react';

export function useCheckBoxTable(data: any[]) {
  const [checkedKeys, setCheckedKeys] = useState<any>([]);
  let checked = false;
  let indeterminate = false;
  if (checkedKeys.length === data.length) {
    checked = true;
  } else if (checkedKeys.length === 0) {
    checked = false;
  } else if (checkedKeys.length > 0 && checkedKeys.length < data.length) {
    indeterminate = true;
  }
  const handleCheckAll = (value: any, checked: boolean) => {
    const keys = checked ? data.map((item: any) => item) : [];
    setCheckedKeys(keys);
  };
  const handleCheck = (value: any, checked: boolean) => {
    const keys = checked
      ? [...checkedKeys, value]
      : checkedKeys.filter((item: any) => item !== value);

    setCheckedKeys(keys);
  };

  return {
    checked,
    indeterminate,
    handleCheckAll,
    handleCheck,
    checkedKeys,
  };
}
