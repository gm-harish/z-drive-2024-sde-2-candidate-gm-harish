import React, { useEffect, useState } from "react";

import { Table } from "./Table";
import "./styles.css";
import HeaderInput from "./HeaderInput";
import Stepper from "./Stepper";

export default function TableWrapper({ columnsData, isPaginated }) {
  const [data, setData] = useState([]);
  const [entriesPerPage, setShowEntriesPerPage] = useState(5);
  const [pageIndex, setPageIndex] = useState(0);
  const [filteredData, setFilteredData] = useState(null);
  const [isLoading, setIsloading] = useState(false);
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
      setShowEntriesPerPage(isPaginated ? 5 : temp.length);
      setIsloading(false);
    }
    setIsloading(true);
    fetchData();
  }, []);

  const onPrevClick = () => {
    setPageIndex((prev) => prev - 1);
  };

  const onNextClick = () => {
    setPageIndex((prev) => prev + 1);
  };

  const onInputEnterPressed = (searchText) => {
    if (searchText) {
      console.log("!@");
      setFilteredData(
        data.filter((row) => row.name.toLowerCase().startsWith(searchText))
      );
    } else {
      setFilteredData(null);
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

  const onSortClicked = (column, isAscending) => {
    console.log("212");
    const tempData = filteredData === null ? [...data] : [...filteredData];
    setIsloading(true);
    if (tempData) {
      tempData.sort((a, b) =>
        isAscending
          ? a[column].toString().localeCompare(b[column].toString())
          : b[column].toString().localeCompare(a[column].toString())
      );
      setFilteredData(tempData);
      setIsloading(false);
    }
  };
  const renderedData = filteredData === null ? data : filteredData;

  return (
    <div className="table-wrapper">
      <HeaderInput
        onEnterPressed={onInputEnterPressed}
        entriesPerPage={entriesPerPage}
        dataLength={renderedData.length}
        setShowEntriesPerPage={setShowEntriesPerPage}
        isPaginated={isPaginated}
      />
      <Table
        data={renderedData.slice(
          pageIndex * entriesPerPage,
          pageIndex * entriesPerPage + entriesPerPage
        )}
        startingIndex={pageIndex * entriesPerPage}
        onFilerChange={onFilerChange}
        columnsData={columnsData}
        onSortClicked={onSortClicked}
      />
      {isPaginated && (
        <Stepper
          onPrevClick={onPrevClick}
          onNextClick={onNextClick}
          pageIndex={pageIndex}
          isNextDisabled={
            pageIndex + 1 === Math.floor(renderedData.length / entriesPerPage)
          }
          isPrevDisabled={pageIndex === 0}
        />
      )}
      {isLoading && <div className="loader">Loading ... </div>}
    </div>
  );
}
