import { BrowserRouter, Routes as ReactRouter, Route } from "react-router"
import { LoginScreen } from "../components/pages/login/Login"


export const Routes:React.FC = () => {

  
//     const ForbiddenAcces:React.FC =()=>{
//       return (<Navigate to='/' />)
//   }
  
    return (
  
      <BrowserRouter>
          <ReactRouter>
              <Route path={'/'} element={<LoginScreen />} />
              <Route path={'/login'} element={<LoginScreen />} />
  
          </ReactRouter>
      </BrowserRouter>
  
    )
  }