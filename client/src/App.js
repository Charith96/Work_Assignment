import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";

//import components
import ViewMembers from "./Components/ViewMembers";
import AddMember from "./Components/AddMember";
import EditMember from "./Components/EditMember";


function App() {
  return (
    <BrowserRouter>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
      <div>
        <Routes>
          <Route path="/" element={< ViewMembers />} />
          <Route path="/members" element={< AddMember />} />
          <Route path="/members/:id" element={< EditMember />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
