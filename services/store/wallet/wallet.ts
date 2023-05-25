import { createSlice } from '@reduxjs/toolkit';

interface IWallet {
	user: any;
	isAdmin: boolean;
	notifications: any;
}

const initialState: IWallet = {
	user: null,
	notifications: [],
	isAdmin: false
};

const WalletSlice = createSlice({
	name: 'wallet',
	initialState,
	reducers: {
		setNotifications: (state, payload) => {
			state.notifications = payload.payload.payload;
		},
		setIsAmin: (state, payload) => {
			state.isAdmin = payload.payload.payload;
		},
		setUser: (state, payload) => {
			state.user = payload.payload.user;
		},
	},
});

export const { setUser,  setNotifications} = WalletSlice.actions;

export default WalletSlice.reducer;
