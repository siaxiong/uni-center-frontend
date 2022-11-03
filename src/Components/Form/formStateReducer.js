export const formStateReducer = ({state, action}) => {
    switch(action.type){
        case "SIGN_IN": {
            return !action.payload.missingFields
        }
        case "SIGN_UP": {
            return !action.payload.missingFields
        }
    }
}