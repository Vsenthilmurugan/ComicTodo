import axios from "axios";
import toast from "react-hot-toast";
import { API, Endpoints } from "./constants";
import { getAuthString } from "./utilities";
import { DataTypes } from "./types";

export namespace serverAPI {
  export enum APIMethod {
    GET = "GET",
    POST = "POST",
    PATCH = "PATCH",
    DELETE = "DELETE",
  }

  export const userLogin = async (email: string, password: string) => {
    let data: { [k: string]: any } = {};
    data["email"] = email;
    data["password"] = password;
    return executeAPI(API.EndPoint.login, APIMethod.POST, false, data);
  };
  export const userSignup = async (
    name: string,
    email: string,
    password: string
  ) => {
    let data: { [k: string]: any } = {};
    data["name"] = name;
    data["email"] = email;
    data["password"] = password;
    return executeAPI(API.EndPoint.signup, APIMethod.POST, false, data);
  };
  export const createTodo = async (description: string) => {
    let data: { [k: string]: any } = {};
    data["description"] = description;
    data["uid"] = localStorage.getItem("uid");
    return executeAPI(API.EndPoint.createtodo, APIMethod.POST, true, data);
  };
  export const updateTodo = async (
    dataKey: string,
    value: string,
    todoId: string
  ) => {
    let data: { [k: string]: any } = {};
    data[dataKey] = value;
    return executeAPI(
      API.EndPoint.todo + `/${todoId}`,
      APIMethod.PATCH,
      true,
      data
    );
  };
  export const Todolist = async (status: string) => {
    return executeAPI(
      API.EndPoint.todolist + `/${status}`,
      APIMethod.GET,
      true
    );
  };
  export const RandomTodo = async () => {
    return executeAPI(API.EndPoint.randomtodo, APIMethod.GET, true);
  };
  export const deleteTodo = async (todoId: string) => {
    let params: { [k: string]: any } = {};
    return executeAPI(API.EndPoint.todo + `/${todoId}`, APIMethod.DELETE, true);
  };
  export const getUser = async () => {
    let uid = localStorage.getItem("uid");
    return executeAPI(API.EndPoint.getuser + "/" + uid, APIMethod.GET, true);
  };
  export const updateUser = async (dataKey:DataTypes.userProps) => {
    let data: { [k: string]: any } = {};
    data['email'] = dataKey.email;
    data['password'] = dataKey.password;
    data['theme'] = dataKey.theme;
    data['name'] = dataKey.name;
    data['image'] = dataKey.image;
    return executeAPI(API.EndPoint.updateuser+`/${dataKey._id}`, APIMethod.PATCH, true, data);
  };
  export const executeAPI = async (
    endpoint: string,
    method: APIMethod,
    authRequired?: boolean,
    data?: any,
    params?: any,
    suppressError?: boolean,
    returnError?: boolean
  ) => {
    let headers: { [k: string]: any } = {};
    if (authRequired) {
      const persistAuthString = getAuthString();
      if (persistAuthString) {
        headers["Authorization"] = `Bearer ${persistAuthString}`;
      }
    }
    if (method === APIMethod.POST || method === APIMethod.PATCH) {
      headers["Content-Type"] = "application/json";
    }

    try {
      const response = await axios({
        method: method,
        url: API.BaseUrl + endpoint,
        data: JSON.stringify(data),
        headers: headers,
        params: params,
      });
      const details = { data: response.data, status: response };
      return details;
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        !suppressError &&
        !returnError
      ) {
        const errorData: any = error.response.data;
        if (errorData.errors && errorData.errors.length > 0) {
          if (errorData.errors) {
            toast.error(errorData.errors);
          } else {
            toast.error(errorData.errors);
          }
        } else {
          if (errorData["message"]) {
            toast.error(errorData["message"]);
          } else {
            return toast.error("Error Occured in the Request");
          }
        }
      }
      if (axios.isAxiosError(error) && error.response && returnError) {
        const errorData: any = error.response.data;
        if (errorData.errors && errorData.errors.length > 0) {
          if (errorData.errors) {
            return errorData.errors;
          }
        } else {
          const details = {
            data: error.response.data,
            status: error.response.status,
          };

          return details;
        }
      }
    }
  };
}
