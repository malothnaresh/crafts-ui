import FiltersComponent from "./filtersComponent";
import "./headerComponent.css";

function HeaderComponent({onFiltersChange, filters, updateData}) {
  return (
    <div className="header-container">
			<h1>{"Online Bakery Analysis Dashboard"}</h1>
      <FiltersComponent filters={filters} onFiltersChange={ onFiltersChange } updateData={updateData} />
    </div>
  );
}

export default HeaderComponent;
