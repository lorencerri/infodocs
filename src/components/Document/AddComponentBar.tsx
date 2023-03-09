export const AddComponentBar = () => {
  return (
    <div className="hero min-h-16 mb-5 rounded-lg bg-base-200 text-center">
      <div className="flex gap-2">
        <select className="select">
          <option disabled selected>
            Select Component
          </option>
          <option>Text (Markdown)</option>
          <option>Video</option>
        </select>
        <button placeholder="Type here" className="btn-success btn">
          Add
        </button>
      </div>
    </div>
  );
};
