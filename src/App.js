import Navbar from "./Components/navbar";
import "./App.css"
import Cardpage from "./Components/cardpage";
import Footer from "./Components/footer";
import { Provider, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import store from "./redux/store";
import { fetch_subjects } from './redux/Subjects/Subjects/SubjectActions';

function App() {

  const dispatch =useDispatch()

  useEffect(()=>{
    dispatch(fetch_subjects())
  },[])


  return (
    <Provider store={store}>
    <div className="App">
      <Navbar/>
      <Cardpage />
      <Footer/>
    </div>
    </Provider>
  );
}

export default App
