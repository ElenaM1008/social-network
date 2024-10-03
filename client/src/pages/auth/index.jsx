import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch} from "react-redux";
import { login } from "../../redux/slices/authSlices";
import * as SC from "./styles";
import { useForm } from "react-hook-form";

export const AuthPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const onSubmit = async (data) => {
    const { ...other } = data;
    try {
      const res = await fetch("http://localhost:3003/api/users/auth/login", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...other
        }),
      });
		const json = await res.json();
		
      if (res.status !== 200) {
        alert(json.message);
        return;
      }

      dispatch(login((json)));
      navigate("/myprofile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <SC.Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <SC.Label>
          <p>E-MAIL</p>
          <SC.Input
            type="text"
            {...register("login", {
              required: {
                message: "Введите ваш e-mail",
                value: true,
              },
            })}
          />
          <SC.Error>{errors.login && errors.login.message}</SC.Error>
        </SC.Label>
        <SC.Label>
          <p>ПАРОЛЬ</p>
          <SC.Input
            type="text"
            {...register("password", {
              required: {
                message: "Введите пароль",
                value: true,
              },
              maxLength: {
                message: "Максимальная длина 20 символов",
                value: 20,
              },
              minLength: {
                message: "Минимальная длина 8 символов",
                value: 8,
              },
            })}
          />
          <SC.Error>{errors.password && errors.password.message}</SC.Error>
        </SC.Label>
        <SC.Button type="submit">Вход</SC.Button>
      </SC.Form>
    </>
  );
};
