import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null, 
        isFetching: false,
        error:false
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
             // جايه منين بقي من عند
            //apicalls => dispatch(loginSuccess(res.data));
            //res.data => _id(pin):"633aa06c8eda7bf84e3864fc"
            //username(pin):"ahmed"
            // email(pin):"ahmed@gmail.com"
            // isAdmin(pin):true
            // createdAt(pin):"2022-10-03T08:42:20.512Z"
            // updatedAt(pin):"2022-10-03T09:29:52.938Z"
            // __v(pin):0
            // accessToken(pin):"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzM2FhMDZjOGVkYTdiZjg0ZTM4NjRmYyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2NDg3NzU5MiwiZXhwIjoxNjY1MTM2NzkyfQ.EUYUcs6-iafspj6o1AURPJRwGRbaxdXPj0SAPQ8Otr8";

            // isFetching(pin):false
            // error(pin):false
        }, 
        loginFailure: (state) => {
            state.isFetching = false;

        }
    }
});

export const { loginStart, loginSuccess, loginFailure } = userSlice.actions;
export default userSlice.reducer;
