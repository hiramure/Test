import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../config";
import { Link, useNavigate } from "react-router-dom";

const SearchComponent = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");

    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    // <div>
    //   <input
    //     type="text"
    //     placeholder="Search categories"
    //     value={query}
    //     onChange={(e) => setQuery(e.target.value)}
    //   />
    //   <button onClick={handleSearch}>Search</button>
    //   {error && <div>{error}</div>}
    //   <ul>
    //     {searchResults.map((category) => (
    //       <li key={category._id}>{category.name}</li>
    //     ))}
    //   </ul>
    // </div>
    <div>
      <div className="p-3">
        <form className="space-y-3" onSubmit={handleSubmit}>
          <input
            type="text"
            className="py-3 px-4 border roounded-lg w-full"
            placeholder="Write Category name"
            autoComplete="off"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex justify-between">
            <button className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50">
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchComponent;
