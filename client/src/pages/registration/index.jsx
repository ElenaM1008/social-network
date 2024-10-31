import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as SC from "./styles";
import { useForm } from "react-hook-form";
import { login } from "../../redux/slices/authSlices";
import { FetchData } from "../../components/FetchData";

const SECRET_KEY = "AdminE1008Ch";

export const RegistrationPage = () => {
  const [userType, setUserType] = useState("");
  const [secretKey, setSecretKey] = useState("");

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

  const validateNameSurname = (value) => {
    if (value.length < 2) {
      return "Минимальная длина 2 символа";
    } else if (value.length > 20) {
      return "Максимальная длина 20 символов";
    }
    return true;
  };

  const { fetchData } = FetchData();

  const onSubmit = async (data) => {
    if (userType === "admin" && secretKey !== SECRET_KEY) {
      alert("Неверный ключ от админа");
    } else {
      const { ...other } = data;

      await fetchData({
        ...other,
        url: `http://localhost:3003/api/users/auth/register`,
        method: "post",
        cb: login,
      });
      navigate("/myprofile");
    }
  };

  return (
    <>
      <SC.Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <SC.Label>
          ЗAРЕГИСТРИРОВАТЬСЯ КАК:
          <SC.RadioInput>
            <SC.RadioLabel>
              АДМИН
              <input
                type="radio"
                {...register("userType", {
                  required: { value: true, message: "Выберите роль" },
                })}
                id="admin"
                value="admin"
                onChange={(e) => setUserType(e.target.value)}
              />
            </SC.RadioLabel>
            <SC.RadioLabel>
              ПОЛЬЗОВАТЕЛЬ
              <input
                type="radio"
                {...register("userType", {
                  required: { value: true, message: "Выберите роль" },
                })}
                value="user"
                id="user"
                onChange={(e) => setUserType(e.target.value)}
              />
            </SC.RadioLabel>
          </SC.RadioInput>
          <SC.Error>{errors.userType && errors.userType.message}</SC.Error>
        </SC.Label>
        {userType === "admin" ? (
          <SC.Label>
            <p>СЕКРЕТНЫЙ КЛЮЧ</p>
            <SC.Input
              type="text"
              {...register("secret", {
                required: { message: "Введите пароль", value: true },
              })}
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
            />
            <SC.Error>{errors.secret && errors.secret.message}</SC.Error>
          </SC.Label>
        ) : null}
        <SC.Label>
          <p>ИМЯ</p>
          <SC.Input
            type="text"
            {...register("name", {
              required: { message: "Введите свое имя!", value: true },
              validate: validateNameSurname,
            })}
          />
          <SC.Error>{errors.name && errors.name.message}</SC.Error>
        </SC.Label>
        <SC.Label>
          <p>ФАМИЛИЯ</p>
          <SC.Input
            type="text"
            {...register("surname", {
              required: { message: "Введите свою фамилию!", value: true },
              validate: validateNameSurname,
            })}
          />
          <SC.Error>{errors.surname && errors.surname.message}</SC.Error>
        </SC.Label>
        <SC.Label>
          <p>ТЕЛЕФОН</p>
          <SC.Input
            type="tel"
            {...register("phone", {
              required: { value: true, message: "Это поле обязательное" },
            })}
          />
          <SC.Error>{errors.phone && errors.phone.message}</SC.Error>
        </SC.Label>
        <SC.Label>
          <p>ДАТА РОЖДЕНИЯ</p>
          <SC.Input
            type="date"
            {...register("birthday", {
              required: { value: true, message: "Введите дату рождения" },
            })}
          />
          <SC.Error>{errors.birthday && errors.birthday.message}</SC.Error>
        </SC.Label>
        <SC.Label>
          <p>ГОРОД</p>
          <SC.Input
            type="text"
            {...register("city", {
              required: { value: true, message: "Введите название города" },
            })}
          />
          <SC.Error>{errors.city && errors.city.message}</SC.Error>
        </SC.Label>
        <SC.Label>
          ПОЛ
          <SC.RadioInput>
            <SC.RadioLabel>
              МУЖСКОЙ
              <input
                type="radio"
                {...register("gender", {
                  required: { value: true, message: "Выберите пол" },
                })}
                id="men"
                value="мужской"
              />
            </SC.RadioLabel>
            <SC.RadioLabel>
              ЖЕНСКИЙ
              <input
                type="radio"
                {...register("gender", {
                  required: { value: true, message: "Выберите пол" },
                })}
                value="женский"
                id="women"
              />
            </SC.RadioLabel>
          </SC.RadioInput>
          <SC.Error>{errors.gender && errors.gender.message}</SC.Error>
        </SC.Label>
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
        <SC.Button type="submit">Зарегистрироваться</SC.Button>
      </SC.Form>
    </>
  );
};
