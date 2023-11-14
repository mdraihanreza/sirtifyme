import React, { createContext, useReducer } from "react";
import { getFromLocal } from "./store_comm_fnc";

const InitialState = {
    id: 0,
    name: "",
    email: "",
    dial_code: "",
    only_mobile_no: "",
    tokendata: "",
    user_type: "",
    sub_user_type: getFromLocal("sub_user_type", ""),
    testimonial_id: getFromLocal("testimonial_id", 0),
    dreamjob_id: getFromLocal("dreamjob_id", 0),
    faq_id:getFromLocal("faq_id", 0)

};

function reducer(state, action) {
    switch (action.type) {
        case "id":
            return {
                ...state,
                id: action.value,
            };
        case "user_type":
            return {
                ...state,
                user_type: action.value,
            };
        case "sub_user_type":
            var local_value = JSON.stringify(action.value);
            localStorage.setItem("sub_user_type", local_value)
            return {
                ...state,
                sub_user_type: action.value,
            };
        case "testimonial_id":
            var local_value = JSON.stringify(action.value);
            localStorage.setItem("testimonial_id", local_value)
            return {
                ...state,
                testimonial_id: action.value,
            };
        case "dreamjob_id":
            var local_value = JSON.stringify(action.value);
            localStorage.setItem("dreamjob_id", local_value)
            return {
                ...state,
                dreamjob_id: action.value,
            };
        case "faq_id":
            var local_value = JSON.stringify(action.value);
            localStorage.setItem("faq_id", local_value)
            return {
                ...state,
                faq_id: action.value,
            };
        case "tokendata":
            return {
                ...state,
                tokendata: action.value,
            };
        case "name":
            return {
                ...state,
                name: action.value,
            };
        case "email":
            return {
                ...state,
                email: action.value,
            };

        case "dial_code":
            return {
                ...state,
                dial_code: action.value,
            };

        case "only_mobile_no":
            return {
                ...state,
                only_mobile_no: action.value,
            };
        case "reset":
            return { ...InitialState };

        default:
            return { ...state };
    }
}

export const userContext = createContext();

function Store({ children }) {
    const [user, dispatch] = useReducer(reducer, InitialState);


    return (
        <userContext.Provider value={{ user, dispatch }}>
            {children}
        </userContext.Provider>
    );
}

export default Store;
