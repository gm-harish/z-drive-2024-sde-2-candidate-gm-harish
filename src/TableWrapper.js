import React, { useEffect, useState } from "react";
const columns = ["name", "unMember", "status", "region", "area"];
const columnsData = [
  {
    id: "name",
    label: "name",
    isFilterAble: true,
    isSortable: true,
  },
  {
    id: "unMember",
    label: "unMember",
    isFilterAble: true,
    isSortable: false,
  },
  {
    id: "status",
    label: "status",
    isFilterAble: true,
    isSortable: false,
  },
  {
    id: "region",
    label: "region",
    isFilterAble: true,
    isSortable: false,
  },
  {
    id: "area",
    label: "area",
    isFilterAble: false,
    isSortable: true,
  },
];
import { Table } from "./Table";
import "./styles.css";

function Stepper({ onPrevClick, onNextClick, isPrevDisabled, isNextDisabled }) {
  return (
    <div>
      <button disabled={isPrevDisabled} onClick={onPrevClick}>
        prev
      </button>
      <button disabled={isNextDisabled} onClick={onNextClick}>
        next
      </button>
    </div>
  );
}

export default function TableWrapper() {
  const [data, setData] = useState([]);
  const [entriesPerPage, setShowEntriesPerPage] = useState(5);
  const [pageIndex, setPageIndex] = useState(0);
  const [filteredData, setFilteredData] = useState(null);
  const [searchText, setSearchText] = useState("");
  useEffect(function () {
    async function fetchData() {
      let res = await fetch("https://restcountries.com/v3.1/all");
      res = await res.json();
      let temp = [];
      res.forEach((data) => {
        const obj = {};
        obj.name = data.name.common;
        obj.unMember = data.unMember;
        obj.status = data.status;
        obj.region = data.region;
        obj.area = data.area;
        temp.push(obj);
      });
      setData(temp);
    }
    fetchData();
  }, []);

  const onPrevClick = () => {
    setPageIndex((prev) => prev - 1);
  };

  const onNextClick = () => {
    setPageIndex((prev) => prev + 1);
  };

  const onInputChange = (e) => {
    const value = e.target.value;
    console.log(value);
    if (value) {
      setSearchText(value);
      console.log(value);
    }
  };

  const onInputKeyDown = (e) => {
    console.log(e);
    if (e?.keyCode === 13) {
      if (searchText) {
        console.log("!@");
        setFilteredData(
          data.filter((row) => row.name.toLowerCase().startsWith(searchText))
        );
      } else {
        setFilteredData(null);
      }
    }
    if (e?.keyCode === 8) {
      setSearchText((prev) => (prev ? prev.slice(0, -1) : prev));
    }
  };

  const onFilerChange = (e, column) => {
    console.log(e.target.value, column);
    if (e.target.value) {
      setFilteredData(
        data.filter((row) =>
          row[column].toString().toLowerCase().startsWith(e.target.value)
        )
      );
    } else {
      setFilteredData(null);
    }
  };

  const onSortClicked = (column) => {
    const tempData = filteredData === null ? [...data] : [...filteredData];

    if (tempData) {
      tempData.sort((a, b) =>
        a[column].toString().localeCompare(b[column].toString())
      );
      setFilteredData(tempData);
    }
  };
  const renderedData = filteredData === null ? data : filteredData;

  return (
    <div>
      <div className={"filter"}>
        <label>
          Entries per page
          <select
            value={entriesPerPage}
            onChange={(e) => setShowEntriesPerPage(+e.target.value)}
          >
            {[...new Array(Math.min(renderedData.length, 26))].map(
              (each, index) => {
                const value = index;
                return value !== 0 ? (
                  <option value={value}>{value}</option>
                ) : null;
              }
            )}
          </select>
        </label>
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
      <Table
        columns={columns}
        data={renderedData.slice(
          pageIndex * entriesPerPage,
          pageIndex * entriesPerPage + entriesPerPage
        )}
        startingIndex={pageIndex * entriesPerPage}
        onFilerChange={onFilerChange}
        columnsData={columnsData}
        onSortClicked={onSortClicked}
      />
      <Stepper
        onPrevClick={onPrevClick}
        onNextClick={onNextClick}
        pageIndex={pageIndex}
        isNextDisabled={
          pageIndex + 1 === Math.floor(renderedData.length / entriesPerPage)
        }
        isPrevDisabled={pageIndex === 0}
      />
    </div>
  );
}
