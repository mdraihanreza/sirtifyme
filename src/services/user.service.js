import axios from 'axios';
import TokenHelper from '../pages/TokenHelper';
const REACT_APP_API_SERVICE_URL = process.env.REACT_APP_API_SERVICE_URL;

const headers = {
  headers: {
    // "Content-Type": "multipart/form-data",
    "token": localStorage.getItem("tokendata")
  }
}
const headerdata = {
  headers: {
    "token": TokenHelper.getToken(),
    "Content-Type": "application/json"
  }
}

class UserService {


  async postSignup(data) {
    return axios.post(REACT_APP_API_SERVICE_URL + '/signup', data, TokenHelper.getHeader());
  }
  
  async login(data) {
    return axios.post(REACT_APP_API_SERVICE_URL + '/login', data, {
      headers: {
        "Content-Type": "application/json"
      },
    });
  }
  async emailconfirm(data) {
    return axios.post(REACT_APP_API_SERVICE_URL + '/emailconfirm', data, {
      headers: {
        "Content-Type": "application/json"
      },
    });
  }
//   getotpmatch(payload) {
// console.log(payload)
//     return axios.get(REACT_APP_API_SERVICE_URL + '/getotpmatch?otp='+ payload, TokenHelper.getHeader());
//   }
async postOtpMatch(data) {
  return axios.post(REACT_APP_API_SERVICE_URL + '/postotpmatch', data, {
    headers: {
      "Content-Type": "application/json"
    },
  });
}
async Changepassword(data) {

  return axios.post(REACT_APP_API_SERVICE_URL + '/changePassword', data, TokenHelper.getHeader());
}
  async socialLogin(data) {
    return axios.post(REACT_APP_API_SERVICE_URL + '/socialLogin', data, {
      headers: {
        "Content-Type": "application/json"
      },
    });
  }
  getSearchProvider(payload) {
    return axios.get(REACT_APP_API_SERVICE_URL + `/searchProvider?search_word=${payload.search_word}&user_id=${payload.user_id}`, TokenHelper.getHeader());
    // return axios.get(REACT_APP_API_SERVICE_URL + '/searchProvider?search_word=' + payload & 'user_id='+data, TokenHelper.getHeader());

  }
  async sendConnection(data) {

    return axios.post(REACT_APP_API_SERVICE_URL + '/sentConnectionRequest', data, {
      headers: {
        "token": localStorage.getItem("tokendata"),
        // "Content-Type": "application/json"
      }
    });
  }
  
  async postPayment(data) {
    console.log(localStorage.getItem("tokendata"),'localStorage.getItem("tokendata")')
    return axios.post(REACT_APP_API_SERVICE_URL + '/payment', data,{
      headers: {
        "token": localStorage.getItem("tokendata"),
        // "Content-Type": "application/json"
      },
    });
    
  }
  getPaymentDetails(payload) {

    return axios.get(REACT_APP_API_SERVICE_URL + '/getPaymentDetails?token=' + payload, TokenHelper.getHeader());
  }
  
  getConnection(payload) {

    return axios.get(REACT_APP_API_SERVICE_URL + '/providerConnectionRequestList?token=' + payload, TokenHelper.getHeader());
  }
  getConnectionrequestlist(payload) {

    return axios.get(REACT_APP_API_SERVICE_URL + '/allConnectionRequestList?token=' + payload, TokenHelper.getHeader());
  }
  allConnectionlist(payload) {

    return axios.get(REACT_APP_API_SERVICE_URL + '/acceptConnectionList?token=' + payload, TokenHelper.getHeader());
  }
  getNonProviderConnection(payload) {

    return axios.get(REACT_APP_API_SERVICE_URL + '/nonProviderConnectionList?token=' + payload, TokenHelper.getHeader());
  }
  async acceptRequest(data) {

    return axios.post(REACT_APP_API_SERVICE_URL + '/acceptConnectionRequest', data, {
      headers: {
        "token": localStorage.getItem("tokendata"),
      },
    });
  }
  async cancelRequest(data) {

    return axios.post(REACT_APP_API_SERVICE_URL + '/rejectConnectionRequest', data, {
      headers: {
        "token": localStorage.getItem("tokendata"),
      },
    });
  }

  // axios.get(REACT_APP_API_SERVICE_URL + `/order?customer_id=${payload.customer_id}&order_status=${payload.order_status}&order_no=${payload.order_no}&form_date=${payload.form_date}&to_date=${payload.to_date}&limit=${payload.limit}&page_no=${payload.page_no}`,TokenHelper.getHeader());

  // getProviderProfile(payload) {

  //   return axios.get(REACT_APP_API_SERVICE_URL + '/getPersonalDetails?token=' + payload, TokenHelper.getHeader());
  // }
  getProfile(payload) {

    return axios.get(REACT_APP_API_SERVICE_URL + '/getPersonalDetails?token=' + payload, TokenHelper.getHeader());
  }
  async updateprofile(data) {
    return axios.post(REACT_APP_API_SERVICE_URL + '/updatePersonalDetails', data, TokenHelper.getHeader());
  }
  async updatelicense(data) {
    return axios.post(REACT_APP_API_SERVICE_URL + '/updateLicenseDetails', data, {
      headers: {
        "token": localStorage.getItem("tokendata"),
        "Content-Type": "multipart/form-data",
      },
    });
  }
  async updatelicensedata(data) {

    console.log("TokenHelper.getToken()  ", TokenHelper.getToken());
    return axios.post(REACT_APP_API_SERVICE_URL + '/updateAdditionalLicenseDetails', data, TokenHelper.getHeader());
  }

  getLicense(payload) {

    return axios.get(REACT_APP_API_SERVICE_URL + '/getLicenseDetails?token=' + payload, TokenHelper.getHeader());
  }

  getCertificate(payload) {

    return axios.get(REACT_APP_API_SERVICE_URL + '/getCertificateDetails?token=' + payload, TokenHelper.getHeader());
  }
  async updatecertificate(data) {
    return axios.post(REACT_APP_API_SERVICE_URL + '/updateCertificateDetails', data, {
      headers: {
        "token": localStorage.getItem("tokendata"),
        // "Content-Type": "application/json"
      }
    });
  }
  async updatecertificateAdditional(data) {
    return axios.post(REACT_APP_API_SERVICE_URL + '/updateAdditionalCertificateDetails', data, {
      headers: {
        "token": localStorage.getItem("tokendata"),
        "Content-Type": "multipart/form-data",
      },
    });
  }
  // getEmployement(payload) {

  //   return axios.get(REACT_APP_API_SERVICE_URL + '/getEmploymentDetails?token=' + payload, TokenHelper.getHeader());
  // }
  // async updateEmployement(data) {
  //   return axios.post(REACT_APP_API_SERVICE_URL + '/updateEmploymentDetails', data, {
  //     headers: {
  //       "token": localStorage.getItem("tokendata"),
  //       "Content-Type": "application/json"
  //     },
  //   });
  // }
//employement section start
getEmployement(payload) {

  return axios.get(REACT_APP_API_SERVICE_URL + '/getEmployementDetails?token=' + payload, TokenHelper.getHeader());
}
async updateEmployement(data) {
  return axios.post(REACT_APP_API_SERVICE_URL + '/updateEmployementDetails', data, {
    headers: {
      "token": localStorage.getItem("tokendata"),
      "Content-Type": "application/json"
    }
  });
}
async updateemployementAdditional(data) {
  var token= localStorage.getItem("tokendata")
  console.log(token)
  return axios.post(REACT_APP_API_SERVICE_URL + '/updateAdditionalEmployementDetails', data, {
    headers: {
      "token": localStorage.getItem("tokendata"),
      "Content-Type": "application/json"
    },
  });
}
//employement section end

  //education section start
  getEducation(payload) {

    return axios.get(REACT_APP_API_SERVICE_URL + '/getEducationDetails?token=' + payload, TokenHelper.getHeader());
  }
  async updateeducation(data) {
    return axios.post(REACT_APP_API_SERVICE_URL + '/updateEducationDetails', data, {
      headers: {
        "token": localStorage.getItem("tokendata"),
        // "Content-Type": "application/json"
      }
    });
  }
  async updateeducationAdditional(data) {
    var token= localStorage.getItem("tokendata")
    console.log(token)
    return axios.post(REACT_APP_API_SERVICE_URL + '/updateAdditionalEducationDetails', data, {
      headers: {
        "token": localStorage.getItem("tokendata"),
        "Content-Type": "multipart/form-data",
      },
    });
  }
  //education section end
  //Legal Historysection start
  getLegalhistory(payload) {

    return axios.get(REACT_APP_API_SERVICE_URL + '/getLegalQuestion?token=' + payload, TokenHelper.getHeader());
  }
  getLegalAnswer(payload) {

    return axios.get(REACT_APP_API_SERVICE_URL + '/getLegalQuestionAnswer?token=' + payload, TokenHelper.getHeader());
  }

  async postAnswer(data) {
    return axios.post(REACT_APP_API_SERVICE_URL + '/saveLegalQuestionAnswer', data, {
      headers: {
        "token": localStorage.getItem("tokendata"),
      },
    });
  }
  async postExplain(data) {
    return axios.post(REACT_APP_API_SERVICE_URL + '/updateLegalQuestionAnswer', data, {
      headers: {
        "token": localStorage.getItem("tokendata"),
      },
    });
  }
  //Legal Historysection end

  //Medical Historysection start
  getMedicalhistory(payload) {

    return axios.get(REACT_APP_API_SERVICE_URL + '/getMedicalHistoty?token=' + payload, TokenHelper.getHeader());
  }
  async updateMedicalhistory(data) {
    return axios.post(REACT_APP_API_SERVICE_URL + '/updateMedicalHistory', data,  {
      headers: {
        "token": localStorage.getItem("tokendata"),
      },
    });
  }
  //Medical Historysection end

  //Reference section start
  async saveReference(data) {
    return axios.post(REACT_APP_API_SERVICE_URL + '/saveUserReferences', data,  {
      headers: {
        "token": localStorage.getItem("tokendata"),
      },
    });
  }
  getReference(payload) {

    return axios.get(REACT_APP_API_SERVICE_URL + '/getReferenceDetails?token=' + payload, TokenHelper.getHeader());
  }
  //Reference section end
  //Faq section
  async getFaq(data) {
    return axios.get(REACT_APP_API_SERVICE_URL + '/getFAQList', data, TokenHelper.getHeader());
  }
  async postContact(data) {
    return axios.post(REACT_APP_API_SERVICE_URL + '/saveContactUs', data,  {
      headers: {
        "token": localStorage.getItem("tokendata"),
      },
    });
  }
  async getDreamjob(data) {
    return axios.get(REACT_APP_API_SERVICE_URL + '/getAllDreamjobList', data, TokenHelper.getHeader());
  }
  async getTestimonial(data) {
    return axios.get(REACT_APP_API_SERVICE_URL + '/getTestimonialList', data, TokenHelper.getHeader());
  }
  async getTestimonialDetails(testimonial_id) {
    return axios.get(REACT_APP_API_SERVICE_URL + '/getTestimonialDetails?testimonial_id=' + testimonial_id, TokenHelper.getHeader());
  }
  //get view provider  details start
  getProviderProfile(payload) {
    var token= localStorage.getItem("tokendata")
    return axios.get(REACT_APP_API_SERVICE_URL + '/viewProviderPersonalDetails?token=' + token +'&user_id='+ payload, TokenHelper.getHeader());
  }
  getProviderLicense(payload) {
    var token= localStorage.getItem("tokendata")
    return axios.get(REACT_APP_API_SERVICE_URL + '/viewProviderLicensureDetails?token='+ token +'&user_id='+ payload, TokenHelper.getHeader());
  }
  getProviderCertificate(payload) {
    var token= localStorage.getItem("tokendata")
    return axios.get(REACT_APP_API_SERVICE_URL + '/viewProviderCertificateDetails?token='+ token +'&user_id='+ payload, TokenHelper.getHeader());
  }
  getProviderEmployement(payload) {
    var token= localStorage.getItem("tokendata")
    return axios.get(REACT_APP_API_SERVICE_URL + '/viewProviderEmploymentDetails?token='+ token +'&user_id='+ payload, TokenHelper.getHeader());
  }
  getProviderEducation(payload) {
    var token= localStorage.getItem("tokendata")
    return axios.get(REACT_APP_API_SERVICE_URL + '/viewProviderEducationDetails?token='+ token +'&user_id='+ payload, TokenHelper.getHeader());
  }
  LegalHistoryData(payload) {
    var token= localStorage.getItem("tokendata")
    return axios.get(REACT_APP_API_SERVICE_URL + '/viewProviderLegalHistoryDetails?token='+ token +'&user_id='+ payload, TokenHelper.getHeader());
  }
  MedicalHistoryData(payload) {
    var token= localStorage.getItem("tokendata")
    return axios.get(REACT_APP_API_SERVICE_URL + '/viewProviderMedicalHistoryDetails?token='+ token +'&user_id='+ payload, TokenHelper.getHeader());
  }
  ReferenceData(payload) {
    var token= localStorage.getItem("tokendata")
    return axios.get(REACT_APP_API_SERVICE_URL + '/viewProviderReferences?token='+ token +'&user_id='+ payload, TokenHelper.getHeader());
  }
  getRemoveCertificate(payload) {
    var token= localStorage.getItem("tokendata")
      return axios.get(REACT_APP_API_SERVICE_URL + '/deleteAdditionalCertificate?token=' + token +'&additiona_certificate_id='+ payload, TokenHelper.getHeader());
  }
  getRemoveEducation(payload) {
    var token= localStorage.getItem("tokendata")
      return axios.get(REACT_APP_API_SERVICE_URL + '/deleteAdditionalEducation?token=' + token +'&additiona_education_id='+ payload, TokenHelper.getHeader());
  }
  getRemoveLicense(payload) {
    var token= localStorage.getItem("tokendata")
      return axios.get(REACT_APP_API_SERVICE_URL + '/deleteAdditionalLicense?token=' + token +'&additiona_license_id='+ payload, TokenHelper.getHeader());
  }
  getRemoveEmployement(payload) {
    var token= localStorage.getItem("tokendata")
      return axios.get(REACT_APP_API_SERVICE_URL + '/deleteAdditionalEmployment?token=' + token +'&additiona_employment_id='+ payload, TokenHelper.getHeader());
  }
  getListSubuser(payload) {
    var token= localStorage.getItem("tokendata")
      return axios.get(REACT_APP_API_SERVICE_URL + '/getSubUserList?token=' + token +'&user_id='+ payload, TokenHelper.getHeader());
  }
  async CreateSubuser(data) {
    return axios.post(REACT_APP_API_SERVICE_URL + '/createSubUser', data,  {
      headers: {
        "token": localStorage.getItem("tokendata"),
      },
    });
  }
 
  getDeleteSubuser(payload) {
    var token= localStorage.getItem("tokendata")
  
    console.log(TokenHelper.getHeader())
      return axios.get(REACT_APP_API_SERVICE_URL + '/deleteSubUser?token=' + token +'&sub_user_id='+ payload, TokenHelper.getHeader());
  }
  getDeleteConnection(payload) {
    var token= localStorage.getItem("tokendata")
  
    console.log(TokenHelper.getHeader())
      return axios.get(REACT_APP_API_SERVICE_URL + '/deleteconnection?token=' + token +'&connection_id='+ payload, TokenHelper.getHeader());
  }
  getCountuser(payload) {
    var token= localStorage.getItem("tokendata")
  
    console.log(TokenHelper.getHeader())
      return axios.get(REACT_APP_API_SERVICE_URL + '/deleteSubUser?token=' + token +'&sub_user_id='+ payload, TokenHelper.getHeader());
  }
  //get view provider  details end
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new UserService();
