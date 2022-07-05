import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchDirections } from '../../actions/directions_actions';
import { Link, useHistory } from "react-router-dom";

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
        <form onSubmit={handleSubmit}>

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