import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PostsPage } from './pages/posts';
import { Root } from './components/Root';
import { AuthPage } from './pages/auth';
import { RegistrationPage } from './pages/registration';
import { store } from './redux/store'
import { Provider } from 'react-redux'
import { MyProfile } from './pages/myprofile';
import { AllPeople } from './pages/allpeople';
import { MyFriends } from './pages/friends';
import { Notification } from './pages/notification';
import { DetailUser } from './pages/detail';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		children: [
			{
				index: true,
				element: <App />
			},
			{
				path: 'posts',
				element: <PostsPage />
			},
			{
				path: 'myprofile',
				element: <MyProfile />
			},
			{
				path: 'detail',
				element: <DetailUser/>
			},
			{
				path: 'friends',
				element: <MyFriends />
			},
			{
				path: 'notification',
				element: <Notification />
			},
			{
				path: 'allpeople',
				element: <AllPeople />
			},
			{
				path: 'auth',
				element: <AuthPage />
			},
			{
				path: 'registration',
				element: <RegistrationPage />
			},
		]
	}
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
