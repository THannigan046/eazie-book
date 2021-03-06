import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import RenterHistory from '../RenterHistory/RenterHistory'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
// moved CategoryInput into InviteClient.jsx
// import CategoryInput from '../CategoryInput/CategoryInput'
import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import InviteClient from '../InviteClient/InviteClient';
import BookableItem from '../BookableItem/BookableItem';
import AddBookableItem from '../AddBookableItem/AddBookableItem'
import EditBookableItemForm from '../EditBookableItemForm/EditBookableItemForm'
import ViewBookableItem from '../ViewBookableItem/ViewBookableItem';
import ClientTable from '../ClientTable/ClientTable';
import AllTerrainVehicles from '../AllTerrainVehicles/AllTerrainVehicles';
import SideBySide from '../AllTerrainVehicles/SideBySide/SideBySide';
import ATV from '../AllTerrainVehicles/ATV/ATV';
import Watercraft from '../Watercraft/Watercraft';
import Jetski from '../Watercraft/Jetski/Jetski';
import Boat from '../Watercraft/Boat/Boat';
import Pontoon from '../Watercraft/Pontoon/Pontoon';
import ClientBookableItems from '../ClientBookableItems/ClientBookableItems';
import ClientDetailItem from '../ClientDetailItem/ClientDetailItem';
import BookableItemDetail from "../BookableItemDetail/BookableItemDetail";
import RenterReviewPage from '../RenterReviewPage/RenterReviewPage';
import ThankYou from '../ThankYou/ThankYou';
import BookableItemList from '../BookableItemsList/BookableItemsList';
import RenterInfo from '../RenterInfo/RenterInfo';
import AddPhoto from '../AddPhoto/AddPhoto';
import AcctInfo from '../AcctInfo/AcctInfo'

import './App.css';

export default function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <div>
      <Router>
      <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          {/* shows AboutPage at all times (logged in or not) */}
          <Route exact path="/about">
            <AboutPage />
          </Route>

          <Route exact path='/acctInfo'>
            <AcctInfo />
          </Route>

          {/* shows AboutPage at all times (logged in or not) */}
          {/* <Route exact path="/viewBookableItem/:id">
            <ViewBookableItem />
          </Route> */}

          <ProtectedRoute exact path="/renterInfo">
            <RenterInfo />
          </ProtectedRoute>

          {/* ROUTES FOR ADMIN */}

          {/*
            For protected routes, the view could show one of several things on
            the same route.  Visiting localhost:3000/user will show the UserPage
            if the user is logged in.  If the user is not logged in, the
            ProtectedRoute will show the LoginPage (component).  Even though it
            seems like they are different pages, the user is always on
            localhost:3000/user 
          */}
          {/* logged in shows UserPage else shows LoginPage */}
          <ProtectedRoute exact path="/user">
            <UserPage />
          </ProtectedRoute>

          {/* ROUTE for client invite page */}
          <ProtectedRoute exact path='/admin/invite'>
            <InviteClient />
          </ProtectedRoute>

          {/* ROUTE for client table */}
          <ProtectedRoute exact path="/clients">
            <ClientTable />
          </ProtectedRoute>

          {/* ROUTE for bookableItem page */}
          <ProtectedRoute exact path="/viewBookableItem/:id">
            <ViewBookableItem />
          </ProtectedRoute>

          {/* ROUTE for add bookable item */}
          <ProtectedRoute exact path="/addBookableItem/:id">
            <AddBookableItem />
          </ProtectedRoute>

          {/* ROUTE for editing an item */}
          <ProtectedRoute exact path="/editBookableItemForm/:id">
            <EditBookableItemForm />
          </ProtectedRoute>

          <ProtectedRoute exact path='/renterHistory'>
            <RenterHistory />

          </ProtectedRoute>

          <ProtectedRoute exact path="/admin/categoryInput">
            {/* <CategoryInput /> */}
          </ProtectedRoute>

          <ProtectedRoute exact path="/addPhotos/:id">
            <AddPhoto />
          </ProtectedRoute>

          {/* logged in shows InfoPage else shows LoginPage */}
          <ProtectedRoute exact path="/info">
            <Route>
              <EditBookableItemForm />
            </Route>

            <Route>
              <InfoPage />
            </Route>
          </ProtectedRoute>

          {/* ROUTES FOR CLIENT */}

          <ProtectedRoute exact path="/clientBookableItems">
              <ClientBookableItems />
          </ProtectedRoute>

          {/* ROUTE for specific client bookable items */}
          <ProtectedRoute exact path="/clientBookableItems/:id">
            <ClientDetailItem />
          </ProtectedRoute>

          {/* ROUTES FOR RENTER */}

          <Route exact path='/renterHistory'>
          {user.authLevel === 'renter' ?
            
            <RenterHistory />
            :

            <Redirect to ='/user'/>
          }
            
          </Route>

          <Route exact path="/watercraft">
          {user.authLevel === 'renter' ?
            
            <Watercraft />
            :
            
            <Redirect to ='/user'/>
          }
            
          </Route>

          {/* ROUTE for renter jetski's */}
          <Route exact path="/jetski/:jetskiId">
          {user.authLevel === 'renter' ?
            
            <Jetski />
            :
            <Redirect to ='/user'/>
            
          }
            
          </Route>

          {/* ROUTE for renter boat's */}
          <Route exact path="/boat/:boatId">
          {user.authLevel === 'renter' ?
            
            <Boat />
            :
            <Redirect to ='/user'/>
            
          }
            
          </Route>

          <ProtectedRoute exact path='/bookableItemList'>
          {user.authLevel === 'renter' ?
            
            <BookableItemList />
            :
            <Redirect to ='/user'/>
            
          }
            
          </ProtectedRoute>

          <Route exact path="/detail/:id">
          {user.authLevel === 'renter' ?
            <BookableItemDetail />

            :
            <Redirect to ='/user'/>
            
          }
            
          </Route>

          <Route exact path="/pontoon/:pontoonId">
          {user.authLevel === 'renter' ?
            
            <Pontoon />
            :

            <Redirect to ='/user'/>
          }
            
          </Route>

          <Route exact path='/allTerrain'>
          {user.authLevel === 'renter' ?
            
            <AllTerrainVehicles />
            :

            <Redirect to ='/user'/>
          }
            
          </Route>

          <Route exact path='/sideBySide/:sideBySideId'>
          {user.authLevel === 'renter' ?
            
            <SideBySide /> 
            :
            <Redirect to ='/user'/>
                       
          }
           
          </Route>

          {/* ROUTE for renter ATV's */}
          <Route exact path='/ATV/:ATV'>
          {user.authLevel === 'renter' ?
            
            <ATV />
            :

            <Redirect to ='/user'/>           
          }
            
          </Route>

          {/* END OF ROUTES FOR RENTER */}
          {/* {user.authLevel === 'renter' ?
            <Redirect to ='/user'/>

            :

            
          } */}

          {/*  If the user is already logged in, redirect to the /user page
              Otherwise, show the login page */}
          <Route exact path="/login" >
            {user.id ? <Redirect to="/user" /> : <LoginPage />}
          </Route>

          {/* If the user is already logged in, redirect them to the /user
               page Otherwise, show the registration page */}
          <Route exact path="/registration">
            {user.id ? <Redirect to="/user" /> : <RegisterPage />}
          </Route>


          <Route exact path="/renterReviewPage/:id">
          {user.authLevel === 'renter' ?
             <RenterReviewPage />
            :
            <Redirect to ='/user'/>
           
          }
          </Route>

          <Route exact path="/thankyou/:id">
          {user.authLevel === 'renter' ?
             <ThankYou /> 
            :
            <Redirect to ='/user'/>
             
          }
          </Route>

          <Route exact path="/home">
            {user.id ? <Redirect to="/user" /> : <LandingPage />}
          </Route>
          <ProtectedRoute exact path='/makeAReservation'>
            <LandingPage />
          </ProtectedRoute>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>

        </Switch>
      </Router>
      <Footer />
    </div>
  );
}
