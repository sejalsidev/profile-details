import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import ProfileDetail from './ProfileDetail';
import UserData from './UserData';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/profiledetail" element={<ProfileDetail />} />
          <Route path="/userdetail" element={<UserData />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
