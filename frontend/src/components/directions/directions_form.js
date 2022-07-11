import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import Downshift from 'downshift'
import { fetchDirections } from '../../actions/directions_actions';
import stationNames from "../../util/station_name";
import '../../assets/stylesheets/directions.scss'
// import "bootstrap/dist/css/bootstrap.min.css"
import Spinner from 'react-bootstrap/Spinner';

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
  
  const center = { lat: 40.767, lng: -73.972 };

  const defaultBounds = {
    north: center.lat + 0.1,
    south: center.lat -0.1,
    east: center.lng + 0.1,
    west: center.lng - 0.1
  };
  if (loading) {
    return (
      <div className="spinner-animation">
      <Spinner animation="border" role="status" variant="light">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
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
                  // style={{display: 'inline-block'}}
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
                              style: {
                                backgroundColor:
                                  highlightedIndex === index ? 'lightgray' : 'white',
                                fontWeight: selectedItem === item ? 'bold' : 'normal',
                              },
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
                    // style={{display: 'inline-block'}}
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
                                style: {
                                  backgroundColor:
                                    highlightedIndex === index ? 'lightgray' : 'white',
                                  fontWeight: selectedItem === item ? 'bold' : 'normal',
                                },
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