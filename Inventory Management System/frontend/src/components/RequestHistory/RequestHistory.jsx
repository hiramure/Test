import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import { BASE_URL } from "../../config.js";
import { toast } from "react-toastify";
import { authContext } from "../../context/AuthContext.jsx";

const RequestHistory = () => {
  const [itemRequest, setItemRequest] = useState([]);
  const { user } = useContext(authContext);

  const getAllRequest = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/request/user/${user._id}`);
      setItemRequest(data);
    } catch (error) {
      console.log(error);
      toast.error("Something wrong when getting the hostory");
    }
  };

  useEffect(() => {
    getAllRequest();
  }, [itemRequest]);
  console.log("itemRequest:", itemRequest);

  return (
    <div>
      <div className="ml-[10rem] flex flex-col md:flex-row">
        <div className="md:w-3/4 p-3">
          {" "}
          <div className="h-15">Manage Request</div>
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
                          Burrow Date
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 ">
                          Return Date
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 ">
                          Purpose
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 ">
                          Request Status
                        </td>

                        <td className="whitespace-nowrap px-6 py-4 "></td>
                      </tr>

                      {itemRequest?.map((i) => (
                        <tr
                          key={i._id}
                          className="border-b transition duration-300 ease-in-out hover:bg-orange-100 light:border-neutral-500 light:hover:bg-orange-600"
                        >
                          <td
                            key={i._id}
                            className="whitespace-nowrap px-6 py-4 "
                          >
                            <a href={`/itemDetails/${i.itemId._id}`}>
                              {i.itemId.itemId}
                            </a>
                          </td>
                          <td
                            key={i._id}
                            className="whitespace-nowrap px-6 py-4 "
                          >
                            {new Date(i.burrowDate).toISOString().split("T")[0]}
                          </td>
                          <td
                            key={i._id}
                            className="whitespace-nowrap px-6 py-4 "
                          >
                            {new Date(i.returnDate).toISOString().split("T")[0]}
                          </td>
                          <td
                            key={i._id}
                            className="whitespace-nowrap px-6 py-4 "
                          >
                            {i.purpose}
                          </td>
                          <td
                            key={i._id}
                            className="whitespace-nowrap px-6 py-4"
                          >
                            {i.requestStatus}
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
    </div>
  );
};

export default RequestHistory;
