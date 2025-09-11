import React, { useState } from "react";
import { Link } from "react-router-dom";
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
import { FaRegEdit } from "react-icons/fa";
import { IoWarningOutline } from "react-icons/io5";
import { RiDeleteBin5Fill } from "react-icons/ri";
import classes from "./dataTable.module.css";
import type { TransitionProps } from "@mui/material/transitions";
import { useTranslation } from "react-i18next"; // 👈 Added

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
  startIndex: number;
  onDeleteItem?: (itemId: number) => void;
  customColumns?: {
    [key: string]: (item: any) => React.ReactNode;
  };
  showActions: boolean;
}

const DataTable = ({
  table,
  headers,
  isLoading,
  isError,
  data,
  startIndex,
  onDeleteItem,
  customColumns,
  showActions,
}: Props) => {
  const { t } = useTranslation(); // 👈 Initialize translation
  const [open, setOpen] = useState<boolean>(false);
  const [deleteElementId, setDeleteElementId] = useState<number>(0);

  function handleClickOpen(id: number) {
    setOpen(true);
    setDeleteElementId(id);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleDeleteItem() {
    if (onDeleteItem) {
      onDeleteItem(deleteElementId);
      handleClose();
    }
  }

  return (
    <Box>
      {/* Table */}
      <Box sx={{ overflowX: "auto" }} className="rounded-md shadow-md">
        <table className={classes["dashboard-table"]}>
          <thead>
            <tr className={classes["dashboard-table-tr-head"]}>
              <th className={classes["dashboard-table-th"]}>{t("common.number")}</th>
              {headers.map((head) => (
                <th key={head.key} className={classes["dashboard-table-th"]}>
                  {head.title}
                </th>
              ))}
              {showActions && <th className={classes["dashboard-table-th"]}>{t("common.actions")}</th>}
            </tr>
          </thead>
          <tbody>
            {/* Loading */}
            {isLoading && (
              <tr>
                <td
                  className={classes["dashboard-table-td"]}
                  colSpan={headers.length + 2}
                >
                  {t("common.loading")}
                </td>
              </tr>
            )}

            {/* Error */}
            {isError && (
              <tr>
                <td
                  className={classes["dashboard-table-td"]}
                  colSpan={headers.length + 2}
                >
                  {t("common.errorTryAgain")}
                </td>
              </tr>
            )}

            {/* No Data */}
            {!isLoading && !isError && data.length === 0 && (
              <tr>
                <td
                  className={classes["dashboard-table-td"]}
                  colSpan={headers.length + 2}
                >
                  {t("common.noDataFound")}
                </td>
              </tr>
            )}

            {/* Rows */}
            {!isLoading && !isError && data &&
              data.map((item: any, index: number) => (
                <tr key={index} className={classes["dashboard-table-tr"]}>
                  <td className={classes["dashboard-table-td"]}>
                    {startIndex + index + 1}
                  </td>
                  {headers.map((head, i) => (
                    <td key={i} className={classes["dashboard-table-td"]}>
                      {customColumns && customColumns[head.key]
                        ? customColumns[head.key](item)
                        : item[head.key]}
                    </td>
                  ))}
                  {showActions && (
                    <td>
                      <Box className="flex justify-center">
                        <IconButton color="secondary">
                          <Link to={table == 'users' ? `/${table}/${item.id}?profileMode=false` : `/${table}/${item.id}`}>
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
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </Box>

      {/* Delete Confirmation Dialog */}
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
            py: 1,
            px: 2,
            borderRadius: 3,
            width: '80%',
          },
        }}
      >
        <Box className="text-center text-gray-700">
          <Icon sx={{ fontSize: "8rem" }} color="error">
            <IoWarningOutline />
          </Icon>
          <Typography variant="h6" className="!my-3">
            {t("dataTable.confirmDeleteTitle")}
          </Typography>
          <Typography variant="body1" className="!mb-4">
            {t("dataTable.confirmDeleteMessage")}
          </Typography>
        </Box>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{ textTransform: "capitalize" }}
            variant="outlined"
          >
            {t("common.cancel")}
          </Button>
          <Button
            onClick={handleDeleteItem}
            color="error"
            sx={{ textTransform: "capitalize" }}
            variant="contained"
          >
            {t("common.delete")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DataTable;