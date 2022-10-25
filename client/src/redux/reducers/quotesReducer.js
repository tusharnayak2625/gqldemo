let isQuotes = null;

if(!localStorage.getItem("all_quotes")) {
    isQuotes = null;
}
else {
    isQuotes = JSON.parse(localStorage.getItem("all_quotes"));
}

const initState= {
    quotes: isQuotes,
    quote: null,
    isLoading: false
}

const quoteReducer = (state=initState,action)=> {
    if(action.type === "quotes-loading") {
        return {
            ...state,
            isLoading: true
        }
    }
    else if(action.type === "get-quotes") {
        const {error,quotes} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return  {
            ...state,
            quotes,
            isLoading: false
        }
    }
    else if(action.type === "get-quote") {
        const {error,quote} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return  {
            ...state,
            quote,
            isLoading: false
        }
    }
    else if(action.type === "add-quote") {
        const {error,quotes} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return  {
            ...state,
            quotes,
            isLoading: false
        }
    }
    else if(action.type === "logout") {
        return  {
            ...state,
            quotes: null,
            quote: null,
            isLoading: false
        }
    }
    else {
        return state;
    }
}

export default quoteReducer;