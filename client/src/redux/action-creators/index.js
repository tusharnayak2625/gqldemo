export const register = ({token,error}) => async (dispatch) => {
    if(token) {
        dispatch({
            type: "register",
            payload: {
                user: token,
                error: null
            }
        });
    }

    if(error) {
        dispatch({
            type: "register",
            payload: {
                error: error
            }
        });
    }
}

export const login = ({token,error}) => async (dispatch) => {
    if(token) {
        dispatch({
            type: "login",
            payload: {
                user: token,
                error: null
            }
        });
    }
    
    if(error) {
        dispatch({
            type: "login",
            payload: {
                error: error
            }
        });
    }
}

export const profile = ({profile,error}) => async (dispatch) => {
    if(profile) {
        dispatch({
            type: "profile",
            payload: {
                profile: profile,
                error: null
            }
        });
    }
    
    if(error) {
        dispatch({
            type: "profile",
            payload: {
                error: error
            }
        });
    }
}

export const getAllQuotes = ({quotes,error}) => async (dispatch) => {
    if(quotes) {
        dispatch({
            type: "get-quotes",
            payload: {
                quotes: quotes,
                error: null
            }
        });
    }
    
    if(error) {
        dispatch({
            type: "get-quotes",
            payload: {
                error: error
            }
        });
    }
}

export const getQuote = ({quote,error}) => async (dispatch) => {
    if(quote) {
        dispatch({
            type: "get-quote",
            payload: {
                quote: quote,
                error: null
            }
        });
    }
    
    if(error) {
        dispatch({
            type: "get-quote",
            payload: {
                error: error
            }
        });
    }
}

export const addQuote = ({quotes,error}) => async (dispatch) => {
    if(quotes) {
        dispatch({
            type: "add-quote",
            payload: {
                quotes: quotes,
                error: null
            }
        });
    }
    
    if(error) {
        dispatch({
            type: "add-quote",
            payload: {
                error: error
            }
        });
    }
}

export const logout = ()=> async(dispatch)=> {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("all_quotes");
    dispatch({
        type: "logout"
    });
}