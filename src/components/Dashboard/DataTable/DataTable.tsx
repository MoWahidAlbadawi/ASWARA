import React, { useState } from "react"
import { Link } from "react-router-dom";
// components from mui
import {
  Box,
  IconButton,
  Icon,
  Typography,
  Button,
  Slide,
  Dialog,
  DialogActions,
} from "@mui/material";
// action icons
import { FaRegEdit } from "react-icons/fa";
import { IoWarningOutline } from "react-icons/io5";
import { RiDeleteBin5Fill } from "react-icons/ri";
// css
import classes from "./dataTable.module.css";
// no data image
import NoDataImage from "@/assets/no-data.jpg";
// for transition dialog
import type { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  table: string;
  headers: { key: string; title: string }[];
  isLoading: boolean;
  isError: boolean;
  data: any;
  startIndex : number,
  onDeleteItem: (itemId: number) => void;
}

const DataTable = ({
  table,
  headers,
  isLoading,
  isError,
  data,
  startIndex,
  onDeleteItem,
}: Props) => {
  // dialog state
  const [open, setOpen] = useState<boolean>(false);
  const [deleteElementId, setDeleteElementId] = useState<number>(0);

  // dialog handlers
  function handleClickOpen(id: number) {
    setOpen(true);
    setDeleteElementId(id);
  }

  function handleClose() {
    setOpen(false);
  }

  // delete handler
  function handleDeleteItem() {
    onDeleteItem(deleteElementId);
    handleClose();
  }

  return (
    <Box>
      {/* table */}
      <Box sx={{ overflowX: "auto" }} className="rounded-md shadow-md">
        <table className={classes["dashboard-table"]}>
          <thead>
            <tr className={classes["dashboard-table-tr-head"]}>
              <th className={classes["dashboard-table-th"]}>Number</th>
              {headers.map((head) => (
                <th key={head.key} className={classes["dashboard-table-th"]}>
                  {head.title}
                </th>
              ))}
              <th className={classes["dashboard-table-th"]}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* loading */}
            {isLoading && (
              <tr>
                <td
                  className={classes["dashboard-table-td"]}
                  colSpan={headers.length + 2}
                >
                  Loading...
                </td>
              </tr>
            )}

            {/* error */}
            {/* {isError && (
              <tr>
                <td
                  className={classes["dashboard-table-td"]}
                  colSpan={headers.length + 2}
                >
                  Something went wrong, please try again!
                </td>
              </tr>
            )} */}

            {/* no data */}
            {!isLoading && !isError && data.length === 0 && (
              <tr>
                <td
                  className={classes["dashboard-table-td"]}
                  colSpan={headers.length + 2}
                >
                  No data found
                </td>
              </tr>
            )}

            {/* rows */}
            {data &&
              data.map((item: any, index: number) => (
                <tr key={index} className={classes["dashboard-table-tr"]}>
                  <td className={classes["dashboard-table-td"]}>
                    {startIndex + index + 1}
                  </td>
                  {headers.map((head, i) => (
                    <td key={i} className={classes["dashboard-table-td"]}>
                      {head.key === "categoryFile" ? (
                        <div className="flex justify-center">
                          <img
                            src={item[head.key] || NoDataImage}
                            className="w-[100px] h-[100px] rounded-3xl"
                          />
                        </div>
                      ) : head.key === "smithing" ? (
                        `${item[head.key]} %`
                      ) : (
                        item[head.key]
                      )}
                    </td>
                  ))}
                  <td>
                    <Box className="flex justify-center">
                      <IconButton color="secondary">
                        <Link to={`/aswaraDashboard/${table}/${item.id}`}>
                          <FaRegEdit />
                        </Link>
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleClickOpen(item.id)}
                      >
                        <RiDeleteBin5Fill />
                      </IconButton>
                    </Box>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Box>

      {/* delete confirmation dialog */}
      <Box>
        <Dialog
          open={open}
          slots={{
            transition: Transition,
          }}
          keepMounted
          onClose={handleClose}
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
              Are you sure you want to delete this item?
            </Typography>
              This action is permanent and cannot be undone. You will lose
              access to this item forever.
              </Box>
          <DialogActions>
            <Button
              onClick={handleClose}
              sx={{ textTransform: "capitalize" }}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteItem}
              color="error"
              sx={{ textTransform: "capitalize" }}
              variant="contained"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default DataTable;
