import { Typography, Box, Divider, Stack, List, ListItem, ListItemText, Button, Avatar } from "@mui/material";
import { GetCurrentUser } from "@/hooks/users/useUsers";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next"; 

const Profile = () => {
  const { t } = useTranslation(); 
  const { data: currentUser } = GetCurrentUser();
  const navigate = useNavigate();

  const handleEditProfile = () => {
    if (currentUser) {
      navigate(`/users/${currentUser?.UserID}?profileMode=true`);
    }
  };

  // Optional: Remove or keep for debugging
  useEffect(() => {
    console.log('current', currentUser);
  }, [currentUser]);

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
          {currentUser?.name?.charAt(0).toUpperCase() || t("common.userInitial")}
        </Avatar>
        <Box>
          <Typography variant="h5" fontWeight="bold">
            {currentUser?.name || t("common.unknownUser")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {currentUser?.email || "—"}
          </Typography>
        </Box>
      </Stack>

      <Divider />

      {/* User Details */}
      <List sx={{ mt: 1 }}>
        <ListItem>
          <ListItemText primary={t("profile.fields.name")} secondary={currentUser?.name || "—"} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary={t("profile.fields.email")} secondary={currentUser?.email || "—"} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary={t("profile.fields.phone")} secondary={currentUser?.phone || "—"} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary={t("profile.fields.userType")} secondary={currentUser?.userType || "—"} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary={t("profile.fields.createdAt")}
            secondary={currentUser?.created_at ? currentUser.created_at.split('T')[0] : "—"}
          />
        </ListItem>
      </List>

      {/* Edit Button */}
      <Stack mt={4} direction="row" justifyContent="flex-end">
        <Button
          variant="contained"
          color="primary"
          onClick={handleEditProfile}
          sx={{ textTransform: "none", color: 'white', borderRadius: 2, px: 4, py: 1.2 }}
        >
          {t("profile.editButton")}
        </Button>
      </Stack>
    </Box>
  );
};

export default Profile;