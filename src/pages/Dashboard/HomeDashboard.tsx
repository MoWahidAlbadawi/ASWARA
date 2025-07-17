import { Box, Typography, Icon } from "@mui/material";
import { MdDashboard } from "react-icons/md";

const HomeDashboard = () => {
  return (
    <Box>
      {/* header */}
      <Box className="!mb-6">
        <Typography color="secondary" variant="h6">
          <Icon className="!pt-1">
            <MdDashboard />
          </Icon>{" "}
          Home page
        </Typography>
      </Box>
      {/* content */}
    </Box>
  );
};

export default HomeDashboard;
