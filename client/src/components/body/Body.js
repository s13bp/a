import React from 'react'
import {Switch, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'leaflet/dist/leaflet.css';
import './Book/index.css'


import Login from './auth/Login'
import Register from './auth/Register'
import ActivationEmail from './auth/ActivationEmail'
import NotFound from '../utils/NotFound/NotFound'

import ForgotPass from '../body/auth/ForgotPassword'
import ResetPass from '../body/auth/ResetPassword'

import Profile from '../body/profile/Profile'
import EditUser from '../body/profile/EditUser'

import Home from '../body/home/Home'
import GoBook from './Book/GoBook'
import Book from './Book/Book'
import MapDisplay from './nav/Nav'



import {useSelector} from 'react-redux'
import Crypto from './Paycrypto/Paycrypto'
import Checkout from './PayPal/Checkout';
import HowItWorks from './HowItWorks/HowItWorks';



function Body() {
    const auth = useSelector(state => state.auth)
    const {isLogged, isAdmin} = auth
    return (
        <section>
            <Switch>
                <Route path="/" component={Home} exact />
                

                <Route path="/GoBook" component={isLogged ? GoBook : NotFound} exact />
                <Route path="/Book" component={isLogged ? Book : NotFound} exact />
                
                
                <Route path="/Nav" component={isLogged ?  MapDisplay : NotFound} exact />
                <Route path="/PayPal" component={isLogged ?  Checkout : NotFound} exact />
                <Route path="/HowItWorks" component={isLogged ?  HowItWorks : NotFound} exact />
                
                
                <Route path="/Paycrypto" component={isLogged ? Crypto : NotFound} exact />

                <Route path="/login" component={isLogged ? NotFound : Login} exact />
                <Route path="/register" component={isLogged ? NotFound : Register} exact />

                <Route path="/forgot_password" component={isLogged ? NotFound : ForgotPass} exact />
                <Route path="/user/reset/:token" component={isLogged ? NotFound : ResetPass} exact />

                <Route path="/user/activate/:activation_token" component={ActivationEmail} exact />

                <Route path="/profile" component={isLogged ? Profile : NotFound} exact />
                <Route path="/edit_user/:id" component={isAdmin ? EditUser : NotFound} exact />

            </Switch>
        </section>
    )
}

export default Body
