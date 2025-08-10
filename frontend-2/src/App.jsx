import React from 'react'
import MainLayout from './components/MainLayout'
import TaskMain from "./components/TaskMain"
import Toaster from "react-hot-toast"
export default function App() {
  return (
    <div>
      <MainLayout>
        <TaskMain/>      
      </MainLayout>
      <Toaster/>
    </div>
  )
}
