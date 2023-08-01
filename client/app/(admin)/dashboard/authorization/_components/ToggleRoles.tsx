import { RoleAndFeatureType } from '@/types/feature';
import React, { ChangeEvent, useState } from 'react';
import ToggleRolesItem from './ToggleRolesItem';

export const actionList = ['CREATE', 'READ', 'UPDATE', 'DELETE'];

const ToggleRoles = ({ f }: { f: RoleAndFeatureType }) => {
  const [checkAll, setCheckAll] = useState(false);

  const handleCheckAll = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckAll(e.target.checked);
  };

  return (
    <div className="roles-cell">
      <div className="roles-cell_header">
        <h3 className="roles-cell_title">{f.feature.name}</h3>
        <div className="roles-cell_toggle">
          <div className="toggle">
            <input
              type="checkbox"
              id={`toggle-all-${f.feature.name}`}
              name={f.feature.name}
              data-action={'ALL'}
              hidden
              checked={checkAll}
              onChange={handleCheckAll}
            />
            <label htmlFor={`toggle-all-${f.feature.name}`}>
              <div className="toggle"></div>
            </label>
          </div>
        </div>
      </div>
      <ul className="roles-cell_list">
        {actionList.map((action, idx) => (
          <ToggleRolesItem
            action={action}
            key={action}
            checkAll={checkAll}
            setCheckAll={setCheckAll}
            f={f}
          ></ToggleRolesItem>
        ))}
      </ul>
    </div>
  );
};

export default ToggleRoles;
