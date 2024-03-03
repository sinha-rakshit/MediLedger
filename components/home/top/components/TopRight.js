import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'



const TopRight = () => {
  return (
    <TopRightWrap>
       <Image src="https://img.freepik.com/free-vector/data-network-businessman_24908-57841.jpg?w=740&t=st=1681563042~exp=1681563642~hmac=9c5bec9622b56718d14afa0a51b7f63dc384519d2da6279b31dcd1bf9f8edb31" width="400" height="400"/>
    

    </TopRightWrap>
  )
}

const TopRightWrap=styled.div`
padding-top: 6rem;
    width: 48%;
    display: flex;
`

export default TopRight