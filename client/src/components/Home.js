import React from 'react'
import Sidebar from './Sidebar'
import MainDash from './MainDash/MainDash'
import RightSide from './RigtSide/RightSide'

export default function Home() {
  return (
    <>
      <Sidebar />
        <MainDash/>
        <RightSide/>
    </>
  )
}
