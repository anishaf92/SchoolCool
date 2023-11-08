import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../auth/AuthContext';
const PrivateRoutes = () => {
  let { userAuth , isLoggedIn} = useAuth();
return (
    userAuth && isLoggedIn ? <Outlet/> : <Navigate to='/'/>
  )
}
export default PrivateRoutes;