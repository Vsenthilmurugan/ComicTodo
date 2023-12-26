import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  DeleteOutlineRounded,
  EditOutlined,
} from "@mui/icons-material";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import { DataTypes } from "@/app/common/types";

function createData(TodoContent: string, Edit: any, Delete: any) {
  return { TodoContent, Edit, Delete };
}

const rows = [
  createData("Frozen yoghurt", <EditOutlined />, <DeleteOutlineRounded />),
  createData("Ice cream sandwich", <EditOutlined />, <DeleteOutlineRounded />),
  createData("Eclair", <EditOutlined />, <DeleteOutlineRounded />),
  createData("Cupcake", <EditOutlined />, <DeleteOutlineRounded />),
  createData("Gingerbread", <EditOutlined />, <DeleteOutlineRounded />),
  createData("Gingerbread", <EditOutlined />, <DeleteOutlineRounded />),
  createData("Gingerbread", <EditOutlined />, <DeleteOutlineRounded />),
];

const AvailableList = (props: DataTypes.ListType) => {
  return (
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
            {rows.map((row) => (
              <TableRow
                key={row.TodoContent}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell colSpan={5} component="th" scope="row">
                  {row.TodoContent}
                </TableCell>
                <TableCell className="cursor-pointer" align="right">{row.Edit}</TableCell>
                <TableCell className="cursor-pointer" align="right">{row.Delete}</TableCell>
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
            {rows.map((row) => (
              <TableRow
                key={row.TodoContent}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell colSpan={5} component="th" scope="row">
                  {row.TodoContent}
                </TableCell>
                <TableCell align="center" className="cursor-pointer">{<DoneAllIcon/>}</TableCell>
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
            {rows.map((row) => (
              <TableRow
                key={row.TodoContent}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell colSpan={5} component="th" scope="row">
                  {row.TodoContent}
                </TableCell>
                <TableCell align="center">Completed &nbsp; &nbsp;<EmojiEmotionsOutlinedIcon color="secondary"/></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

export default AvailableList;
