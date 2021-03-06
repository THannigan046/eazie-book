import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import clientInvite from './clientInvite.saga';
import bookableItemSaga from './bookableItem.saga'
import fetchClients from './fetchClients.saga';
import deleteClientSaga from './deleteClient.saga';
import editClient from './editClient.saga';
import updateClientSaga from './updateClient.saga';
import categorySaga from './category.saga';
import fetchBookableItems from './fetchBookableItems.saga';
import linkItemSaga from './linkItem.saga';
import renterBooking from './renterbooking.saga';
import fetchCompanyName from './fetchCompanyName.saga';
import fetchSideBySideSage from './fetchSideBySide.saga';
import renterSaga from './renter.saga'
import clientSaga from './client.saga'
import clientItem from './clientItems.saga';
// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    bookableItemSaga(),
    updateClientSaga(),
    categorySaga(),
    clientSaga(),
    fetchBookableItems(),
    linkItemSaga(),
    renterBooking(),
    fetchCompanyName(),
    fetchSideBySideSage(),
    renterSaga(),
    clientInvite(),
    fetchClients(),
    deleteClientSaga(),
    editClient(),
    clientItem(),
  ]);
}
