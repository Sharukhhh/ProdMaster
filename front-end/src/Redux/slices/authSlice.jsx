import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    endUserInfo: null
};

const authSlice = createSlice ({
    name: 'prodMaster_auth',
    initialState,

    reducers: {

        setUserDetailsToStore: (state , action) => {
            state.endUserInfo = action.payload;
        },

        removeUserDetailsFromStore: (state) => {
            localStorage.removeItem('ProdUsertoken');
            state.endUserInfo = null;
        }
    }
});

export const {setUserDetailsToStore , removeUserDetailsFromStore} = authSlice.actions;
export default authSlice.reducer;