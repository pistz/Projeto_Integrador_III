import React from "react"
import { ContextProvider } from "./context/appContext"
import { Routes } from "./routes/Routes"


const App:React.FC = () => {

  return (
    <>
      <ContextProvider>
        <Routes/>
      </ContextProvider>
    </>
  )
}

export default App
