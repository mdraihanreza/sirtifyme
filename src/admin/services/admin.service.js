import axios from 'axios';
import TokenHelper from '../Components/TokenHelper';
const REACT_APP_Admin_API_SERVICE_URL = process.env.REACT_APP_Admin_API_SERVICE_URL;

const headers = {
  headers: {
    // "Content-Type": "multipart/form-data",
    "token": localStorage.getItem("admintoken")
  }
}
const headerdata = {
  headers: {
    "token": TokenHelper.getToken(),
    "Content-Type": "application/json"
  }
}

class AdminService {

  async login(data) {
    return axios.post(REACT_APP_Admin_API_SERVICE_URL+'/login', data, {
      headers: {
        "Content-Type": "application/json"
      },
    });
  }
  async providerlist(data) {
var token=localStorage.getItem("admintoken")
console.log(token,'token')
    return axios.post(REACT_APP_Admin_API_SERVICE_URL+'/providerList', data, {
      headers: {
        
        "token": token,
        "Content-Type": "application/json"
      },
    });
  }
  async nonproviderlist(data) {
    var token=localStorage.getItem("admintoken")
    console.log(token,'token')
        return axios.post(REACT_APP_Admin_API_SERVICE_URL+'/nonProviderList', data, {
          headers: {
            
            "token": token,
            "Content-Type": "application/json"
          },
        });
      }
  getDashboard(payload) {
    var token= localStorage.getItem("admintoken")
    console.log(token,'token')
    return axios.get(REACT_APP_Admin_API_SERVICE_URL + '/getUserCount?token='  + token +'&user_id='+ payload, TokenHelper.getHeader());
}
  getProfile(payload) {
    var token= localStorage.getItem("admintoken")
    console.log(token,'token')
    return axios.get(REACT_APP_Admin_API_SERVICE_URL + '/viewProviderPersonalDetails?token='  + token +'&user_id='+ payload, TokenHelper.getHeader());
}

getProviderconndata(payload) {
  var token= localStorage.getItem("admintoken")
    return axios.get(REACT_APP_Admin_API_SERVICE_URL + '/ProviderConnectionData?token=' + token +'&non_provider_id='+ payload, TokenHelper.getHeader());
}
getPaymentHistory(payload) {
  var token= localStorage.getItem("admintoken")
    return axios.get(REACT_APP_Admin_API_SERVICE_URL + '/PaymentHistory?token=' + token +'&non_provider_id='+ payload, TokenHelper.getHeader());
}
getLicense(payload) {
  var token= localStorage.getItem("admintoken")
    return axios.get(REACT_APP_Admin_API_SERVICE_URL + '/viewProviderLicensureDetails?token=' + token +'&user_id='+ payload, TokenHelper.getHeader());
}
getCertificate(payload) {
  var token= localStorage.getItem("admintoken")
    return axios.get(REACT_APP_Admin_API_SERVICE_URL + '/viewProviderCertificateDetails?token=' + token +'&user_id='+ payload, TokenHelper.getHeader());
}
getEmployement(payload) {
  var token= localStorage.getItem("admintoken")
    return axios.get(REACT_APP_Admin_API_SERVICE_URL + '/viewProviderEmploymentDetails?token=' + token +'&user_id='+ payload, TokenHelper.getHeader());
}
getEducation(payload) {
  var token= localStorage.getItem("admintoken")
    return axios.get(REACT_APP_Admin_API_SERVICE_URL + '/viewProviderEducationDetails?token=' + token +'&user_id='+ payload, TokenHelper.getHeader());
}
getLegalhistory(payload) {
  var token= localStorage.getItem("admintoken")
    return axios.get(REACT_APP_Admin_API_SERVICE_URL + '/viewProviderLegalHistoryDetails?token=' + token +'&user_id='+ payload, TokenHelper.getHeader());
}
// getLegalAnswer(payload) {
 
//     return axios.get(REACT_APP_Admin_API_SERVICE_URL + '/viewProviderMedicalHistoryDetails?token=' + payload, TokenHelper.getHeader());
// }

getMedicalhistory(payload) {
  var token= localStorage.getItem("admintoken")
    return axios.get(REACT_APP_Admin_API_SERVICE_URL + '/viewProviderMedicalHistoryDetails?token=' + token +'&user_id='+ payload, TokenHelper.getHeader());
}
getReference(payload) {
  var token= localStorage.getItem("admintoken")
    return axios.get(REACT_APP_Admin_API_SERVICE_URL + '/viewProviderReferences?token=' + token +'&user_id='+ payload, TokenHelper.getHeader());
}
async updateprofile(data) {

  return axios.post(REACT_APP_Admin_API_SERVICE_URL + '/updateProviderPersonalDetails', data, TokenHelper.getHeader());
}
async updatelicense(data) {

  return axios.post(REACT_APP_Admin_API_SERVICE_URL + '/updateProviderLicenseDetails', data, TokenHelper.getHeader());
}
async updateAdditionallicense(data) {

  return axios.post(REACT_APP_Admin_API_SERVICE_URL + '/updateProviderAdditionalLicenseDetails', data, TokenHelper.getHeader());
}
async updateCertificate(data) {

  return axios.post(REACT_APP_Admin_API_SERVICE_URL + '/updateProviderCertificateDetails', data, TokenHelper.getHeader());
}
async updateAdditionalCertificate(data) {

  return axios.post(REACT_APP_Admin_API_SERVICE_URL + '/updateProviderAdditionalCertificateDetails', data, TokenHelper.getHeader());
}
async updateMedicalHistory(data) {

  return axios.post(REACT_APP_Admin_API_SERVICE_URL + '/updateProviderMedicalHistory', data, TokenHelper.getHeader());
}
async updateEducationDetails(data) {

  return axios.post(REACT_APP_Admin_API_SERVICE_URL + '/updateProviderEducationDetails', data, TokenHelper.getHeader());
}
async updateAdditionalEducationDetails(data) {

  return axios.post(REACT_APP_Admin_API_SERVICE_URL + '/updateProviderAdditionalEducationDetails', data, TokenHelper.getHeader());
}
async LegalQuestionAnswer(data) {

  return axios.post(REACT_APP_Admin_API_SERVICE_URL + '/saveProviderLegalQuestionAnswer', data, TokenHelper.getHeader());
}
async postExplain(data) {
  return axios.post(REACT_APP_Admin_API_SERVICE_URL+ '/updateLegalQuestionAnswer', data, TokenHelper.getHeader());
}
async PostReference(data) {

  return axios.post(REACT_APP_Admin_API_SERVICE_URL + '/updateProviderReferences', data, TokenHelper.getHeader());
}
async PostEmployee(data) {
console.log(TokenHelper.getHeader(),'TokenHelper.getHeader()')
  return axios.post(REACT_APP_Admin_API_SERVICE_URL + '/updateProviderEmploymentDetails', data, TokenHelper.getHeader());
}
async updateemployementAdditional(data) {

  return axios.post(REACT_APP_Admin_API_SERVICE_URL + '/updateProviderAdditionalEmploymentDetails', data, TokenHelper.getHeader());
}
getLegalQuestion(payload) {

  return axios.get(REACT_APP_Admin_API_SERVICE_URL + '/getQuestionList?token=' + payload, TokenHelper.getHeader());
}
async PostLegalQuestion(data) {

  return axios.post(REACT_APP_Admin_API_SERVICE_URL + '/saveQuestion', data, TokenHelper.getHeader());
}
getDeleteLegalQuestion(payload) {
  var token= localStorage.getItem("admintoken")

  console.log(TokenHelper.getHeader())
    return axios.get(REACT_APP_Admin_API_SERVICE_URL + '/deleteQuestion?token=' + token +'&question_id='+ payload, TokenHelper.getHeader());
}
getAboutus(payload) {

  return axios.get(REACT_APP_Admin_API_SERVICE_URL + '/getAboutus?token=' + payload, TokenHelper.getHeader());
}
async PostAboutus(data) {

  return axios.post(REACT_APP_Admin_API_SERVICE_URL + '/updateAboutUs', data, TokenHelper.getHeader());
}
getPrivacy(payload) {

  return axios.get(REACT_APP_Admin_API_SERVICE_URL + '/getPrivacy?token=' + payload, TokenHelper.getHeader());
}
async PostPrivacy(data) {

  return axios.post(REACT_APP_Admin_API_SERVICE_URL + '/updatePrivacy', data, TokenHelper.getHeader());
}
getTestimonial(payload) {

  return axios.get(REACT_APP_Admin_API_SERVICE_URL + '/getTestimonialList?token=' + payload, TokenHelper.getHeader());
}
getTestimonialByid(payload) {
  var token= localStorage.getItem("admintoken")
  return axios.get(REACT_APP_Admin_API_SERVICE_URL + '/getTestimonialDetailsById?token=' + token +'&testimonial_id='+ payload, TokenHelper.getHeader());
}
async updateTestimonialDetails(data) {

  return axios.post(REACT_APP_Admin_API_SERVICE_URL + '/updateTestimoial', data, TokenHelper.getHeader());
}
async saveTestimonial(data) {

  return axios.post(REACT_APP_Admin_API_SERVICE_URL + '/saveTestimoial', data, TokenHelper.getHeader());
}

getFaq(payload) {

  return axios.get(REACT_APP_Admin_API_SERVICE_URL + '/getFaqList?token=' + payload, TokenHelper.getHeader());
}

getContactdata(payload) {

  return axios.get(REACT_APP_Admin_API_SERVICE_URL + '/getContactUsList?token=' + payload, TokenHelper.getHeader());
}
getFaqByid(payload) {
  var token= localStorage.getItem("admintoken")
  return axios.get(REACT_APP_Admin_API_SERVICE_URL + '/geFAQById?token=' + token +'&faq_id='+ payload, TokenHelper.getHeader());
}
async updateFaqDetails(data) {

  return axios.post(REACT_APP_Admin_API_SERVICE_URL + '/updateFAQ', data, TokenHelper.getHeader());
}
async saveFaq(data) {

  return axios.post(REACT_APP_Admin_API_SERVICE_URL + '/saveFaq', data, TokenHelper.getHeader());
}
getDeleteFaq(payload) {
  var token= localStorage.getItem("admintoken")

  console.log(TokenHelper.getHeader())
    return axios.get(REACT_APP_Admin_API_SERVICE_URL + '/deletefaq?token=' + token +'&faq_id='+ payload, TokenHelper.getHeader());
}
getDreamjob(payload) {

  return axios.get(REACT_APP_Admin_API_SERVICE_URL + '/getDreamjobList?token=' + payload, TokenHelper.getHeader());
}
getDreamjobByid(payload) {
  var token= localStorage.getItem("admintoken")
  return axios.get(REACT_APP_Admin_API_SERVICE_URL + '/getDreamjobDetailsById?token=' + token +'&dreamjob_id='+ payload, TokenHelper.getHeader());
}
async updateDreamjobDetails(data) {

  return axios.post(REACT_APP_Admin_API_SERVICE_URL + '/updateDreamjob', data, TokenHelper.getHeader());
}
async saveDreamjob(data) {

  return axios.post(REACT_APP_Admin_API_SERVICE_URL + '/saveDreamjob', data, TokenHelper.getHeader());
}
async Changepassword(data) {

  return axios.post(REACT_APP_Admin_API_SERVICE_URL + '/changePassword', data, TokenHelper.getHeader());
}
getDeleteDreamjob(payload) {
  var token= localStorage.getItem("admintoken")

  console.log(TokenHelper.getHeader())
    return axios.get(REACT_APP_Admin_API_SERVICE_URL + '/deleteDreamjob?token=' + token +'&dreamjob_id='+ payload, TokenHelper.getHeader());
}
getDeleteContact(payload) {
  var token= localStorage.getItem("admintoken")

  console.log(TokenHelper.getHeader())
    return axios.get(REACT_APP_Admin_API_SERVICE_URL + '/deletecontactus?token=' + token +'&contact_id='+ payload, TokenHelper.getHeader());
}
getDeleteTestimonial(payload) {
  var token= localStorage.getItem("admintoken")

  console.log(TokenHelper.getHeader())
    return axios.get(REACT_APP_Admin_API_SERVICE_URL + '/deleteTestimonial?token=' + token +'&testimonial_id='+ payload, TokenHelper.getHeader());
}
getRemovelicence(payload) {
  var token= localStorage.getItem("admintoken")
  return axios.get(REACT_APP_Admin_API_SERVICE_URL + '/deleteAdminAdditionalLicense?token=' + token +'&additiona_license_id='+ payload, TokenHelper.getHeader())
}
getRemovecertificate(payload) {
  var token= localStorage.getItem("admintoken")
  return axios.get(REACT_APP_Admin_API_SERVICE_URL + '/deleteAdminAdditionalCertificate?token=' + token +'&additiona_certificate_id='+ payload, TokenHelper.getHeader())
}
getRemoveeducation(payload) {
  var token= localStorage.getItem("admintoken")
  return axios.get(REACT_APP_Admin_API_SERVICE_URL + '/deleteAdminAdditionalEducation?token=' + token +'&additional_education_id='+ payload, TokenHelper.getHeader())
}
getRemoveemployee(payload) {
  var token= localStorage.getItem("admintoken")
  return axios.get(REACT_APP_Admin_API_SERVICE_URL + '/deleteAdminAdditionalEmployment?token=' + token +'&additional_employement_id='+ payload, TokenHelper.getHeader())
}
}


// eslint-disable-next-line import/no-anonymous-default-export
export default new AdminService();
