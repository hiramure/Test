import React from "react";
import { BASE_URL } from "../../config.js";

const CategoryForm = ({
  value,
  setValue,
  handleSubmit,
  buttonText = "Submit",
  buttonText2 = "Search",
  setCategories,
}) => {
  return (
    <div className="p-3">
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          className="py-3 px-4 border roounded-lg w-full"
          placeholder="Write Category name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoComplete="off"
        />
        <div className="flex justify-between">
          <button className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50">
            {buttonText}
          </button>
        </div>
      </form>
    </div>
  );
};
export default CategoryForm;
