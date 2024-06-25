import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../config.js";
import { Link } from "react-router-dom";
import ItemEditPopup from "./ItemEditPopup.jsx";

const RequestFromUsers = () => {
  const [itemRequest, setItemRequest] = useState([]);
  const [openPopup2, setOpenPopup2] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState("");

  const handleEdit = (itemId) => {
    setSelectedItemId(itemId);
    setOpenPopup2(true);
  };

  const getAllRequest = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/request/`);
      // Sort requests: pending first, then accepted/declined
      const sortedRequests = data.sort((a, b) => {
        if (a.requestStatus === "Pending" && b.requestStatus !== "Pending") {
          return -1;
        } else if (
          a.requestStatus !== "Pending" &&
          b.requestStatus === "Pending"
        ) {
          return 1;
        }
        return 0;
      });
      setItemRequest(sortedRequests);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllRequest();
  }, [itemRequest]);

  const handleAcceptRequest = async (id) => {
    try {
      await axios.put(`${BASE_URL}/request/${id}`, {
        requestStatus: "Accepted",
      });
      // After updating, refresh the request list
      getAllRequest();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeclineRequest = async (id) => {
    try {
      await axios.put(`${BASE_URL}/request/${id}`, {
        requestStatus: "Declined",
      });
      // After updating, refresh the request list
      getAllRequest();
    } catch (error) {
      console.log(error);
    }
  };

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
                        <td className="whitespace-nowrap px-4 py-4 ">
                          Serial No
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 ">
                          Burrow Date
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 ">
                          Return Date
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 ">
                          Purpose
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 ">
                          Availability
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 ">
                          Request Status
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 "></td>
                      </tr>
                      {itemRequest?.map((i) => (
                        <tr
                          key={i._id}
                          className={`border-b transition duration-300 ease-in-out hover:bg-orange-100 light:border-neutral-500 light:hover:bg-orange-600 ${
                            i.requestStatus === "Pending" ? "pending" : ""
                          }`}
                        >
                          <td
                            key={i._id}
                            className="whitespace-nowrap px-4 py-4 "
                          >
                            <span
                              style={{
                                cursor: "pointer",
                              }}
                              //onClick={() => handleEdit(i.itemId)}
                              onClick={() => handleEdit(i.itemId?._id)}
                            >
                              {i.itemId?.itemId}
                            </span>
                          </td>
                          <td
                            key={i._id}
                            className="whitespace-nowrap px-4 py-4 "
                          >
                            {new Date(i.burrowDate).toISOString().split("T")[0]}
                          </td>
                          <td
                            key={i._id}
                            className="whitespace-nowrap px-4 py-4 "
                          >
                            {new Date(i.returnDate).toISOString().split("T")[0]}
                          </td>
                          <td
                            key={i._id}
                            className="whitespace-nowrap px-4 py-4 "
                          >
                            {i.purpose}
                          </td>
                          <td
                            key={i._id}
                            className="whitespace-nowrap px-4 py-4"
                          >
                            {i.itemId.availability ? "Yes" : "No"}
                          </td>
                          <td
                            key={i._id}
                            className="whitespace-nowrap px-4 py-4"
                          >
                            {i.requestStatus}
                          </td>
                          <td
                            key={i._id}
                            className="whitespace-nowrap px-4 py-4"
                          >
                            <div>
                              <button
                                style={{
                                  backgroundColor: "#FFA836",
                                  padding: "10px",
                                  borderRadius: "8px",
                                  margin: "2px",
                                }}
                                onClick={() => handleAcceptRequest(i._id)}
                              >
                                Accept
                              </button>
                              <button
                                style={{
                                  backgroundColor: "#FFA836",
                                  padding: "10px",
                                  borderRadius: "8px",
                                }}
                                onClick={() => handleDeclineRequest(i._id)}
                              >
                                Decline
                              </button>
                            </div>
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
      <ItemEditPopup
        openPopup2={openPopup2}
        setOpenPopup2={setOpenPopup2}
        selectedItemId={selectedItemId}
      ></ItemEditPopup>
    </div>
  );
};

export default RequestFromUsers;
