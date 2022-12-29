import { AddOutlined } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { JournalLayout } from "../layout/JournalLayout";
import { NoteView, NothingSelectedView } from "../view";

export const JournalPage = () => {
  return (
    <JournalLayout>
      {/* <Typography>Sunt dolore anim consectetur labore fugiat labore. Consectetur nulla ullamco non veniam consequat velit fugiat ad occaecat nulla irure sint officia dolore. Lorem fugiat dolore officia sit sunt in Lorem et irure consectetur deserunt magna incididunt.</Typography> */}
      {/* NothinSelected */}
      {/* <NothingSelectedView /> */}
      {/* NoteView */}
      <NoteView />
      <IconButton
        size="large"
        sx={{
          color: "white",
          backgroundColor: "error.main",
          ":hover": { backgroundColor: "error.main", opacity: 0.9 },
          position: "fixed",
          right: 50,
          bottom: 50,
        }}
      >
        <AddOutlined sx={{fontSize: 30}}/>
      </IconButton>
    </JournalLayout>
  );
};
