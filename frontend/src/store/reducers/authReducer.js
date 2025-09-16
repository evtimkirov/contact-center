export const initialAuthState = {
    user: null,
    loading: false,
    error: null,
};

export function authReducer(state, action) {
    switch (action.type) {
        case "SET_USER":
            return { ...state, user: action.payload, error: null };
        case "CLEAR_USER":
            return { ...state, user: null };
        default:
            return state;
    }
}
