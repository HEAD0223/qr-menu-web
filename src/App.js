import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { Login } from './components/Auth/Login';
import { Register } from './components/Auth/Register';
import { Dashboard } from './components/Content/Dashboard';
import { Menu } from './components/Content/Menu/Menu';
import { Stores } from './components/Content/Stores/Stores';
import { PrivateWrapper } from './components/PrivateRoute';
import { Header } from './components/Utils/Header/Header';
import { Info } from './components/Utils/Header/Info';
import { LeftBar } from './components/Utils/LeftBar/LeftBar';
import { checkAuth } from './redux/slices/auth';

function App() {
	const dispatch = useDispatch();
	const { isAuth } = useSelector((state) => state.auth);

	const [sidebarWidth, setSidebarWidth] = useState(99);
	const [headerHeight, setHeaderHeight] = useState(100);
	const routesWidth = `calc(100% - ${sidebarWidth}px)`;
	const routesHeight = `calc(100% - ${headerHeight}px)`;

	const [isLeftBarOpen, setIsLeftBarOpen] = useState(false);

	useEffect(() => {
		if (localStorage.getItem('token')) {
			dispatch(checkAuth());
		}
	}, [dispatch]);

	const handleSidebarWidthChange = (newWidth) => {
		setSidebarWidth(newWidth);
	};
	const handleHeaderHeightChange = (newHeight) => {
		setHeaderHeight(newHeight);
	};

	const toggleLeftBar = () => {
		setIsLeftBarOpen(!isLeftBarOpen);
	};

	return (
		<>
			{isLeftBarOpen && (
				<LeftBar isLeftBarOpen={isLeftBarOpen} onWidthChange={handleSidebarWidthChange} />
			)}
			<Header
				sidebarWidth={sidebarWidth}
				isLeftBarOpen={isLeftBarOpen}
				toggleLeftBar={toggleLeftBar}
				onHeightChange={handleHeaderHeightChange}
			/>
			<div
				style={{
					marginLeft: isLeftBarOpen ? sidebarWidth : 'auto',
					marginRight: isLeftBarOpen ? 'auto' : 'auto',
					width: routesWidth,
					marginTop: headerHeight,
					height: routesHeight,
				}}>
				<Routes>
					<Route path="/login" element={isAuth ? <Navigate to="/" /> : <Login />} />
					<Route path="/register" element={isAuth ? <Navigate to="/" /> : <Register />} />
					<Route path="/info" element={<Info />} />
					{/* All other routes require authentication */}
					<Route element={<PrivateWrapper auth={{ isAuth }} />}>
						<Route index element={<Dashboard />} />
						<Route path="/stores" element={<Stores />} />
						<Route path="/menu" element={<Menu />} />
					</Route>
					{/* Route to redirect to login page for unmatched routes */}
					<Route path="*" element={<Navigate to="/login" />} />
				</Routes>
			</div>
		</>
	);
}

export default App;
