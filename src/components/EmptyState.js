function EmptyState({ message= "No data found" }) {
  return (
    <div className="emptyState-container">
			<div>{message}</div>
    </div>
  );
}

export default EmptyState;
