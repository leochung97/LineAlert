import React, { useState } from "react";
import { connect } from "react-redux";
import { fetchDirections } from '../../actions/directions_actions';
import '../../assets/stylesheets/directions.scss'

function DirectionsForm(props) {
  const [state, setState] = useState({
    origin: "",
    destination: "",
  });

  const update = (field) => {
    return (e) => setState(() => ({ ...state, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.fetchDirections(state)
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
            <label className='directions-origin-label'>
              <input
                id='directions-form'
                type='text'
                value={state.origin}
                onChange={update('origin')}
                placeholder='Origin'
              />
            </label>
            <label className='directions-destination-label'>
              <input
                  id='directions-form'
                  type='text'
                  value={state.destination}
                  onChange={update('destination')}
                  placeholder='Destination'
                />
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

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDirections: (directions) => dispatch(fetchDirections(directions)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DirectionsForm);