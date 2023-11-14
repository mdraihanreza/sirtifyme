export const getFromLocal=(name,default_value)=>{

    var l_value=localStorage.getItem(name) !== null ? JSON.parse(localStorage.getItem(name)):default_value;
    return l_value;
}


