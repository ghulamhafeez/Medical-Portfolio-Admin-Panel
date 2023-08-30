import { Grid, Button, Divider } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { supabase } from "./api/supabase";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FIRST_PATH } from "../constants/Constant";
export default function SecuredReferral() {
  const [securedData, setSecuredData] = useState();

  useEffect(() => {
    getSecuredData();
  }, []);

  const getSecuredData = () => {
    supabase
      .from("secured_referral")
      .select()
      .order("id", { ascending: false })
      .then((response) => {
        console.log("response123", response.data);
        setSecuredData(response?.data);
      });
  };

  const handleDelete = (id) => {
    console.log("del", id);
    supabase
      .from("secured_referral")
      .delete()
      .eq("id", id)
      .then(() => {
        getSecuredData();
      });
  };

  return (
    <Grid px={{ lg: 20, md: 12, sm: 10 }}>
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#666666", minWidth: 70 }}>
                <b>First Name</b>
              </TableCell>
              <TableCell sx={{ color: "#666666" }}>
                <b>Sur Name</b>
              </TableCell>
              <TableCell sx={{ color: "#666666" }}>
                <b>Email</b>
              </TableCell>
              <TableCell sx={{ color: "#666666" }}>
                <b>Day Phone</b>
              </TableCell>

              <TableCell sx={{ color: "#666666" }}>
                <b>Address</b>
              </TableCell>
              <TableCell sx={{ color: "#666666" }}>
                <b>Street Address</b>
              </TableCell>
              <TableCell sx={{ color: "#666666" }}>
                <b>City</b>
              </TableCell>
              <TableCell sx={{ color: "#666666" }}>
                <b>State</b>
              </TableCell>
              <TableCell sx={{ color: "#666666" }}>
                <b>ZipCode</b>
              </TableCell>
              <TableCell sx={{ color: "#666666" }}>
                <b>Guardian Name</b>
              </TableCell>
              <TableCell sx={{ color: "#666666" }}>
                <b>Relation Patient</b>
              </TableCell>
              <TableCell sx={{ color: "#666666" }}>
                <b>Dntist Name</b>
              </TableCell>
              <TableCell sx={{ color: "#666666" }}>
                <b>Dentist Phone</b>
              </TableCell>
              <TableCell sx={{ color: "#666666" }}>
                <b>Notes</b>
              </TableCell>
              <TableCell sx={{ color: "#666666" }}>
                <b>Records File</b>
              </TableCell>
              <TableCell sx={{ color: "#666666" }}>
                <b>Delete</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {securedData?.map((x) => (
              <TableRow
                key={x}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {x.firstName}
                </TableCell>
                <TableCell>{x.surName}</TableCell>
                <TableCell>{x.email}</TableCell>
                <TableCell>{x.dayPhone}</TableCell>
                <TableCell>{x.address}</TableCell>
                <TableCell>{x.streetAddress}</TableCell>
                <TableCell>{x.city}</TableCell>
                <TableCell>{x.state}</TableCell>
                <TableCell>{x.zipCode}</TableCell>
                <TableCell>{x.guardianName}</TableCell>
                <TableCell>{x.relationPatient}</TableCell>
                <TableCell>{x.dentistName}</TableCell>
                <TableCell>{x.dentistPhone}</TableCell>
                <TableCell>{x.notes}</TableCell>
                <TableCell>
                  {" "}
                  <img
                    loading="lazy"
                    src={`${FIRST_PATH}${x.recordsFile}`}
                    alt="iamge"
                    width={50}
                    height={50}
                  ></img>
                </TableCell>

                <TableCell>
                  <DeleteIcon onClick={() => handleDelete(x.id)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}
