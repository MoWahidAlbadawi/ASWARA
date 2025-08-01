import { Typography, Box, Divider, Stack, List, ListItem, ListItemText, Button, Avatar } from "@mui/material";
import { GetCurrentUser } from "@/hooks/users/useUsers";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { data: currentUser } = GetCurrentUser();
  const navigate = useNavigate();

  const handleEditProfile = () => {
    if(currentUser) {
    navigate(`/aswaraDashboard/users/${currentUser.id}`);
  }
  }
  return (
    <Box   
      sx={{
        p: 3,
        maxWidth: 900,
        border: "1px solid #ddd",
        borderRadius: 3,
        bgcolor: "white",
        boxShadow: 2,
      }}
    >
      
      <Stack direction="row" alignItems="center" spacing={2} mb={3}>
        <Avatar
          sx={{ width: 70, height: 70, bgcolor: "primary.main", fontSize: 24 }}
        >
          {currentUser?.name?.charAt(0).toUpperCase() || "U"}
        </Avatar>
        <Box>
          <Typography variant="h5" fontWeight="bold">
            {currentUser?.name || "User"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {currentUser?.email}
          </Typography>
        </Box>
      </Stack>

      <Divider />

      {/* user details */}
      <List sx={{ mt: 1 }}>
        <ListItem>
          <ListItemText primary="Name" secondary={currentUser?.name || "—"} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="Email" secondary={currentUser?.email || "—"} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="Phone" secondary={currentUser?.phone || "—"} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="User Type" secondary={currentUser?.userType || "—"} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="Created at" secondary={currentUser?.created_at || "—"} />
        </ListItem>
      </List>

      {/* edit */}
      <Stack mt={4} direction="row" justifyContent="flex-end">
        <Button
          variant="contained"
          color="primary"
          onClick={handleEditProfile}
          sx={{ textTransform: "none", color : 'white' , borderRadius: 2, px: 4, py: 1.2 }}
        >
          Edit Profile
        </Button>
      </Stack>
    </Box>
  );
};

export default Profile;
