export enum Endpoints {
    login = "auth/login",
    signup = "auth/signup",
    createtodo = "todo/addtodo",
    todolist = "todo/list",
    todo = "todo",
    randomtodo = "todo/randomtodo",
    getuser = "user/userdetail",
    updateuser = "user/updateuser",
}

export const APIResult = {
    SUCCESS: true,
    FAILURE: false
}
export const API = {
    BaseUrl: "http://localhost:5000/api/",
    EndPoint: Endpoints,
    Result: APIResult
}