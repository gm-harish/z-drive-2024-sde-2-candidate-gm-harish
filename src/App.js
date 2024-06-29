import "./styles.css";
import TableWrapper from "./TableWrapper";

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

export default function App() {
  return (
    <div className="App">
      <TableWrapper columnsData={columnsData} isPaginated={true} />
    </div>
  );
}
