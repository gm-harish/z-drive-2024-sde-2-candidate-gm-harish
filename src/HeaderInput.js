import React, { useState } from "react";
import "./styles.css";

const HeaderInput = ({
  onEnterPressed,
  entriesPerPage,
  dataLength,
  setShowEntriesPerPage,
  isPaginated,
}) => {
  const [searchText, setSearchText] = useState("");
  const onInputChange = (e) => {
    const value = e.target.value;
    console.log(value);
    if (value) {
      setSearchText(value);
      console.log(value);
    }
  };

  const onInputKeyDown = (e) => {
    if (e?.keyCode === 13) {
      onEnterPressed(searchText);
    }
    if (e?.keyCode === 8) {
      setSearchText((prev) => (prev ? prev.slice(0, -1) : prev));
    }
  };

  return (
    <div className={"filter"}>
      {isPaginated && (
        <label>
          Entries per page
          <select
            value={entriesPerPage}
            onChange={(e) => setShowEntriesPerPage(+e.target.value)}
          >
            {[...new Array(Math.min(dataLength, 26))].map((each, index) => {
              const value = index;
              return value !== 0 ? (
                <option key={value} value={value}>
                  {value}
                </option>
              ) : null;
            })}
          </select>
        </label>
      )}
      <label>
        Search by country name
        <input
          type="text"
          value={searchText}
          onChange={onInputChange}
          onKeyDown={onInputKeyDown}
        />
      </label>
    </div>
  );
};
export default HeaderInput;
