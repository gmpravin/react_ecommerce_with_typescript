import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import root from './component/Reducer/rootReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// const state = [];

// function saveTolocalStorage(state) {
//   try {
//     const serialState = JSON.stringify(state);
//   } catch (error) {
//     console.log(error);
//   }
// }

// function localfromLocalstorage() {
//   try {
//     const serializedState = localStorage.getItem('state');
//     if (serializedState === null) {
//       return undefined;
//     }
//     return JSON.parse(serializedState);
//   } catch (error) {
//     return undefined;
//   }
// }

// const persistConfig = {
//   key: 'root',
//   storage,
// };
// const persistedReducer = persistReducer(persistConfig, rootReducer)
// const persitentState = localfromLocalstorage();
//

export let store = createStore(
  root,
  composeWithDevTools(applyMiddleware(thunk)),
);
// export let persistor = persistStore(store);
