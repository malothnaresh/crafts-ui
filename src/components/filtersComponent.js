import react, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function FiltersComponent() {
	const [filters, updateFilters] = useState({
		fromDate: new Date(),
		toDate: new Date()
	});
	const [validForm, setValidForm] = useState(true);
	const onSubmit = () => {
		if(filters.fromDate > filters.toDate) {
			setValidForm(false);
			return ;
		}
		setValidForm(true);
		console.log("filters: ", filters);
	}
  return (
    <div className="filters-container">
			<div className="filters">
				<DatePicker selected={filters.fromDate} onChange={(fromDate) => updateFilters({...filters, fromDate})} />
				<DatePicker selected={filters.toDate} onChange={(toDate) => updateFilters({...filters, toDate})} minDate={filters.fromDate} />
				<button onClick={onSubmit}>Submit</button>
			</div>
			{!validForm && <div className="error">{"Dates selected are not valid"}</div>}
    </div>
  );
}

export default FiltersComponent;
