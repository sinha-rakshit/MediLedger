import styled from "styled-components";
import {ethers} from 'ethers';
import MediLedger from '../../artifacts/contracts/MediLedger.sol/MediLedger.json'
import Patient from '../../artifacts/contracts/MediLedger.sol/Patient.json'
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Link from 'next/link'
import { useRouter } from 'next/router';
import {TailSpin} from 'react-loader-spinner'
import {create as IPFSHTTPClient} from 'ipfs-http-client';
import lighthouse from '@lighthouse-web3/sdk'

const ipfs = IPFSHTTPClient({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' });

 export default function Detail({Data}) {
     const Router = useRouter();     

    const [uploadLoading, setUploadLoading] = useState(false);
    const [uploaded, setUploaded] = useState(false);
    const [buffer, setBuffer] = useState(null);
    const [fileUrl, setFileUrl] = useState();

   const [file, setFile] = useState(null);
   const [amt, setAmt] = useState(0);

   function getHash() {
        ipfs.files.add(Buffer.from(buffer), (error, result) => {
            if (error) {
                console.error(error)
                return
            }
            setFileUrl(result[0].hash);
    });
   }
   
   
   
   const FileHandler = (e) => {
        e.preventDefault();
         setFile(URL.createObjectURL(event.target.files[0]));
        
         const reader = new FileReader();
         reader.readAsArrayBuffer(event.target.files[0])
         reader.addEventListener("load", () => {
                    setBuffer(reader.result)
         })
   }
   
   const AmtHandler = (e) => {
        setAmt(e);
    }
    
   const uploadFiles = async (e) => {
     
    e.preventDefault();
    setUploadLoading(true);
    const formData = new FormData();
     formData.append('file', file);
     
      if(file !== null) {
        try {
          console.log(file);
          getHash();
          console.log(fileUrl)
          toast.success("Files Uploaded Sucessfully")
          setUploadLoading(false);
          setUploaded(true);
          } catch (error) {
            console.log(error)
            toast.warn(`Error Uploading File`);
          }
      }

      
      
   }
   
   const addBill = async () => {
     
     e.preventDefault();

     const provider = new ethers.providers.Web3Provider(window.ethereum);
     const signer = provider.getSigner();

     if(uploaded == false) {
            toast.warn("Files Upload Required")
     }else {
       setLoading(true);  
    
          const patient = new ethers.Patient(
            process.env.NEXT_PUBLIC_ADDRESS,
            Patient.abi,
            signer
          );
            
          const billamt = ethers.utils.parseEther(amt);
    
          const addData = await patient.addBill(
            fileUrl,
            billamt
          );
    
          await addData.wait();
     }
   }

  return (
    <DetailWrapper>
        
        <TopLeftWrap>
        <Paragraph>Documents will be uploaded here by</Paragraph>
        <Heading>OUR BEST DOCTORS</Heading>
        <Text><Paragraph>Empowering Physicians , Enhancing Patient Outcomes</Paragraph> 
        <Paragraph>Doctors At The Helm of HealthCare Transformation</Paragraph></Text>
        
        <Caption>
            Elevating Healthcare Standards
        </Caption>
        <Text><Paragraph>Secure Prescriptions , Seamless Billing , Simplified Workflow</Paragraph></Text>
        <ButtonWrap>In Just Few Clicks</ButtonWrap>
        <Text><Paragraph>Manage Everything through a simple form</Paragraph></Text>
       
        
    </TopLeftWrap>  
        <RightContainer>
           <FundsData>
                <Funds>
                    <FundTextTitle>Pateint Id</FundTextTitle>
                    <FundTextContent>{Data.pid}</FundTextContent>
                </Funds>
                <Funds>
                    <FundTextTitle>Patient Name</FundTextTitle>
                    <FundTextContent>{Data.name}</FundTextContent>
                </Funds>
            </FundsData>
            <FundsData>
            <Funds>
                <FundTextTitle>Patient Gender</FundTextTitle>
                  <FundTextContent>{Data.gender}</FundTextContent> 
              </Funds>    
              <Funds>
                <FundTextTitle>Pateint Wallet Id</FundTextTitle>
                  <FundTextContent>{Data.walletid.slice(0,6)}...{Data.walletid.slice(39)}</FundTextContent> 
              </Funds>  
            </FundsData> 
            
        <DonateSection>
          
          <Funds>
            <FormInput>
              <label>Enter Amount</label>
              <Input onChange={AmtHandler} type={'number'} placeholder="Enter bill amount"/>
            </FormInput>
          </Funds>
          
          <Funds>
            <FormInput>
              <label>Select Documents</label>
              <Input onChange={FileHandler} type={'file'} accept='*/*'/>
            </FormInput>
          </Funds>
          
        </DonateSection>
        <DonateSection>
            {uploadLoading == true ? <Button><TailSpin color='#fff' height={20} /></Button> :uploaded == false ? 
                <Funds><Button onClick={uploadFiles}>
                    Upload Files to IPFS
                </Button></Funds>
                : <Funds><Button style={{cursor: "no-drop"}}>Files uploaded Sucessfully</Button></Funds>
          }
          <Funds><Button onClick={addBill}>
              Add Documents
          </Button></Funds>
         </DonateSection>
        </RightContainer>
        
    </DetailWrapper>
  );

  }
export async function getStaticPaths(){
  
    const provider=new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_RPC_URL
    );

    const contract =new ethers.Contract(
        process.env.NEXT_PUBLIC_ADDRESS,
        MediLedger.abi,
        provider
    );

    const getAllPatients = contract.filters.allPatient();
    const AllPatients = await contract.queryFilter(getAllPatients);
    

    return{
        paths: AllPatients.map((e)=> ({
            params:{
                address:e.args.contractAddress.toString(),
            }
        })),
        fallback:"blocking"
    }
}

export async function getStaticProps(context){
    const provider=new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_RPC_URL
    );

    const patient =new ethers.Contract(
        context.params.address,
        Patient.abi,
        provider
    );

    const pid = await patient.pid();
    const name=await patient.name();
     const bloodgrp=await patient.bloodgrp();
     const height=await patient.height();
     const weight=await patient.weight();
    const walletid = await patient.walletid();
    const allergies = await patient.allergies();
     const gender=await patient.gender();
     const pendingRefund=await patient.pendingRefund();


     const Data={
        address:context.params.address,
        pid:parseInt(pid),
        name,
        pendingRefund:ethers.utils.formatEther(pendingRefund),
         gender,
         allergies,
        bloodgrp,
         height:parseInt(height),
         weight:parseInt(weight),
        walletid
    }



    return {
        props:{
            Data
        },
    revalidate: 10
    }

}





const FundTextContent = styled.p`
  margin: 2px;
  padding: 0;
  font-family: "Poppins";
  font-size: normal;
`;

const Update=styled.div`
width: 100%;
`
const DetailWrapper = styled.div`
  
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  width: 98%;
`;
const LeftContainer = styled.div`
  width: 45%;
  padding-top: 5rem;
  
`;
const RightContainer = styled.div`
  width: 50%;
  padding-top: 5rem;
`;
const BottomContainer=styled.div`
  width: 50%;
  padding-top: 10rem;
  width:48%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
`

const Title = styled.h1`
  padding-bottom: 3rem;
  margin: 0;
  text-align: center;
  font-family: "Comfortaa";
  font-size: x-large;
  color: ${(props) => props.theme.color};
`;
const DonateSection = styled.div`
  display: flex;
  width: 100%;
  justify-content:space-between;
  align-items: center;
  margin-top: 10px;
`;
const Textarea = styled.textarea`
  padding: 8px 15px;
  background-color: ${(props) => props.theme.detail};
  color: ${(props) => props.theme.color};
  //border: none;
  border-radius: 8px;
  //outline: none;
  ::placeholder{
    color:${(props) => props.theme.colorDiv} ;
  }
  font-size: large;
`;
const Donate = styled.button`
  display: flex;
  justify-content: center;
  width: 45%;
  padding: 15px;
  color: white;
  background-color: ${(props) => props.theme.btnDetail};
  border: none;
  cursor: pointer;
  font-weight: bold;
  font-size: large;
`;

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

const Text=styled.p`
  margin-top: 0;
`
const TopLeftWrap=styled.div`
padding-top: 10rem;
  width:48%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  background-color: ${(props) => props.theme.btnDetail};
   color:${(props) => props.theme.colorDiv} ;
  border: none;
  cursor: pointer;
  font-family: 'Roboto';
  text-transform: uppercase;
  &:hover{
    background-color: ${(props) => props.theme.colorSec} ;
    transform: translateY(-2px);
    transition: transform 0.5s;
  }
  font-size: 14px;
  font-family: 'Comfortaa';
`


const FundsData = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;
const Funds = styled.div`
  width: 45%;
  background-color: ${(props) => props.theme.detail};
  padding: 8px;
  text-align: center;
`;
const FundTextTitle = styled.p`
  margin: 2px;
  padding: 0;
  font-family: "Poppins";
  font-size: normal;
  color:${(props) => props.theme.colorDiv} ;
`;

const FormInput = styled.div`
  display:flex ;
  flex-direction:column;
  font-family:'poppins';
  margin-top:10px ;
`
const Input = styled.input`
  padding:15px;
  color:${(props) => props.theme.color} ;
  margin-top:4px;
  ::placeholder{
    font-size: smaller;
    color: lightslategrey;
  }
  border:1px solid ${(props) => props.theme.bgDiv};
  outline:none;
  font-size:medium;
  width:90% ;
`

const Button = styled.button`
    
    text-align: center;
    width: 100%;
    background-color: ${(props) => props.theme.btnColor};
    border: none;
    cursor: pointer;
    font-family: 'Comfortaa';
    text-transform: uppercase;
    border-radius: 5px;
    height: 3.5rem;
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