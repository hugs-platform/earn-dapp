import { createSlice } from '@reduxjs/toolkit';

interface IContribution {
	contributions: any;
	pages: number;
	ownerContributions: any;
	ownerPages: number;
}

const initialState: IContribution = {
	contributions: [],
	pages: 0,
	ownerContributions: [],
	ownerPages: 0
};

const ContributionSlice = createSlice({
	name: 'contribution',
	initialState,
	reducers: {
		setContribution: (state, payload) => {
			state.contributions = payload.payload.contributions;
			state.pages = payload.payload.pages;
		},
		setOwnerContribution: (state, payload) => {
			state.ownerContributions = payload.payload.contributions;
			state.ownerPages = payload.payload.pages;
		},
	},
});

export const { setContribution, setOwnerContribution} = ContributionSlice.actions;

export default ContributionSlice.reducer;
