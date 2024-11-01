import styled from "styled-components";

export const Nav = styled.nav`
	border-radius: 10px;
	background: #5a74d1;
	box-shadow: 7px 7px 7px gray;
	border:none;
	padding: 0 15px;
	margin: 15px;
	font-size: 18px;
	font-family: Arial, Helvetica, sans-serif;
	min-width: 200px;
	height: 200px;
`
export const List = styled.ul`
   display: flex;
   flex-direction: column;
   gap: 10px;
	padding:7px;
	@media (max-width: 430px){
		align-items:center;
	}
`
export const ListItem = styled.li`
   padding: 4px;
   cursor: pointer;
	list-style: none;

	&:hover{
		background: #989fa6;
		border-radius: 10px;
		font-weight:600;
	}
`