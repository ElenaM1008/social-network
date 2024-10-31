import React from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/slices/authSlices";
import * as SC from "./styles";
import { useForm } from "react-hook-form";
import { FetchData } from "../../components/FetchData";

export const AuthPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const validatePassword = (value) => {
    if (value.length < 8) {
      return "Минимальная длина 8 символов";
    }
    return true;
  };

  const { fetchData } = FetchData();

  const onSubmit = async (data) => {
    const { ...other } = data;
    await fetchData({
      ...other,
      url: `http://localhost:3003/api/users/auth/login`,
      method: "post",
      cb: login,
    });
    navigate("/myprofile");
  };

  return (
    <>
      <SC.Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <SC.Label>
          <p>E-MAIL</p>
          <SC.Input
            type="text"
            {...register("login", {
              required: { message: "Введите ваш e-mail", value: true },
            })}
          />
          <SC.Error>{errors.login && errors.login.message}</SC.Error>
        </SC.Label>
        <SC.Label>
          <p>ПАРОЛЬ</p>
          <SC.Input
            type="text"
            {...register("password", {
              required: { message: "Введите пароль", value: true },
              validate: validatePassword,
            })}
          />
          <SC.Error>{errors.password && errors.password.message}</SC.Error>
        </SC.Label>
        <SC.Button type="submit">Вход</SC.Button>
      </SC.Form>
    </>
  );
};
