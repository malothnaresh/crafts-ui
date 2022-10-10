import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { orderStates, orderTypes } from "../utils/dataUtils";

function FiltersComponent({ filters, onFiltersChange, updateData }) {
	const [validForm, setValidForm] = useState(true);
	const onSubmit = () => {
		if(filters.fromDate > filters.toDate) {
			setValidForm(false);
			return ;
		}
		setValidForm(true);
		updateData(filters);
	}
  return (
    <div className="filters-container">
			<div className="filters">
				<select className="filter-select" value={filters.orderStatus} onChange={(e) => onFiltersChange({...filters, orderStatus: e.target.value})}>
					{orderStates.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
				</select>
				<select className="filter-select" value={filters.orderType} onChange={(e) => onFiltersChange({...filters, orderType: e.target.value})}>
					{orderTypes.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
				</select>
				<DatePicker placeholderText="Select from date" selected={filters.fromDate} onChange={(fromDate) => onFiltersChange({...filters, fromDate})} />
				<DatePicker placeholderText="Select to date" selected={filters.toDate} onChange={(toDate) => onFiltersChange({...filters, toDate})} minDate={filters.fromDate} />
				<button onClick={onSubmit}>Submit</button>
			</div>
			{!validForm && <div className="error filters-error">{"Dates selected are not valid"}</div>}
    </div>
  );
}

export default FiltersComponent;
