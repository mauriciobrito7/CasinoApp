import React, { useContext } from "react";
import { DataGrid } from "@material-ui/data-grid";
import UserContext from "../../context/User/UserContext";
import "./Table.scss";

const columns = [
  { field: "id", headerName: "ID", width: 400 },
  { field: "slots", headerName: "First name", width: 150 },
  { field: "time", headerName: "Last name", width: 400 },
];

export default function Table() {
  const { user } = useContext(UserContext);

  return (
    <div className="table" style={{ height: 400, width: "100%" }}>
      {user ? (
        <DataGrid
          rows={user.slotsMachineRecords}
          columns={columns}
          pageSize={5}
        />
      ) : (
        <h2 className="message">any results yet, try to login</h2>
      )}
    </div>
  );
}
