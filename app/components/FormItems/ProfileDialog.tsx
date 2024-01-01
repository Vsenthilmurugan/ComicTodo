import React, { Fragment, useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DataTypes } from "@/app/common/types";
import {
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useDispatch, useSelector } from "react-redux";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Image from "next/image";
import { serverAPI } from "@/app/common/serverAPI";
import toast from "react-hot-toast";
import Preloader from "../Loader/Preloader";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { handleUpdateTheme } from "@/app/common/utilities";
import { intialData } from "@/app/common/intialData";

const ProfileDialog = (props: DataTypes.profileModalProps) => {
  const themeState: DataTypes.ThemeProps = useSelector(
    (state: any) => state.theme
  );
  const [showPassword, setShowPassword] = useState(false);
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState<any>("");
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [preloader, setShowPreloader] = useState(false);
  const [userDetails, setUserDetails] = useState<DataTypes.userProps>(
   intialData.userContent
  );

  const fileInputRef = useRef<HTMLInputElement>(null);
  const bg = themeState.theme_background;
  const dispatch = useDispatch();

  const schema = Yup.object().shape({
    name: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    theme: Yup.string().required("Theme is Required By Default it's Mickey"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
    setValue
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    setShowPreloader(true);
    const user = {
      name: data.name,
      email: data.email,
      theme: data.theme,
      image: previewUrl ? previewUrl : "",
      password: data.password,
      _id: localStorage.getItem("uid")!,
    };
    serverAPI
      .updateUser(user)
      .then((res) => {
        if (res != undefined) {
          toast.success(res.data.message);
          reset();
          props.close();
        }
      })
      .finally(() => {
        handleUpdateTheme(data.theme, dispatch);
        setShowPreloader(false);
      });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const inputHandler = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const profileImageUpdater = (event: any) => {
    let pickedFile;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
    }
  };

  useEffect(() => {
    Object.entries(props.userData).forEach(([field, value]) => {
      setValue(field as any, value);
    });
    if (props.open == true) {
      setPreviewUrl(props.userData.image ? props.userData.image : "");
    }
  }, [props.userData, setValue]);

  

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.result != null) {
        setPreviewUrl(fileReader.result);
      }
    };
    fileReader.readAsDataURL(file);
  }, [file]);

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
          <p>Update Profile</p>
        </DialogTitle>
        <DialogContent>
          {!preloader ? (
            <DialogContentText id="alert-dialog-description">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="my-8">
                  <div
                    className="w-full flex items-center justify-center rounded-full mb-3 cursor-pointer"
                    onClick={() => {
                      inputHandler();
                    }}
                  >
                    <Image
                      src={previewUrl != "" ? previewUrl : "/default_user.png"}
                      alt="profile"
                      height={100}
                      width={100}
                    />
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".jpg,.png,.jpeg,.gif"
                      className="hidden"
                      onChange={profileImageUpdater}
                    />
                  </div>
                  <div className="text-red-500 font-comic text-xs text-center">
                    Please upload Image less than 2mb *
                  </div>
                  <div className="my-4">
                    <TextField
                      fullWidth
                      label="Username"
                      variant="outlined"
                      {...register("name")}
                      error={!!errors.name}
                      helperText={errors.name?.message}
                    />
                  </div>
                  <div className="my-4">
                    <TextField
                      fullWidth
                      label="Email"
                      variant="outlined"
                      {...register("email")}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  </div>
                  <div>
                    <p>Choose Theme:</p>
                    <Controller
                      name={"theme"}
                      control={control}
                      render={({ field }) => (
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          {...register("theme")}
                          {...field}
                          name="row-radio-buttons-group"
                        >
                          <FormControlLabel
                            value="mickey"
                            control={<Radio />}
                            label="Disney "
                          />
                          <FormControlLabel
                            style={{ fontFamily: "'Comic Neue', 'cursive'" }}
                            value="avengers"
                            control={<Radio />}
                            label="Avengers"
                            className="font-comic"
                          />
                          <FormControlLabel
                            value="frozen"
                            control={<Radio />}
                            label="Frozen"
                          />
                        </RadioGroup>
                      )}
                    />
                  </div>
                  <div className="mt-5 text-center w-full">
                    <Button
                      type="submit"
                      style={{ background: themeState.button_bg }}
                      variant="contained"
                      endIcon={<AddBoxIcon />}
                    >
                      <p className="">Update</p>
                    </Button>
                  </div>
                </div>
              </form>
            </DialogContentText>
          ) : (
            <div className="mt-5">
              <Preloader />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={props.close}>Close</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default ProfileDialog;
