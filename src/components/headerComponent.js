import FiltersComponent from "./filtersComponent";
import "./headerComponent.css";

function HeaderComponent() {
  return (
    <div className="header-container">
			<h1>{"Online Bakery Analysis Dashboard"}</h1>
      <FiltersComponent />
    </div>
  );
}

export default HeaderComponent;
