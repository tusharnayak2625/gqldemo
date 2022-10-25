let isUser = null;
let isProfile = null;

if(!localStorage.getItem("auth_token")) {
    isUser = null;
}
else {
    isUser = localStorage.getItem("auth_token");
}

if(!localStorage.getItem("user_profile")) {
    isProfile = null;
}
else {
    isProfile = JSON.parse(localStorage.getItem("user_profile"));
}

const initState= {
    user: isUser,
    profile: isProfile,
    isLoading: false
}

const userReducer = (state=initState,action)=> {
    if(action.type === "user-loading") {
        return {
            ...state,
            isLoading: true
        }
    }
    else if(action.type === "register") {
        const {error,user} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return  {
            ...state,
            user,
            isLoading: false
        }
    }
    else if(action.type === "login") {
        const {error,user} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return  {
            ...state,
            user,
            isLoading: false
        }
    }
    else if(action.type === "profile") {
        const {error,profile} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return  {
            ...state,
            profile,
            isLoading: false
        }
    }
    else if(action.type === "logout") {
        return  {
            ...state,
            user: null,
            profile: null,
            isLoading: false
        }
    }
    else {
        return state;
    }
}

export default userReducer;