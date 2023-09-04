import { Grid, Button, Divider } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { supabase } from "../api/supabase";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export const getServerSideProps = async () => {
  const res = await supabase
    .from("contact")
    .select()
    .order("id", { ascending: false });

  console.log("res", res.data);
  const enquiry = res.data;

  return { props: { enquiry } };
};

export default function Enquiry({ enquiry }) {
  const handleDelete = (id) => {
    supabase
      .from("contact")
      .delete()
      .eq("id", id)
      .then(() => getEnquiry());
  };

  return (
    <Grid px={{ xl: 30, lg: 20, md: 12, sm: 10 }}>
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#666666" }}>
                <b>Name</b>
              </TableCell>
              <TableCell sx={{ color: "#666666" }}>
                <b>Email</b>
              </TableCell>
              <TableCell sx={{ color: "#666666" }}>
                <b>Phone</b>
              </TableCell>
              <TableCell sx={{ color: "#666666" }}>
                <b>Enquiry</b>
              </TableCell>
              <TableCell sx={{ color: "#666666" }}>
                <b>Delete</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {enquiry?.map((x) => (
              <TableRow
                key={x}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {x.name}
                </TableCell>
                <TableCell>{x.email}</TableCell>
                <TableCell>{x.phone}</TableCell>
                <TableCell>{x.enquiry}</TableCell>
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
