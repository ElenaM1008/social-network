import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { noFriends, getAllFriends } from "../../redux/slices/friendsSlices";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../../redux/slices/detailUserSlices";

export const MyFriends = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const { data } = useSelector((state) => state.friends);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  
  useEffect(() => {
    if (currentUser.friends.length) {
      dispatch(getAllFriends({ arr: currentUser.friends }));
    } else {
      dispatch(noFriends());
    }
  }, [currentUser]);

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
      <h2>Мои друзья</h2>
      <div>
        {data.map((item) => (
          <div key={item._id}>
				<div onClick={() => userDetail(item._id)} >
				<span>{item.name} </span>
            <span>{item.surname} </span>
				</div>
          </div>
        ))}
      </div>
    </>
  );
};
