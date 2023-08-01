import { RoleAndFeatureType } from '@/types/feature';
import React, { useEffect, useState } from 'react';

const ToggleRolesItem = ({
  action,
  f,
  checkAll,
  setCheckAll,
}: {
  action: string;
  f: RoleAndFeatureType;
  checkAll: boolean;
  setCheckAll: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [check, setCheck] = useState(
    checkAll ? checkAll : Boolean(f.actions.find((a) => a === action)),
  );

  useEffect(() => {
    if (checkAll) {
      setCheck(checkAll);
    }
  }, [checkAll]);

  return (
    <li className="roles-cell_toggle" key={action}>
      <label
        htmlFor={`toggle-${action.toLowerCase()}-${f.feature.name}`}
        className="roles-cell_toggle-title"
      >
        {action.charAt(0) + action.slice(1).toLowerCase()}
      </label>
      <div className="toggle">
        <input
          type="checkbox"
          id={`toggle-${action.toLowerCase()}-${f.feature.name}`}
          name={f.feature.name}
          data-action={action}
          hidden
          checked={check}
          onChange={() => {
            setCheckAll(false);
            setCheck(!check);
          }}
        />
        <label htmlFor={`toggle-${action.toLowerCase()}-${f.feature.name}`}>
          <div className="toggle"></div>
        </label>
      </div>
    </li>
  );
};

export default ToggleRolesItem;
