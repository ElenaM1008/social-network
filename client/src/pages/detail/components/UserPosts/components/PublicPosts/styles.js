import styled from "styled-components";

export const Textarea = styled.textarea`
   background: transparent;
   width: 80%;
   resize: none;
   height: 150px;
`

export const Button = styled.button`
   width: 215px;
	height: 30px;
	border-radius: 5px;
	border:none;
	font-size:16px;
	background: #5a74d1;
	color: white;
	cursor: pointer;

	&:hover{
		background: #6885ed;
	}	
`
export const ContentPost = styled.div`
	position:relative;
	margin-top: 20px;
`

export const PostText = styled.div`
   background: #d0d3db;
	border-radius: 5px;
	border:none;
	padding:30px;
	font-style: italic;
	font-family: Verdana, Geneva, Tahoma, sans-serif;
`

export const DeleteIcon = styled.b`
   position:absolute;
	top: 0px;
	right: 5px;
	color: #5a74d1;
`

export const ContentComments = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;
	margin:10px;
`

export const Autor = styled.b`
	background: #d0d3db;
	border-radius: 5px;
	border:none;
	padding: 5px;
	font-size:14px;
`

export const CommentText = styled.div`
   display:flex;
	gap: 5px;
	align-items: center;
`
export const TextareaAndBut = styled.div`
   display:flex;
	flex-direction: column;
	gap: 10px;
`