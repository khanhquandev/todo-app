import { useMemo } from "react";
import "./FilterPanel.css";

const FILTER_ITEMS = [
  {
    id: "all",
    label: "ALL",
    iconpath: "/all.svg",
  },
  {
    id: "important",
    label: "Important",
    iconpath: "/important.svg",
  },
  {
    id: "completed",
    label: "Completed",
    iconpath: "/completed.svg",
  },
  {
    id: "delete",
    label: "Delete",
    iconpath: "/delete.svg",
  },
];
const FilterPanel = (props) => {
  useMemo(() => {
    var importantQuantity = 0;
    var completedQuantity = 0;
    props.setQuantity.map((item) => {
      if (item.isImportant == true) {
        importantQuantity = importantQuantity + 1;
      }
      if (item.isCompleted == true) {
        completedQuantity = completedQuantity + 1;
      }
    });
    FILTER_ITEMS.map((filterItem) => {
      switch (filterItem.id) {
        case "all":
          return (filterItem.quantity = props.setQuantity.length);
        case "important":
          return (filterItem.quantity = importantQuantity);
        case "completed":
          return (filterItem.quantity = completedQuantity);
        case "delete":
          return (filterItem.quantity = 11);
      }
    });
  }, [props.setQuantity]);
  return (
    <div className="filter-panel">
      <div className="search">
        <input
          type="text"
          className="search-field"
          name="search-text"
          placeholder="Search"
          value={props.searchText}
          onChange={(e) => {
            props.setSearchText(e.target.value);
          }}
        />
      </div>

      <div className="filter-container">
        {FILTER_ITEMS.map((filterItem) => {
          return (
            <div
              key={filterItem.id}
              className={`filter-item ${
                filterItem.id === props.selectedFilterId ? "selected" : ""
              }`}
              onClick={() => props.setSelectedFilterId(filterItem.id)}
            >
              <div className="filter-name">
                <img src={filterItem.iconpath} alt={filterItem.id} />
                <p>{filterItem.label}</p>
              </div>
              <p>{filterItem.quantity}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FilterPanel;
