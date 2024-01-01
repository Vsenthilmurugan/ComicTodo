import React, { Fragment, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DataTypes } from "@/app/common/types";
import { TextField } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useSelector } from "react-redux";

const ConfirmationDialog = (props: DataTypes.modalProps) => {
  const themeState: DataTypes.ThemeProps = useSelector(
    (state: any) => state.theme
  );
  const [createTodoData, setCreateTodo] = useState<string>("");
  const bg = themeState.theme_background;

  useEffect(() => {
    if (props.open == true) {
      setCreateTodo(props.modalData.value);
    }
  }, [props.open]);
  return (
    <Fragment>
      <Dialog
        maxWidth="xs"
        fullWidth={true}
        open={props.open}
        onClose={props.close}
      >
        <DialogTitle
          className={bg + " text-center text-white"}
          id="alert-dialog-title"
        >
          {props.modalData.modalType == "delete" && <p>Delete Confirmation</p>}
          {props.modalData.modalType == "edit" && <p>Update Todo Item</p>}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.modalData.modalType == "delete" && (
              <p className="mt-10">
                Are You Sure You Want to Delete this Item?
              </p>
            )}
            {props.modalData.modalType == "edit" && (
              <div className="my-10">
                <TextField
                  fullWidth
                  multiline
                  id="outlined-basic"
                  variant="outlined"
                  value={createTodoData}
                  onChange={(e: any) => {
                    setCreateTodo(e.target.value);
                  }}
                />
                <div className="mt-5 text-center w-full">
                  <Button
                    style={{ background: themeState.button_bg }}
                    disabled={createTodoData == "" ? true : false}
                    variant="contained"
                    endIcon={<AddBoxIcon />}
                    onClick={() => {
                      props.modalData.handler(
                        "description",
                        createTodoData,
                        props.modalData.id
                      );
                      setCreateTodo("");
                    }}
                  >
                    <p className="">Update</p>
                  </Button>
                </div>
              </div>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.close}>
            {props.modalData.modalType == "edit" ? "close" : "No"}
          </Button>
          {props.modalData.modalType == "delete" && (
            <Button
              onClick={() => {
                props.handler(props.modalData.id);
                props.close();
              }}
              autoFocus
            >
              Yes
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default ConfirmationDialog;
