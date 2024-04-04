import styled from 'styled-components';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import PaidIcon from '@mui/icons-material/Paid';
import { ethers } from 'ethers';
import MediLedger from '../artifacts/contracts/MediLedger.sol/MediLedger.json' 
import { useState } from 'react';
import Link from 'next/link'
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import Image from 'next/image'
import {useRouter} from 'next/router';


 const allPatients = ({AllData}) => {
  const Router=useRouter();
    const [filter,setFilter]=useState(AllData);
    return (
        <HomeWrapper>
          <FilterWrapper>
            <FilterAltIcon style={{fontSize:40}} />
            <Category  onClick={()=>setFilter(AllData)}>All</Category>
          </FilterWrapper>


          <TopLeftWrap>
        <Paragraph>See all your patients </Paragraph>
        <Heading>THE PATIENT WINDOW</Heading>
        <TextH><Paragraph>All your accounts are shown below</Paragraph></TextH>
        
        <TextH><Paragraph>If not registered yet </Paragraph></TextH>
        <ButtonWrap><Link  style={{textDecoration:'none'}} href="/addPatient" > <TNavLinks active={Router.pathname=="/addPatient"?true:false}>
        GET REGISTERED NOW!!
      </TNavLinks></Link></ButtonWrap>
        <TextHLast><Paragraph>Scroll down  to find your account !! </Paragraph></TextHLast>
       
        
    </TopLeftWrap>    



    
          <CardsWrapper >
            {filter.map((e)=>{
              return(
                 <Card >
                  <CardData> <Image src="https://img.freepik.com/free-vector/data-network-businessman_24908-57817.jpg?t=st=1681567642~exp=1681568242~hmac=ab836baab71c248c8f6155ecc4c999d9de72dc688e3a1baddc432643c5793ccf" width="280" height="225"/>
                  </CardData>
                  <CardData>
                <Text>Patient Id</Text> 
                <Text>{e.pid}</Text>
              </CardData>
              <CardData>
                <Text><EngineeringOutlinedIcon />Patient Block Address</Text> 
                <Text>{e.contractAddress.slice(0,12)}...{e.contractAddress.slice(32)}</Text>
              </CardData>
              <CardData>
                <Text>Patient Name<PaidIcon /></Text> 
                <Text>{e.name}</Text>
                  </CardData>
              <CardData>
                <Text><EngineeringOutlinedIcon />Patient Wallet Address</Text> 
                <Text>{e.walletid.slice(0,12)}...{e.walletid.slice(32)}</Text>
              </CardData>
              <CardData><TNavLinks><Link passHref href={'/' + e.contractAddress}><Button>
               Contract Details
              </Button></Link></TNavLinks></CardData>
          </Card>     
              )
            })}
            
          </CardsWrapper>
        </HomeWrapper>
      )
}
export async function getStaticProps() {
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_RPC_URL
    );
  
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_ADDRESS,
      MediLedger.abi,
      provider
    );
  
    const getAllPatients = contract.filters.allPatient();
    const AllPatients = await contract.queryFilter(getAllPatients);
    const AllData = AllPatients.map((e) => {
      return {
        pid:parseInt(e.args.fid),
        contractAddress:e.args.contractAddress,
        name: e.args.name,
        walletid:e.args.walletid
      }
    });
    // const getBridgeContracts = contract.filters.contractsCreated('Bridge');
    // const BridgeContracts = await contract.queryFilter(getBridgeContracts);
    // const BridgeData = BridgeContracts.map((e) => {
    //   return {
    //     pid:parseInt(e.args.projectId),
    //     contractAddress:e.args.contractAddress,
    //     amt:ethers.utils.formatEther(e.args.amount),
    //     deadline:parseInt(e.args.deadline)
    //   }
    // });
    // const getHighwayContracts = contract.filters.contractsCreated('Highway');
    // const HighwayContracts = await contract.queryFilter(getHighwayContracts);
    // const HighwayData = HighwayContracts.map((e) => {
    //   return {
    //     pid:parseInt(e.args.projectId),
    //     contractAddress:e.args.contractAddress,
    //     amt:ethers.utils.formatEther(e.args.amount),
    //     deadline:parseInt(e.args.deadline)
    //   }
    // });
    // const getDamContracts = contract.filters.contractsCreated('Dam');
    // const DamContracts = await contract.queryFilter(getDamContracts);
    // const DamData = DamContracts.map((e) => {
    //   return {
    //     pid:parseInt(e.args.projectId),
    //     contractAddress:e.args.contractAddress,
    //     amt:ethers.utils.formatEther(e.args.amount),
    //     deadline:parseInt(e.args.deadline)
    //   }
    // });
  
    // const getOtherContracts = contract.filters.contractsCreated('Others');
    // const OtherContracts = await contract.queryFilter(getOtherContracts);
    // const OtherData = OtherContracts.map((e) => {
    //   return {
    //     pid:parseInt(e.args.projectId),
    //     contractAddress:e.args.contractAddress,
    //     amt:ethers.utils.formatEther(e.args.amount),
    //     deadline:parseInt(e.args.deadline)
    //   }
    // });
     
       return{
        props:{
          AllData
        },
    revalidate: 10
       }
  
  
    }
  
 const HomeWrapper = styled.div`
    padding-top: 7rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  `
  const FilterWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 15px;
    background-color: ${(props) => props.theme.btnColor};
    
  `
  const Category = styled.div`
    padding: 10px 15px;
    background-color: ${(props) => props.theme.bgDiv};
    color:${(props) => props.theme.colorDiv};
    margin: 0px 15px;
    border-radius: 8px;
    font-family: 'Poppins';
    &:hover{
      background-color: ${(props) => props.theme.colorSec} ;
      color:${(props) => props.theme.color} ;
      transform: translateY(-10px);
      transition: transform 0.5s;
    }
    font-weight: normal;
    cursor: pointer;
  `
  const CardsWrapper = styled.div`
    
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 80%;
    margin-top: 25px;
    border: none;
  `
  const Card = styled.div`
    width: 25%;
    margin-top: 20px;
    /* border-radius: 2%; */
    border: solid black;
    &:hover{
      transform: translateY(-10px);
      transition: transform 0.5s;
    }
    
    &:not(:hover){
      transition: transform 0.5s;
    }
  `
  
  const Title = styled.h2`
    font-family: 'Roboto';
    font-size: 18px;
    margin: 2px 0px;
    background-color: ${(props) => props.theme.bgSubDiv};
    padding: 5px;
    cursor: pointer;
    font-weight: normal;
  `
  const CardData = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin: 2px 0px;
    padding: 5px;
    cursor: pointer;
    `
  const Text = styled.p`
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
    font-family: 'Roboto';
    font-size: 18px;
    font-weight: bold;
  `
  const Button = styled.button`
    padding: 8px;
    text-align: center;
    width: 100%;
    background-color: ${(props) => props.theme.btnColor};
    border: none;
    cursor: pointer;
    font-family: 'Roboto';
    text-transform: uppercase;
    &:hover{
      background-color: ${(props) => props.theme.colorSec} ;
      color:${(props) => props.theme.color} ;
      transform: translateY(-2px);
      transition: transform 0.5s;
    }
    color:${(props) => props.theme.colorDiv} ;
    font-size: 14px;
    font-weight: bold;

    `
    const TNavLinks=styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${(props) => props.theme.colorDiv};     
    text-decoration: none;
    &:hover{
    background-color: ${(props) => props.theme.colorSec} ;
    color:${(props) => props.theme.color} ;
    transform: translateY(-2px);
    transition: transform 0.5s;
  }
    height: max-content;
    width: max-content;
    font-family: 'Comfortaa';
    margin:7px;
    border-radius: 6px;
    padding: 2px 5px 5px;
    cursor: pointer;
    text-transform: uppercase;
     font-weight: bold ;
     font-size: medium;
    

`

const TextH=styled.p`
  margin-top: 0;
`
const TextHLast =styled.p`
   padding-top: 0.5rem;
   padding-bottom: 4rem;
`
const TopLeftWrap=styled.div`
  width:48%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 3rem;
`
const Caption=styled.h1`
   font-family: 'Oswald';
   font-size:1rem;
   font-weight: 300;
   font-style: bold;
   height: max-content;
   width: max-content;
   letter-spacing: 0.2rem;
   color:${(props) => props.theme.btnColor} ;
   padding-top: 2rem;
   padding-bottom: 2rem;
`
const Heading=styled.h1`
   font-family: 'Oswald';
   font-size:3.5rem;
   font-weight: 400;
   font-style: bold;
   height: max-content;
   width: max-content;
   letter-spacing: 0.5rem;
   color:${(props) => props.theme.btnColor} ;
`
const Paragraph=styled.p`
   margin:0;
   font-size: 1rem;
   padding: 0;
   font-weight: 500;
   text-align: center;
   font-family: 'Poppins';
   font-style: bold;
`
const ButtonWrap = styled.button`
margin-bottom: 10px;
  padding: 8px;
  text-align: center;
  width: max-content;
  background-color: ${(props) => props.theme.btnColor};
  border: none;
  cursor: pointer;
  font-family: 'Roboto';
  text-transform: uppercase;
  &:hover{
    background-color: ${(props) => props.theme.colorSec} ;
    color:${(props) => props.theme.color} ;
    transform: translateY(-2px);
    transition: transform 0.5s;
  }
  font-size: 14px;
  font-weight: bold;
  
  //transition: all 0.3s ease;
`
  
  export default allPatients