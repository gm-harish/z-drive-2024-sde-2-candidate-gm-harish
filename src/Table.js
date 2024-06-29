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
    <div className="table-root">
      <div className="table-container">
        {columnsData.map((column) => (
          <>
            <div key={column.id} className={column.id}>
              {column.label}
              {column.isSortable && (
                <div>
                  <div
                    className="triangle-up"
                    onClick={() => {
                      onSortClicked(column.id, true);
                    }}
                  >
                    sort up
                  </div>
                  <div
                    className="triangle-down"
                    onClick={() => {
                      onSortClicked(column.id, false);
                    }}
                  >
                    sort down
                  </div>
                </div>
              )}
            </div>
          </>
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
                  onFilerChange(e, column.id);
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
