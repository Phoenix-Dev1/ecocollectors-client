import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const FilterWindow = ({
  selectedMarkerType,
  handleMarkerTypeChange,
  toggleFilterWindow,
  classes,
}) => {
  return (
    <div className={classes.filterWindow}>
      <ul className={classes.markerTypeList}>
        <li
          className={selectedMarkerType === '' ? classes.selected : ''}
          onClick={() => handleMarkerTypeChange({ target: { value: '' } })}
        >
          All
        </li>
        <li
          className={selectedMarkerType === 'blue' ? classes.selected : ''}
          onClick={() => handleMarkerTypeChange({ target: { value: 'blue' } })}
        >
          Blue
        </li>
        <li
          className={selectedMarkerType === 'carton' ? classes.selected : ''}
          onClick={() =>
            handleMarkerTypeChange({ target: { value: 'carton' } })
          }
        >
          Carton
        </li>
        <li
          className={
            selectedMarkerType === 'electronic-waste' ? classes.selected : ''
          }
          onClick={() =>
            handleMarkerTypeChange({
              target: { value: 'electronic-waste' },
            })
          }
        >
          Electronic Waste
        </li>
        <li
          className={selectedMarkerType === 'orange' ? classes.selected : ''}
          onClick={() =>
            handleMarkerTypeChange({ target: { value: 'orange' } })
          }
        >
          Orange
        </li>
        <li
          className={selectedMarkerType === 'purple' ? classes.selected : ''}
          onClick={() =>
            handleMarkerTypeChange({ target: { value: 'purple' } })
          }
        >
          Purple
        </li>
        <li
          className={selectedMarkerType === 'textile' ? classes.selected : ''}
          onClick={() =>
            handleMarkerTypeChange({ target: { value: 'textile' } })
          }
        >
          Textile
        </li>
      </ul>
      <div className={classes.closeFilterWindow} onClick={toggleFilterWindow}>
        <AiOutlineClose />
      </div>
    </div>
  );
};

export default FilterWindow;
