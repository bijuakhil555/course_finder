import  Card  from "./Components/card";
import Navbar from "./Components/navbar";
import "./App.css"
import Cardpage from "./Components/cardpage";
import Footer from "./Components/footer";


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Cardpage/>
      <Footer/>
    </div>
  );
}

export default App;
