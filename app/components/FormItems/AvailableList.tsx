import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DeleteOutlineRounded, EditOutlined } from "@mui/icons-material";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import { DataTypes } from "@/app/common/types";
import Image from "next/image";
import ConfirmationDialog from "./ConfirmationDialog";
import { intialData } from "@/app/common/intialData";

const AvailableList = (props: DataTypes.ListType) => {
  const [confirmDialog, setConfirmDialog] = useState<boolean>(false);
  const [todoModalContent, setTodoModalContent] =
    useState<DataTypes.modalContentProps>(intialData.modalContent);
  return (
    <div>
      {props.data != undefined && props.data.length != 0 ? (
        <TableContainer
          component={Paper}
          className="h-[350px] lg:h-[300px] xl:h-[300px] overflow-scroll w-full"
          style={{ background: "transparent" }}
        >
          {props.categoryName == "available" && (
            <Table stickyHeader aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell colSpan={5}>
                    <strong>TodoContent</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Edit</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Delete</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.data.map((row: DataTypes.todoProps) => (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell colSpan={5} component="th" scope="row">
                      {row.description}
                    </TableCell>
                    <TableCell
                      className="cursor-pointer"
                      align="right"
                      onClick={() => {
                        setConfirmDialog(true);
                        setTodoModalContent({
                          id: row._id,
                          modalType: "edit",
                          value: row.description,
                          handler: props.updateHandler,
                        });
                      }}
                    >
                      <EditOutlined />
                    </TableCell>
                    <TableCell
                      className="cursor-pointer"
                      align="right"
                      onClick={() => {
                        setConfirmDialog(true);
                        setTodoModalContent({
                          modalType: "delete",
                          handler: props.deleteHandler,
                          value:"",
                          id:row._id
                        });
                      }}
                    >
                      <DeleteOutlineRounded />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          {props.categoryName == "inprogress" && (
            <Table stickyHeader aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell colSpan={5}>
                    <strong>TodoContent</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Mark Complete</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.data.map((row: DataTypes.todoProps) => (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell colSpan={5} component="th" scope="row">
                      {row.description}
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        props.updateHandler("status", "completed", row._id);
                      }}
                      align="center"
                      className="cursor-pointer"
                    >
                      {<DoneAllIcon />}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          {props.categoryName == "completed" && (
            <Table stickyHeader aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell colSpan={5}>
                    <strong>TodoContent</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Status</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.data.map((row: DataTypes.todoProps) => (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell colSpan={5} component="th" scope="row">
                      {row.description}
                    </TableCell>
                    <TableCell align="center">
                      Completed &nbsp; &nbsp;
                      <EmojiEmotionsOutlinedIcon color="secondary" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      ) : (
        <div className="flex justify-center">
          <Image src={"/no_data.gif"} alt="No Data" height={400} width={400} />
        </div>
      )}
      <ConfirmationDialog
        open={confirmDialog}
        close={() => {
          setConfirmDialog(false);
        }}
        handler={props.deleteHandler}
        modalData={todoModalContent}
      />
    </div>
  );
};

export default AvailableList;
