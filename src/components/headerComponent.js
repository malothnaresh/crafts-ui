import FiltersComponent from "./filtersComponent";
import "./headerComponent.css";

function HeaderComponent({updateData}) {
  return (
    <div className="header-container">
			<h1>{"Online Bakery Analysis Dashboard"}</h1>
      <FiltersComponent updateData={ updateData }/>
    </div>
  );
}

export default HeaderComponent;
