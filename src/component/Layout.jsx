import React, { useEffect } from 'react'
import Header from './Header';
import Footer from './Footer';
import { MainContainer } from '../styles/layout_style';
import { Toaster } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { apiGet } from '../ApiServices/apiServices';
import { userAction } from '../store/userSlice';

const Layout = ({ children }) => {
  const {partyId}=useSelector((state)=>state.userReducer);
  useEffect(()=>{
    window.scrollTo({
     top:0,
    })
  },[])
// const dispatch=useDispatch();
// const getCredentials=async()=>{
//   if(partyId===null){
//     const response=await apiGet('/user/get-credentials');
//       console.log(response);
//       dispatch(userAction.addToUserLogin({partyId:response.partyId,role:response.role}));
//     }
//   }
//   useEffect(()=>{
//     getCredentials();
//   },[])
  return (
    <>
      <Header />
      <Toaster richColors/> 
      <MainContainer>{children}</MainContainer>
      <Footer />
    </>
  )
}

export default Layout
