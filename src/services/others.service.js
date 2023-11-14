import axios from 'axios';
// import TokenHelper from './TokenHelper';
const REACT_APP_API_SERVICE_URL = process.env.REACT_APP_API_SERVICE_URL;

const headers = {
    headers: {
        "Content-Type": "application/json",
    }
}

class OthersService {


    about() {
        return axios.get(REACT_APP_API_SERVICE_URL + `/getAboutData`, headers);
    }
    
    privacy() {
        return axios.get(REACT_APP_API_SERVICE_URL + `/getPrivacyData`, headers);
    }
    aboutcountuser() {
        return axios.get(REACT_APP_API_SERVICE_URL + `/getAboutusUserCount`, headers);
    }

}


// eslint-disable-next-line import/no-anonymous-default-export
export default new OthersService();
