import { useState } from 'react'
import './App.css';
import "./main.jsx";
import Dashboard from './pages/Dashboard.jsx';
import Signin from './pages/Signin.jsx';
import Signup from './pages/Signup.jsx';
import Update from './pages/Update.jsx';
import Result from './pages/Result.jsx';
import Welcome from './pages/Welcome.jsx';
import GamePage from './pages/GamePage.jsx';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import SettingsComp from './components/SettingsComp.jsx';

// Improvements to make in the code base

// Remove redundant dependencies from all the files    { DONE }
// Add a taskbar with a settigs menu to update the player profile { DONE }
// Make the user pfp as the users Names first letter while mounting the  componenet { eliminated }
// Give user direction to choose another part of the array when the choice made is not correct : make a direct backend call to get the warning
// custom endpoint for getting the warnings regarding the game
// Add Custom warnings for incorrect credentials or missing credentials in the auth pages
// Add an update component to the codebase as the existing one is a dummy component.
// Add the node_modules and sensitive passwords to the gitignore to protect the produciton database.


//Optional : make the logo go red or green depending upon the choice user makes to add more user-friendly UI
// Add salting and hashing to the passsword to make the passwords more secure.



function App() {
  

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path ='/' element={<Dashboard/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path ='/signin' element={<Signin/>}/>
        <Route path='/update' element={<Update/>}/>
        <Route path='/result' element={<Result/>}/>
        <Route path='/Welcome'element={<Welcome/>}/>
        <Route path='/game' element={<GamePage/>}/>
       
       
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
