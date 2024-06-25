import React, { useMemo, useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { grey } from "@mui/material/colors";
import getUsers from "../../hooks/usefetchdata";
import { BASE_URL, token } from "../../config";
import UserActions from "./UserActions";
import AddStudent from "./AddStudent";
import axios from "axios";
import { toast } from "react-toastify";

const StudentData = () => {
  const { data: userData, loading, error } = getUsers(`${BASE_URL}/student`);
  const [pageSize, setPageSize] = useState(5);
  const [openUserPopup, setOpenUserPopup] = useState(false);
  const [rows, setRows] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    regNo: "",
    role: "",
    batch: "",
  });

  useEffect(() => {
    setRows({
      _id: userData._id,
      firstName: userData.firstName,
      lastName: userData.lastName,
      username: userData.username,
      email: userData.email,
      role: userData.role,
      regNo: userData.regNo,
      batch: userData.batch,
    });
  }, [userData]);
  const columns = useMemo(
    () => [
      { field: "", headerName: " ", width: 50 },
      { field: "regNo", headerName: "Registration No.", width: 200 },
      { field: "firstName", headerName: "First Name", width: 200 },
      { field: "lastName", headerName: "Last Name", width: 200 },
      { field: "email", headerName: "Email", width: 200 },
      { field: "username", headerName: "Username", width: 200 },
      { field: "batch", headerName: "Batch", width: 100 },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        width: 200,
        renderCell: (params) => (
          <UserActions {...{ params, handleDeleteRow }} />
        ),
      },
    ],
    []
  );

  const handleDeleteRow = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/student/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRows(userData.filter((_, getRowId) => getRowId !== id));
      toast.success("Successfully deleted");
    } catch (error) {
      console.error("Error in deleting Lab Instructor : ", error);
      toast.error(error);
    }
  };

  return (
    <section>
      <Box sx={{ height: 800, width: "100%" }}>
        <div>
          <button
            onClick={() => setOpenUserPopup(true)}
            className="bg-transparent hover:bg-white hover:text-yellowColor text-black font-bold py-2 px-4 rounded mr-4"
          >
            + New Student
          </button>
          <AddStudent
            openPopup={openUserPopup}
            setOpenPopup={setOpenUserPopup}
          ></AddStudent>
        </div>
        <Typography
          variant="h3"
          component="h3"
          sx={{ textAlign: "center", mt: 3, mb: 3 }}
        >
          Students Data Sheet
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

export default StudentData;
