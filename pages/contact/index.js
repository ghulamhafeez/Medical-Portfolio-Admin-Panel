import { Grid, Button, Divider } from "@mui/material";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";

export default function Contact() {
  return (
    <Grid>
      <Grid display={"flex"} direction={"column"} gap={1}>
        <Grid
          paddingTop={1}
          paddingRight={3}
          display={"flex"}
          justifyContent={"end"}
        >
          <Link href={"/contact/add-contact"}>
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
              Add contact
            </Button>
          </Link>
        </Grid>
        <Grid>
          <Divider />
        </Grid>
      </Grid>
    </Grid>
  );
}
