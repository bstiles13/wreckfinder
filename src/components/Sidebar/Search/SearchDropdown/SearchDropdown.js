import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import BasicIcon from '../../../../assets/basic_icon.png';
import AdvancedIcon from '../../../../assets/advanced_icon.png';
import ProximityIcon from '../../../../assets/proximity_icon.png';

const options = [
  {
    key: 'basic',
    value: 'basic',
    text: 'Quick Search',
    image: { avatar: true, src: BasicIcon }
  },
  {
    key: 'advanced',
    value: 'advanced',
    text: 'Advanced Search',
    image: { avatar: true, src: AdvancedIcon }
  },
  {
    key: 'proximity',
    value: 'proximity',
    text: 'Proximity Search',
    image: { avatar: true, src: ProximityIcon }
  }
];

export const SearchDropdown = ({ onChange, value }) => (
  <Dropdown
    selection
    options={options}
    defaultValue={options[0].value}
    onChange={onChange}
    value={value}
  />
);
