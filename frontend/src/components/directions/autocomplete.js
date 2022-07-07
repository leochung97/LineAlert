import React, {useState, useRef } from 'react';

function AutoComplete(props) {
    const [state, setState] = useState({
        activeSuggestion : 0,
        filteredSuggestions : [],
        showSuggestions : false,
        userInput: ""
    });

        console.log(state)
        const onChange = e => {
            const { suggestions } = props;
            state.userInput = e.currentTarget.value;
        
            const filteredSuggestions = suggestions.filter(
              suggestion =>
                suggestion.toLowerCase().indexOf(state.userInput.toLowerCase()) > -1
            );
        
            setState({
              activeSuggestion: 0,
              filteredSuggestions,
              showSuggestions: true,
              userInput: e.currentTarget.value
            });
          };

          const onClick = e => {
            setState({
              activeSuggestion: 0,
              filteredSuggestions: [],
              showSuggestions: false,
              userInput: e.currentTarget.innerText
            });
          };
          const onKeyDown = e => {
            const { activeSuggestion, filteredSuggestions } = state;
        
            if (e.keyCode === 13) {
              setState({
                activeSuggestion: 0,
                showSuggestions: false,
                userInput: filteredSuggestions[activeSuggestion]
              });
            } else if (e.keyCode === 38) {
              if (activeSuggestion === 0) {
                return;
              }
              setState({ activeSuggestion: activeSuggestion - 1 });
            }
            // User pressed the down , increment the index
            else if (e.keyCode === 40) {
              if (activeSuggestion - 1 === filteredSuggestions.length) {
                return;
              }
              setState({ activeSuggestion: activeSuggestion + 1 });
            }
          };

          let suggestionsListComponent;

          if (state.showSuggestions && state.userInput) {
            if (state.filteredSuggestions.length) {
              suggestionsListComponent = (
                <ul className="suggestions">
                  {state.filteredSuggestions.map((suggestion, index) => {
                    let className;
      
                    // Flag the active suggestion with a class
                    if (index === state.activeSuggestion) {
                      className = "suggestion-active";
                    }
                    return (
                      <li className={className} key={suggestion} onClick={onClick}>
                        {suggestion}
                      </li>
                    );
                  })}
                </ul>
              );
            } else {
              suggestionsListComponent = (
                <div className="no-suggestions">
                  <em>No suggestions available.</em>
                </div>
              );
            }
          }
          return (
            <>
              <input
              className="origin-input"
                type="text"
                onChange={onChange}
                onKeyDown={onKeyDown}
                value={state.userInput}
              />
              {suggestionsListComponent}
            </>
          );
}

export default AutoComplete;