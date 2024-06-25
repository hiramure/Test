// TOData.jsx

import React, { useEffect, useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { grey } from "@mui/material/colors";
import getUsers from "../../hooks/usefetchdata";
import { BASE_URL, token } from "../../config";
import UserActions from "./UserActions";
import AddTO from "./AddTO";
import axios from "axios";
import { toast } from "react-toastify";

const TOData = () => {
  const {
    data: userData,
    loading,
    error,
  } = getUsers(`${BASE_URL}/techOfficer`);
  const [openUserPopup, setOpenUserPopup] = useState(false);
  const [rows, setRows] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    role: "",
    lab: "",
  });

  useEffect(() => {
    setRows({
      _id: userData._id,
      firstName: userData.firstName,
      lastName: userData.lastName,
      username: userData.username,
      email: userData.email,
      role: userData.role,
      phone: userData.phone,
      lab: userData.lab,
    });
  }, [userData]);

  const [pageSize, setPageSize] = useState(5);

  const columns = useMemo(
    () => [
      { field: "", headerName: " ", width: 50 },
      { field: "firstName", headerName: "First Name", width: 200 },
      { field: "lastName", headerName: "Last Name", width: 200 },
      { field: "email", headerName: "Email", width: 200 },
      { field: "username", headerName: "Username", width: 200 },
      { field: "phone", headerName: "Phone Number", width: 200 },
      { field: "lab", headerName: "Laboratory", width: 200 },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        width: 150,
        renderCell: (params) => (
          <UserActions {...{ params, handleDeleteRow }} />
        ),
      },
    ],
    []
  );
  const handleDeleteRow = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/techOfficer/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRows(userData.filter((_, getRowId) => getRowId !== id));
      toast.success("Successfully deleted");
    } catch (error) {
      console.error("Error in deleting student : ", error);
      toast.error(error);
    }
  };

  return (
    <section>
      <Box sx={{ height: 600, width: "100%" }}>
        <div>
          <button
            onClick={() => setOpenUserPopup(true)}
            className="bg-transparent hover:bg-white hover:text-yellowColor text-black font-bold py-2 px-4 rounded mr-4"
          >
            + New Technical Officer
          </button>
          <AddTO
            openPopup={openUserPopup}
            setOpenPopup={setOpenUserPopup}
          ></AddTO>
        </div>
        <Typography
          variant="h3"
          component="h3"
          sx={{ textAlign: "center", mt: 3, mb: 3 }}
        >
          Technical Officer Data Sheet
        </Typography>
        <DataGrid
          columns={columns}
          rows={userData}
          getRowId={(row) => row._id}
          rowsPerPageOptions={[5, 10, 20]}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          getRowSpacing={(params) => ({
            top: params.isFirstVisible ? 0 : 5,
            bottom: params.isLastVisible ? 0 : 5,
          })}
          sx={{
            [`& .${gridClasses.row}`]: {
              bgcolor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[200]
                  : theme.palette.grey[900],
            },
          }}
        />
      </Box>
    </section>
  );
};

export default TOData;
