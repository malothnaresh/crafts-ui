import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { orderStates, orderTypes } from "../dataUtils";

function FiltersComponent({ updateData }) {
	const [filters, updateFilters] = useState({
		fromDate: new Date(),
		toDate: new Date(),
		orderStatus: '',
		orderType: ''
	});
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
				<select className="filter-select" value={filters.orderStatus} onChange={(e) => updateFilters({...filters, orderStatus: e.target.value})}>
					{orderStates.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
				</select>
				<select className="filter-select" value={filters.orderType} onChange={(e) => updateFilters({...filters, orderType: e.target.value})}>
					{orderTypes.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
				</select>
				<DatePicker selected={filters.fromDate} onChange={(fromDate) => updateFilters({...filters, fromDate})} />
				<DatePicker selected={filters.toDate} onChange={(toDate) => updateFilters({...filters, toDate})} minDate={filters.fromDate} />
				<button onClick={onSubmit}>Submit</button>
			</div>
			{!validForm && <div className="error">{"Dates selected are not valid"}</div>}
    </div>
  );
}

export default FiltersComponent;
