import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../config.js";
import { Link } from "react-router-dom";
import { MdOutlineReadMore } from "react-icons/md";
import { toast } from "react-toastify";

const ItemByCategory = () => {
  const [items, setItems] = useState([]);
  const { categoryTest } = useParams();

  const getItems = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/item/category/items/${categoryTest}`
      );
      setItems(data);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong when getting items.");
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div className="ml-[10rem] flex flex-col md:flex-row">
      <div className="md:w-3/4 p-3">
        {" "}
        <div className="h-15">Items</div>
        <br />
        <hr />
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium light:border-neutral-300"></thead>
                  <tbody>
                    <tr className="bg-orange-100">
                      <td className="whitespace-nowrap px-6 py-4 ">
                        Serial No
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 ">
                        Inventory Category
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 ">
                        Availability
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 ">
                        Burrowed By
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 "></td>
                    </tr>

                    {items?.map((i) => (
                      <tr
                        key={i._id}
                        className="border-b transition duration-300 ease-in-out hover:bg-orange-100 light:border-neutral-500 light:hover:bg-orange-600"
                      >
                        <td
                          key={i._id}
                          className="whitespace-nowrap px-6 py-4 "
                        >
                          {i.itemId}
                        </td>
                        <td
                          key={i._id}
                          className="whitespace-nowrap px-6 py-4 "
                        >
                          {i.categoryTest.name}
                        </td>
                        <td
                          key={i._id}
                          className="whitespace-nowrap px-6 py-4 "
                        >
                          {i.availability ? "Yes" : "No"}
                        </td>
                        <td
                          key={i._id}
                          className="whitespace-nowrap px-6 py-4 "
                        >
                          {i.borrowedBy}
                        </td>
                        <td style={{ display: "flex", alignItems: "center" }}>
                          <Link to={`/itemDetails/${i._id}`}>
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

export default ItemByCategory;
