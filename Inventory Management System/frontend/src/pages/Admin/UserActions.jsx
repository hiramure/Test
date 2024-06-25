import React, { useState } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import EditAdminPopup from "./EditAdminPopup";
import EditLabInsPopup from "./EditLabInsPopup";
import EditStudentPopup from "./EditStudentPopup";
import EditTOPopup from "./EditTOPopup";

const UserActions = ({ params, handleDeleteRow }) => {
  const [openUserPopup, setOpenUserPopup] = useState(false);

  const handleDelete = () => {
    handleDeleteRow(params.row._id);
  };

  return (
    <Box>
      <Tooltip title="Edit user">
        <IconButton onClick={() => setOpenUserPopup(true)}>
          <Edit />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete user">
        <IconButton onClick={handleDelete}>
          <Delete />
        </IconButton>
      </Tooltip>
      {openUserPopup && params.row.role === "admin" && (
        <EditAdminPopup
          openPopup={openUserPopup}
          setOpenPopup={setOpenUserPopup}
          user={params.row}
        />
      )}
      {openUserPopup && params.row.role === "labInstructor" && (
        <EditLabInsPopup
          openPopup={openUserPopup}
          setOpenPopup={setOpenUserPopup}
          user={params.row}
        />
      )}
      {openUserPopup && params.row.role === "student" && (
        <EditStudentPopup
          openPopup={openUserPopup}
          setOpenPopup={setOpenUserPopup}
          user={params.row}
        />
      )}
      {openUserPopup && params.row.role === "techOfficer" && (
        <EditTOPopup
          openPopup={openUserPopup}
          setOpenPopup={setOpenUserPopup}
          user={params.row}
        />
      )}
    </Box>
  );
};

export default UserActions;
