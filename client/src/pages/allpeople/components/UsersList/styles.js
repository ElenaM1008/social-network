import styled from "styled-components";

export const UsersArea = styled.div`
   display:flex;
	gap: 5px;
   flex-wrap:wrap;
`

export const CardUser = styled.div`
   display:flex;
	flex-direction: column;
	justify-content: space-around;
	width: 200px;
	height:150px;
	border-radius: 3px;
	border: 1px solid gray;
	padding: 5px;
	background: #d0d3db;
	align-items:center;
`

export const UserLinks = styled.ul`
   list-style: none;
	font-size:18px;
	margin:0;
	padding: 5px;
`

export const UserLink = styled.li`
   cursor: pointer;
	color:  #5a74d1;
	font-weight:700;
`

export const AddButton = styled.button`
   cursor: pointer;
	background:  #5a74d1;
	width: 160px;
	height:30px;
	border:none;
	font-size:16px;
	color: white;
	border-radius: 7px;

	&:hover{
		background: #6885ed;
	}
`