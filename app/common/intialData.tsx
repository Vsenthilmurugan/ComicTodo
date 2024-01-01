import { DataTypes } from "./types";

export namespace intialData {
  export const todoItem: DataTypes.todoProps = {
    _id: "",
    description: "",
    status: "",
    uid: "",
  };
  export const modalContent: DataTypes.modalContentProps = {
    id: "",
    modalType: "",
    value: "",
    handler: "",
  };
  export const userContent: DataTypes.userProps = {
    _id: "",
    name: "",
    email: "",
    password: "",
    theme: "",
    image:""
  };
}
