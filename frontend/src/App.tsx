import React from "react"
import { LoginScreen } from "./components/pages/login/Login"
import { ContextProvider } from "./context/appContext"

const App:React.FC = () => {

  return (
    <>
      <ContextProvider>
        <LoginScreen />
      </ContextProvider>
    </>
  )
}

export default App
