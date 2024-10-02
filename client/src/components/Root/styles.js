import styled from "styled-components";
import { NavLink } from 'react-router-dom';

export const Menu = styled.div`
   display:flex;
   gap:15px;
   align-items:center;
   justify-content:space-between;
	margin: 0 auto;
	height: 60px;
	background: #5a74d1;
	padding: 0 30px;
`

export const MenuItem = styled(NavLink)`
   font-size: 16px;
	text-decoration: none;
	color: white;
	font-weight:bold;
	padding:10px;

	&.active{
		color:black;
	}

	&:hover{
		background: #90a1e0;
		border-radius: 15px;
	}
`