export namespace DataTypes {
    export interface CardContentProps {
        name:string;
    }
    export interface CardContentText {
        buttonText:string;
        buttonBgColor:string;
        categoryName:string;
    }

    export interface ThemeProps{
        theme_name: string;
        button_bg:string;
        theme_header: string;
        theme_body: string;
        theme_add: string;
        theme_generator_text: string;
        theme_generator: string;
        theme_inprogress: string;
        theme_completed: string;
        theme_available: string;
    }

    export interface CategorySelection{
        categoryName:string
    }
    export interface ListType{
        categoryName:string
    }
}