import React from 'react'
import styled from 'styled-components';
import Top from '@/components/home/top/Top';
import Mid from '@/components/home/mid/Mid';
import Bottom from '@/components/home/bottom/Bottom';


const index = () => {
  return (
    <Wrap>
    <Top/>
    <Mid/> 
     <Bottom/>
    </Wrap>
  )
}
const Wrap=styled.div`

`
export default index