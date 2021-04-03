import React from "react";
import { Input } from "semantic-ui-react";

const SearchBar = (props) => {
  const onInputChange = (e) => {
    props.onTermSubmit(e.target.value);
  };

  return (
    <div className="ui action input">
      <form className="ui form">
        <div className="field">
          <Input
            placeholder={props.label}
            value={props.searched}
            onChange={onInputChange}
            type="text"
          />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
