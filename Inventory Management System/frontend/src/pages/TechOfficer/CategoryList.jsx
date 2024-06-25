import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import CategoryForm from "../../components/CategoryForm/CategoryForm.jsx";
import { TiTrash } from "react-icons/ti";
import { MdEdit } from "react-icons/md";
import { MdOutlineReadMore } from "react-icons/md";
import CategoryEditPopup from "./CategoryEditPopup.jsx";
import { BASE_URL } from "../../config.js";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${BASE_URL}/category/`, { name });

      setName("");
      getAllCategory();
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/category/categories`);
      setCategories(data);
    } catch (error) {
      console.log(error);
      //toast.error("Something wwent wrong in getting catgeory");
    }
  };

  const handleDelete = async (pId) => {
    try {
      const confirm = window.confirm("Want to delete?");
      if (confirm) {
        const { data } = await axios.delete(`${BASE_URL}/category/${pId}/`);
        getAllCategory(data);
        // if (data.success) {
        //   // toast.success(`category is deleted`);

        //   getAllCategory(data);
        // } else {
        //   // toast.error(data.message);
        // }
      }
    } catch (error) {
      // toast.error("Somtihing went wrong");
    }
  };

  const handleEdit = (id) => {
    setSelectedCategory(id);
    setOpenPopup(true);
  };

  useEffect(() => {
    getAllCategory();
    //handleDelete();
  }, [categories]);

  return (
    <div className="ml-[10rem] flex flex-col md:flex-row">
      <div className="md:w-3/4 p-3">
        {" "}
        <div className="h-15">Manage Categories</div>
        <CategoryForm
          handleSubmit={handleSubmit}
          value={name}
          setValue={setName}
        />
        <br />
        <hr />
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium light:border-neutral-300"></thead>
                  <tbody>
                    {categories?.map((c) => (
                      <tr className="border-b transition duration-300 ease-in-out hover:bg-orange-100 light:border-neutral-500 light:hover:bg-orange-600">
                        <td
                          key={c._id}
                          className="whitespace-nowrap px-6 py-4 "
                        >
                          {c.name}
                        </td>

                        <td style={{ display: "flex", alignItems: "center" }}>
                          <TiTrash
                            onClick={() => {
                              handleDelete(c._id);
                            }}
                            style={{
                              fontSize: "24px",
                              marginRight: "25px",
                              color: "brown",
                              marginTop: "10px",
                            }}
                            onMouseEnter={(e) =>
                              (e.target.style.color = "black")
                            }
                            onMouseLeave={(e) =>
                              (e.target.style.color = "brown")
                            }
                          />
                          <MdEdit
                            type="button"
                            style={{
                              color: "brown",
                              fontSize: "18px",
                              marginTop: "10px",
                            }}
                            onMouseEnter={(e) =>
                              (e.target.style.color = "black")
                            }
                            onMouseLeave={(e) =>
                              (e.target.style.color = "brown")
                            }
                            onClick={() => handleEdit(c._id)}
                          />
                          <Link to={`/to/item/category/${c._id}`}>
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
      <CategoryEditPopup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        selectedCategory={selectedCategory}
      ></CategoryEditPopup>
    </div>
  );
};

export default CategoryList;
