import React,{ useState } from "react";
import * as SC from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slices/authSlices";
import {getUserInfo} from '../../redux/slices/detailUserSlices'

export const DetailUser = () => {
	const dispatch = useDispatch()
  const { data } = useSelector((state) => state.detail);
  const { currentUser } = useSelector((state) => state.auth);

  const [comment, setComment] = useState("");

  const deletePost = async (id) => {
	try {
	  const res = await fetch(
		 `http://localhost:3003/api/users/${data._id}/delete`,
		 {
			method: "delete",
			headers: {
			  Accept: "application/json",
			  "Content-Type": "application/json",
			},
			body: JSON.stringify({
			  postId: id,
			}),
		 }
	  );
	  const json = await res.json();

	  if (res.status !== 200) {
		 alert(json.message);
		 return;
	  }

	  dispatch(getUserInfo(json))
	} catch (error) {
	  console.log(error);
	}
 };

  const addComment = async (id) => {
	try {
	  const res = await fetch(
		 `http://localhost:3003/api/users/${data._id}/comment/add`,
		 {
			method: "post",
			headers: {
			  Accept: "application/json",
			  "Content-Type": "application/json",
			},
			body: JSON.stringify({
			  content: comment,
			  autor: currentUser.name,
			  postId: id,
			}),
		 }
	  );
	  const json = await res.json();

	  if (res.status !== 200) {
		 alert(json.message);
		 return;
	  }

	  dispatch(getUserInfo(json))
	  setComment("");
	} catch (error) {
	  console.log(error);
	}
 };

  return (
    <>
      <div>
        <h2>
          Информация о {data.name} {data.surname}{" "}
        </h2>
        <p>Город:{data.city}</p>
        <p>Дата рождения:{data.birthday}</p>
        <p>Пол:{data.gender}</p>
        <p>Номер телефона:{data.phone}</p>
      </div>
      <h2>Посты</h2>
      <div>
        {data.posts &&
          data.posts.map((post) => (<div key={post.id}>
            {
					currentUser.userType === 'admin' ? 
					<b onClick={() => deletePost(post.id)}>Delete </b>
					:
					null
				}
              <p>{post.text}</p>
            
				<b>Комментарии:</b>
				{data.comments.map((comment, index) =>
                  post.id === comment.postId ? (
                    <div key={index}>
                      <b>{comment.autor}</b>
                      <p>{comment.content}</p>
                      <br />
                    </div>
                  ) : 
                    ""
                )}
					  <SC.Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Комментировать пост"
              />
              <SC.Button onClick={() => addComment(post.id)}>
                Отправить
              </SC.Button>
				</div>
          ))}
      </div>
    </>
  );
};
