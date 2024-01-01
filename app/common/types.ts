export namespace DataTypes {
  export interface CardContentProps {
    name: string;
  }
  export interface CardContentText {
    buttonText: string;
    buttonBgColor: string;
    categoryName: string;
  }

  export interface ThemeProps {
    theme_name: string;
    button_bg: string;
    theme_header: string;
    theme_body: string;
    theme_add: string;
    theme_generator_text: string;
    theme_generator: string;
    theme_inprogress: string;
    theme_completed: string;
    theme_available: string;
    theme_welcome_banner: string;
    theme_background: string;
  }

  export interface CategorySelection {
    categoryName: string;
  }
  export interface ListType {
    categoryName: string;
    data: todoProps[];
    updateHandler: any;
    deleteHandler?: any;
  }
  export interface todoProps {
    _id: string;
    status: string;
    description: string;
    uid: string;
  }
  export interface modalProps {
    open: any;
    close: any;
    handler: any;
    modalData: modalContentProps;
  }
  export interface profileModalProps {
    open: any;
    close: any;
    userData:userProps
  }
  export interface modalContentProps {
    modalType: string;
    value: string;
    id?: string;
    handler?: any;
  }

  export interface userProps {
    _id: string;
    name: string;
    email: string;
    password: string;
    theme: string;
    image?:any
  }
}
