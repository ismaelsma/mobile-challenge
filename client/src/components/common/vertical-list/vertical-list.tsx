import React from 'react';
import { IVerticalListProps } from './vertical-list.types';

const VerticalList: React.FC<IVerticalListProps> = (
  props: IVerticalListProps
) => {
  const { data } = props;

  return (
    <div className="vertical-list">
      <ul className="vertical-list__container">
        {data.map((item) => (
          <li className="vertical-list__item" key={item.title}>
            <p className="vertical-list__item-title">{item.title}</p>
            <p className="vertical-list__item-value">{item.value}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VerticalList;
