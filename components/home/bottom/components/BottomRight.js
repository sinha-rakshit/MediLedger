import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'



const BottomRight = () => {
  return (
    <BottomHomeRightWrap>
       <Image src="https://img.freepik.com/free-vector/data-network-businessman_24908-57857.jpg?size=626&ext=jpg" width="400" height="400"/>
    </BottomHomeRightWrap>
  )
}

const BottomHomeRightWrap=styled.div`
padding-top: 6rem;
    width: 48%;
    display: flex;
`
export default BottomRight