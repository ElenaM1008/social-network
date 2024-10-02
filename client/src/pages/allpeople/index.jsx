import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeSearch, findAllUser } from "../../redux/slices/findUsersSlice";
import { login } from "../../redux/slices/authSlices";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../../redux/slices/detailUserSlices";

export const AllPeople = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.auth);
  const { data, filter } = useSelector((state) => state.findUser);

  const [search, setSearch] = useState(filter.search || "");

  useEffect(() => {
    dispatch(findAllUser({ login: currentUser.login, search }));
    dispatch(changeSearch(search));
  }, [search, currentUser]);

  const sendRequest = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:3003/api/users/list/request/${currentUser._id}`,
        {
          method: "put",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requests: id,
          }),
        }
      );
      const json = await res.json();

      if (res.status !== 200) {
        alert(json.message);
        return;
      }

      dispatch(login(json));
    } catch (error) {
      console.log(error);
    }
  };

  const userDetail = async (id) => {
    try {
      const res = await fetch(`http://localhost:3003/api/users/list/${id}`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      });
      const json = await res.json();

      if (res.status !== 200) {
        alert(json.message);
        return;
      }

      dispatch(getUserInfo(json));
      navigate("/detail");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <h1>Поиск друзей</h1>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
        />
      </div>
      <div>
        {data.map((item) => (
          <div key={item._id}>
            <div>
              <div>
                <a onClick={() => userDetail(item._id)}>
                  {item.name} {item.surname}
                </a>
              </div>
            </div>
            <div>
              {currentUser.requests.includes(item._id) ||
              currentUser.friends.includes(item._id) ? (
                ""
              ) : (
                <button onClick={() => sendRequest(item._id)}>
                  {" "}
                  Добавить в друзья
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
