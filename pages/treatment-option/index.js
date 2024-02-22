import React from "react";
import { Button, Divider, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { FIRST_PATH } from "../../constants/Constant";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Card from "@mui/material/Card";
import Link from "next/link";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { supabase } from "../api/supabase";
import { useRouter } from "next/router";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useEffect } from "react";

export default function TreatmentOption() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [treatmentOption, setTreatmentOption] = React.useState();
  const [id, setId] = React.useState();
  const [editValue, setEditValue] = React.useState();
  const router = useRouter();

  useEffect(() => {
    getTreatmentOption();
  }, []);

  const getTreatmentOption = () => {
    supabase
      .from("treatment_option")
      .select()
      .order("id", { ascending: false })
      .then((response) => {
        setTreatmentOption(response?.data);
      });
  };

  const open = Boolean(anchorEl);
  const handleClick = (event, x) => {
    setEditValue(x);
    setId(x?.id);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = () => {
    supabase
      .from("treatment_option")
      .delete()
      .eq("id", id)
      .then(() => getTreatmentOption());
    setAnchorEl(null);
  };
  const handleEdit = () => {
    router.push(`/treatment-option/edit-treatment-option/${id}`);
  };
  return (
    <Grid display={"flex"} container direction={"column"} gap={2} mb={2}>
      <Grid display={"flex"} direction={"column"} gap={1}>
        <Grid
          paddingTop={2}
          paddingRight={3}
          display={"flex"}
          justifyContent={"end"}
        >
          <Link href={"/treatment-option/add-treatment-option"}>
            <Button
              color="primary"
              sx={{
                color: "#fff",
                background: "#212b36",
                textTransform: "capitalize",
                "&:hover": {
                  background: "#212b36",
                },
              }}
              startIcon={<AddIcon />}
            >
              Add Treatment Option
            </Button>
          </Link>
        </Grid>
        <Grid>
          <Divider />
        </Grid>
      </Grid>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>

      <Grid
        display={"flex"}
        px={{ xl: 40, lg: 20, md: 12, sm: 10 }}
        direction={"column"}
        alignItems={"center"}
        gap={4}
      >
        {treatmentOption?.map((x) => {
          const textDescription = x.items.find((x) => x.type === "text");

          return (
            <Card
              key={x}
              sx={{
                width: "100%",
                boxShadow: "0px 0px 24px rgba(0, 0, 0, 0.7",
                padding: 2,
              }}
            >
              <CardHeader
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon onClick={(event) => handleClick(event, x)} />
                  </IconButton>
                }
                sx={{
                  color: "#666666",
                  "& .MuiTypography-root": {
                    fontWeight: 600,
                  },
                }}
                title={x?.title}
              />

              <CardContent>
                <Typography variant="body1" color={"#333333"}>
                  {textDescription?.value ?? ""}
                </Typography>
                <img
                  loading="lazy"
                  src={`${FIRST_PATH}${x.headerFile}`}
                  alt="iamge"
                  height={400}
                  width={"100%"}
                ></img>
              </CardContent>
            </Card>
          );
        })}
      </Grid>
    </Grid>
  );
}
