import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import Downshift from 'downshift'
import { fetchDirections } from '../../actions/directions_actions';
import stationNames from "../../util/station_name";
import '../../assets/stylesheets/directions.scss'
// import { Autocomplete } from "@react-google-maps/api";
import AutoComplete from "./autocomplete";
function DirectionsForm(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
    props.fetchDirections(state)
  };
  
  const center = { lat: 40.767, lng: -73.972 };

  const defaultBounds = {
    north: center.lat + 0.1,
    south: center.lat -0.1,
    east: center.lng + 0.1,
    west: center.lng - 0.1
  };

//   const renderErrors = () => {
//     return (
//       <ul>
//         {Object.keys(props.errors).map((error, i) => (
//           <li key={`error-${i}`}>{props.errors[error]}</li>
//         ))}
//       </ul>
//     );
//   };

  return (
    <div className='directions-form-container'>
        <h1>Search Along a Route</h1>
        <form onSubmit={handleSubmit} className='directions-form'>
          <div className='directions-search-fields'>
            <Downshift
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
      <div>
        <label className='directions-origin-label'>Origin</label>
        <div
          style={{display: 'inline-block'}}
          {...getRootProps({}, {suppressRefError: true})}
        >
          <input {...getInputProps()} />
        </div>
        <ul {...getMenuProps()}>
          {isOpen
            ? stationNames
                .filter(item => !inputValue || item.toLowerCase().includes(inputValue.toLocaleLowerCase()))
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
            <label className='directions-destination-label'>
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
      <div>
        <label className='directions-destination-label'>Destination</label>
        <div
          style={{display: 'inline-block'}}
          {...getRootProps({}, {suppressRefError: true})}
        >
          <input {...getInputProps()} />
        </div>
        <ul {...getMenuProps()}>
          {isOpen
            ? stationNames
                .filter(item => !inputValue || item.includes(inputValue))
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
            <label className='directions-origin-label'>
                {/* <Autocomplete
                  options={{
                    types: ['subway_station'],
                    bounds: defaultBounds,
                    strictBounds: true,
                    componentRestrictions: {
                      country: 'US',
                    }
                  }}>
                  <input        
                    id='directions-form'
                    type='text'
                    value={state.origin}
                    onChange={update('origin')}
                    placeholder='Origin'
                  />
                </Autocomplete> */}
              {/* <AutoComplete  ref={AutoCompleteRef} suggestions={["Oranges", "Apples", "Banana", "Kiwi", "Mango"]}/> */}
            </label>
            <label className='directions-destination-label'>
              {/* <Autocomplete
                  options={{
                    types: ['subway_station'],
                    bounds: defaultBounds,
                    strictBounds: true,
                    componentRestrictions: {
                      country: 'US',
                    }
                  }}>
                <input
                    id='directions-form'
                    type='text'
                    value={state.destination}
                    onChange={update('destination')}
                    placeholder='Destination'
                  />
              </Autocomplete> */}
              {/* <AutoComplete ref={AutoCompleteRef} suggestions={["Oranges", "Apples", "Banana", "Kiwi", "Mango"]}/> */}
            </label>
            <div className='directions-submit-container'>
              <input className='directions-submit-button' type='submit' value='Search'/>
            </div>
          </div>
        </form>
    </div>
  );
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