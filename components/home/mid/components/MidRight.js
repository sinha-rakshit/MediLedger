import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'



const MidRight = () => {
  return (
    <MidHomeRightWrap>
       <Image src="https://img.freepik.com/free-vector/data-network-businessman_24908-57820.jpg?t=st=1681563600~exp=1681564200~hmac=900b39a4706b5ecfdc18de491b2280dd389c8c827435a568a51b138448021e54" width="400" height="400"/>
    

    </MidHomeRightWrap>
  )
}

const MidHomeRightWrap=styled.div`
    padding-top: 6rem;
    width: 48%;
    display: flex;
    justify-content: right;
    padding-right: 5rem;
    padding-bottom: 1rem;
`
export default MidRight