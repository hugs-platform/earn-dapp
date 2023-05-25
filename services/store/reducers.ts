import { combineReducers, createStore } from 'redux';

import wallet from './wallet/wallet';
import contributions from './contribution/contribution';

const rootReducer = combineReducers({
	wallet,
	contributions,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
