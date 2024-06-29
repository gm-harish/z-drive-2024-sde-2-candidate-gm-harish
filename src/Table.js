import React from "react";
import "./table.css";

export const Table = ({
  data,
  startingIndex,
  onFilerChange,
  columnsData,
  onSortClicked,
}) => {
  return (
    <div>
      <div className="table-container">
        {columnsData.map((column) => (
          <div key={column.id} className={column.id}>
            {column.label}
            {column.isSortable && (
              <button
                onClick={() => {
                  onSortClicked(column.id);
                }}
              >
                sort
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="table-container">
        {columnsData.map((column) => (
          <div key={column.id} className={column.id}>
            {column.isFilterAble && (
              <input
                type="text"
                placeholder="All"
                onChange={(e) => {
                  onFilerChange(e, column);
                }}
              />
            )}
          </div>
        ))}
      </div>
      {data &&
        data.map((row, index) => {
          return (
            <div className="table-container" key={row.name + index}>
              <div className="initial">{startingIndex + index + 1} </div>
              {columnsData.map((key) => (
                <div className={key.id} key={key.id + index}>
                  {row[key.id].toString()}
                </div>
              ))}
            </div>
          );
        })}
    </div>
  );
};
