import React , { useEffect } from 'react'
import { db } from '../firebase'
import { collection, getDocs } from "firebase/firestore"; 
import { BrowserRouter , Switch , Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute';

import Signup from './Signup';
import Home from './Home';
import Login from './Login'

function App() {

   const helper = async () => {
    const querySnapshot = await  getDocs(collection(db, "demo-app"));
    querySnapshot.forEach((doc) => {
        console.log( doc.data().Name )
    });
   }
   
   useEffect(() => {
    helper();
   }, [] )
   
    return (
        <div>
            < BrowserRouter>
                <Switch>
                    <PrivateRoute exact path="/" component={Home} />
                    <Route path="/signup" component= {Signup} />
                    <Route path="/login" component={Login} />
                </Switch>
            </BrowserRouter>
        </div>
    )

}

export default App;