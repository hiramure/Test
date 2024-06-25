import { useEffect, useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { grey } from "@mui/material/colors";
import getUsers from "../../hooks/usefetchdata";
import { BASE_URL, token } from "../../config";
import UserActions from "./UserActions";
import axios from "axios";
import { toast } from "react-toastify";
import AddAdmin from "./AddAdmin";

const AdminData = () => {
  const { data: userData, loading, error } = getUsers(`${BASE_URL}/admin`);
  //console.log(userData);
  const [openUserPopup, setOpenUserPopup] = useState(false);
  const [rows, setRows] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    role: "",
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
    });
  }, []);

  const [pageSize, setPageSize] = useState(5);

  const columns = useMemo(
    () => [
      { field: "", headerName: " ", width: 50 },
      { field: "firstName", headerName: "First Name", width: 225 },
      { field: "lastName", headerName: "Last Name", width: 225 },
      { field: "email", headerName: "Email", width: 225 },
      { field: "username", headerName: "Username", width: 225 },
      { field: "phone", headerName: "Phone Number", width: 225 },
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
      await axios.delete(`${BASE_URL}/admin/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRows(userData.filter((_, getRowId) => getRowId !== id));
      toast.success("Successfully deleted");
    } catch (error) {
      console.error("Error in deleting Admin : ", error);
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
            + New Admin
          </button>
          <AddAdmin
            openPopup={openUserPopup}
            setOpenPopup={setOpenUserPopup}
          ></AddAdmin>
        </div>
        <Typography
          variant="h3"
          component="h3"
          sx={{ textAlign: "center", mt: 3, mb: 3 }}
        >
          Admins Data Sheet
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

export default AdminData;
