import { Grid, Button, Divider } from "@mui/material";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";

export default function CasesGallery() {
  return (
    <Grid>
      <Grid display={"flex"} direction={"column"} gap={1}>
        <Grid
          paddingTop={1}
          paddingRight={3}
          display={"flex"}
          justifyContent={"end"}
        >
          <Link href={"/cases-gallery/add-cases-gallery"}>
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
              Add Cases Gallery
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
