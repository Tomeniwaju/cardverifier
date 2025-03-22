import './App.css';
import Navbar from './Components/Navbar';
import About from './Components/About';
import Contact from './Components/Contact';
import Home from './Components/Homepage';
import { Route, Routes } from 'react-router-dom';
import { useRef } from 'react';

function App() {
  const informationSectionRef = useRef(null);
  
  return (
    <>
      <Navbar informationSectionRef={informationSectionRef} />
      <div className='container'>
        <Routes>
          <Route path='/' element={<Home informationSectionRef={informationSectionRef} />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

// function HeaderTab() {
//   return (
//     <div className="header-tab">
//       Fast. Secured. Reliable.
//     </div>
  // );
// }