import React, { useState } from "react";
import { connect } from "react-redux";
import Downshift from 'downshift'
import { fetchDirections } from '../../actions/directions_actions';
import stationNames from "../../util/station_name";
import '../../assets/stylesheets/directions.scss'

function DirectionsForm(props) {
  const [state, setState] = useState({
    origin: "",
    destination: "",
  });
  const [loading, setLoading ] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(loading => !loading);
    props.fetchDirections({origin: state.origin + ",NY", destination: state.destination + ",NY"})
    .then( () => {
      setLoading(loading => !loading)
    })
  };

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="loading-spinner">
        </div>
    </div>
    )
  } else {  
  return (
    <div className='directions-form-container'>
        <h1>Search Along a Route</h1>
        <form onSubmit={handleSubmit} className='directions-form'>
          <div className='directions-search-fields'>
            <Downshift
              className='downshift-origin'
              onChange={selection => setState(() => ({ ...state, origin: selection }))}
              itemToString={item => (item ? item : '')}
            >
            {({
              getInputProps,
              getItemProps,
              getLabelProps,
              getMenuProps,
              isOpen,
              inputValue,
              highlightedIndex,
              selectedItem,
              getRootProps,
            }) => (
              <div className='directions-search-origin'>
                <label className='directions-origin-label'>Origin</label>
                <div className='combobox-origin'
                  {...getRootProps({}, {suppressRefError: true})}
                >
                  <input {...getInputProps()} />
                </div>
                <ul {...getMenuProps()}>
                  {isOpen
                    ? stationNames
                        .filter(item => !inputValue || item.toLowerCase().includes(inputValue.toLowerCase())).slice(0, 4)
                        .map((item, index) => (
                          <li
                            {...getItemProps({
                              key: item,
                              index,
                              item,
                            })}
                          >
                            {item}
                          </li>
                        ))
                    : null}
                </ul>
              </div>
            )}
            </Downshift>

            <Downshift
              onChange={selection => setState(() => ({ ...state, destination: selection }))}
              itemToString={item => (item ? item : '')}
            >
              {({
                getInputProps,
                getItemProps,
                getLabelProps,
                getMenuProps,
                isOpen,
                inputValue,
                highlightedIndex,
                selectedItem,
                getRootProps,
              }) => (
                <div className='directions-search-destination'>
                <label className='directions-destination-label'>Destination</label>
                  <div className='combobox-destination'
                    {...getRootProps({}, {suppressRefError: true})}
                  >
                    <input {...getInputProps()} />
                  </div>
                  <ul {...getMenuProps()}>
                    {isOpen
                      ? stationNames
                        .filter(item => !inputValue || item.toLowerCase().includes(inputValue.toLowerCase())).slice(0, 4)
                          .map((item, index) => (
                            <li
                              {...getItemProps({
                                key: item,
                                index,
                                item,
                              })}
                            >
                              {item}
                            </li>
                          ))
                      : null}
                  </ul>
                </div>
              )}
            </Downshift>
          </div>
          <div className='directions-submit-container'>
              <input className='directions-submit-button' type='submit' value='Search'/>
            </div>
        </form>
    </div>
  );
}
}


const mapStateToProps = (state) => {
  return {
    directions: state.entities.directions
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDirections: (directions) => dispatch(fetchDirections(directions)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DirectionsForm);