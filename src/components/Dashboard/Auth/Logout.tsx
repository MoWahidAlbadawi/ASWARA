import { useNavigate } from "react-router-dom";
import Cookie from 'cookie-universal'
import { COOKIE_NAME } from "@/services/endpoints";
import { AiOutlineLogout } from "react-icons/ai";
import React , { useState } from "react"
import api from "@/services/axios";
import { LOGOUT } from "@/services/endpoints";
import { IoWarningOutline } from "react-icons/io5";
import {
  Box,
  Icon,
  Typography,
  Button,
  Slide,
  Dialog,
  DialogActions,
  CircularProgress
} from "@mui/material"
// for transition dialog
import type { TransitionProps } from "@mui/material/transitions";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  onCloseDialog? : () => void,
}

const Logout = ({ onCloseDialog } : Props) => {
    const { t } = useTranslation();
    const [open, setOpen] = useState<boolean>(false);
    const [isLoading , setIsLoading] = useState<boolean>(false);

    const navigate = useNavigate(); 
    const cookies = Cookie();
    
    async function logout () {
      try {
        setIsLoading(true);
        await api.post(`${LOGOUT}`).then(() => toast.success(t('logout.successMessage')));
        cookies.remove(COOKIE_NAME);
        setOpen(false);
    if(onCloseDialog) {
      onCloseDialog();
      }
    } catch (err) {
      console.log('error on logout',err);
      toast.error(t('logout.errorMessage'));
    } finally {
      setIsLoading(false);
        navigate('/login');
    }
    }

    function openDialog () {
      setOpen(true);
    }
    function closeDialog () {
      setOpen(false);
      if(onCloseDialog) {
      onCloseDialog();
      }
    }
    return <Box>
    <Button onClick={openDialog} color="error" sx={{textTransform : 'capitalize' , display : 'flex' , gap : '5px'}}>
        <Icon><AiOutlineLogout /></Icon>
        <Typography>{t('logout.title')}</Typography>
    </Button>
      {/* delete confirmation dialog */}
      <Box>
        <Dialog
          open={open}
          slots={{
            transition: Transition,
          }}
          keepMounted
          onClose={closeDialog}
          aria-describedby="alert-dialog-slide-description"
         PaperProps={{
              sx: {
                py : 1,
                px : 2,
                borderRadius: 3,
                 width : '80%',
              },
            }}
        >
          <Box className="text-center text-gray-700">
            <Icon sx={{ fontSize: "8rem" }} color="error">
              <IoWarningOutline />
            </Icon>
            <Typography>
              {t('logout.confirmationMessage')}
            </Typography>
            </Box>
          <DialogActions>
            <Button
              onClick={closeDialog}
              sx={{ textTransform: "capitalize" }}
              variant="outlined"
            >
              {t('common.cancel')}
            </Button>
            <Button
              onClick={logout}
              color="error"
              sx={{ textTransform: "capitalize" }}
              variant="contained"
            >
              {isLoading ?  <CircularProgress  size={24} /> : t('logout.title')}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      </Box>
}
export default Logout;