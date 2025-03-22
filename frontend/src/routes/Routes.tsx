import { BrowserRouter, Navigate, Routes as ReactRouter, Route } from "react-router-dom"
import { LoginScreen } from "../components/pages/login/Login"
import { useAuth } from "../context/useAuthContext"
import { Content } from "antd/es/layout/layout"
import { mainRoutes } from "./mainRoutes"


export const Routes:React.FC = () => {

  const {signed} = useAuth();

  const ForbiddenAcces:React.FC =()=>{
    return (<Navigate to='/' />)
  }
  
    return (
  
      <BrowserRouter>
          <ReactRouter>
              <Route path={'/'} element={<LoginScreen />} />
              <Route path={'/login'} element={<LoginScreen />} />

              <Route path={'/app/*'} element={signed? <Content /> : <ForbiddenAcces />} >
                {mainRoutes.map((_,index) => <Route path={mainRoutes[index].path} element={mainRoutes[index].element} key={`${index} mainRoute`}/>)}
              </Route>  
          </ReactRouter>
      </BrowserRouter>
  
    )
  }