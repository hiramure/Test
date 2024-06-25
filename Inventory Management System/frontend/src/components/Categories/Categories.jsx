import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MdOutlineReadMore } from "react-icons/md";
import axios from "axios";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../config.js";

const Categories = () => {
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState([]);

  const handleSearch = async () => {
    const trimmedQuery = query.trim();
    setQuery(trimmedQuery);

    if (trimmedQuery) {
      try {
        const { data } = await axios.get(
          `${BASE_URL}/category?query=${trimmedQuery}`
        );
        setCategories(data.data);
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong with the search");
      }
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/category`);
      setCategories(data.data);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong in getting categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <div className="ml-[10rem] flex flex-col md:flex-row">
      <div className="md:w-3/4 p-3">
        <div className="h-15">Categories</div>
        <br />
        <hr />
        <section>
          <div className="max-w-[570px] mt-[30px] mx-auto bg-[#FFE7C4] rounded-md flex items-center justify-between">
            <input
              placeholder="Search a category here"
              type="search"
              className="py-1 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              className="btn mt-0 rounded-[0px] rounded-r-md"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </section>
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium light:border-neutral-300"></thead>
                  <tbody>
                    {categories?.map((c) => (
                      <tr
                        key={c._id}
                        className="border-b transition duration-300 ease-in-out hover:bg-orange-100 light:border-neutral-500 light:hover:bg-orange-600"
                      >
                        <td className="whitespace-nowrap px-6 py-4">
                          {c.name}
                        </td>
                        <td style={{ display: "flex", alignItems: "center" }}>
                          <Link to={`/item/category/${c._id}`}>
                            <MdOutlineReadMore
                              type="button"
                              style={{
                                color: "brown",
                                fontSize: "25px",
                                marginTop: "10px",
                                marginLeft: "10px",
                              }}
                            />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
