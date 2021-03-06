import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import clientInvite from './clientInvite.reducer';
import bookableItem from './bookableItem.reducer';
import selectedBookableItem from './selectedBookableItem.reducer';
import clients from './clients.reducer';
import itemList from './ItemNames.reducer';
import categoryList from './category.reducer';
import activeClient from './activeClient.reducer';
import companyName from './companyName.reducer';
import sideBySide from './sideBySide.reducer';
import clientSelectedItem from './setClientDetailItem.reducer';
import clientList from './clientList.reducer';
import renter from './renter.reducer';
import photos from './photos.reducer';
import renterBooking from './renterBooking.reducer';
import selectedClientItem from './selectedClientItem.reducer';
import singleItemPhoto from './singleItemPhoto.reducer';



// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  clientInvite,
  user,
  bookableItem, // will have an id and username if someone is logged in
  clients,
  itemList, // for the Autocomplete on the category input form
  categoryList, //stores all of the categories in the category table
  selectedBookableItem, // selecting this bookableItem by ID to be edit
  activeClient,
  companyName,
  sideBySide,
  clientSelectedItem,
  clientList,
  activeClient,
  renterBooking,
  renter,
  photos,
  selectedClientItem,
  singleItemPhoto
});

export default rootReducer;
