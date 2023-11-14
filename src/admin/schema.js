import * as yup from "yup";



const phoneRegExps = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


export const LoginSchama = yup.object({
    email: yup.string().trim().email().required("email required"),
    password: yup.string().min(8,"password lengt must be 8 characters").required("password required")
});


export const SignupSchama = yup.object({
    firstname: yup.string().trim().required("first name required"),
    lastname: yup.string().trim().required("last name required"),
    email: yup.string().trim().email().required("email required"),
    password: yup.string().trim().min(8,"password lengt must be 8 characters").required("password required"),
    confirm_password: yup.string().trim().min(8,"confirm password lengt must be 8 characters").required().oneOf([yup.ref("password")], "confirm password not match"),
    country:yup.string().trim().required("country required"),
    phone: yup.string().max(10,"phone lengt must be 10 characters").min(10,"phone lengt must be 10 characters").matches(phoneRegExps, 'phone number is not valid'),
    no_shipment:yup.number().typeError("no shipment must be a number").required("no shipment required"),
    address:yup.string().required("address required")
});


export const VerifyEmailSchama = yup.object({
    num1: yup.number().typeError("").required("").test('len', '', val => val && val.toString().length === 1 ),
    num2: yup.number().typeError("").required("").test('len', '', val => val && val.toString().length === 1 ),
    num3: yup.number().typeError("").required("").test('len', '', val => val && val.toString().length === 1 ),
    num4: yup.number().typeError("").required("").test('len', '', val => val && val.toString().length === 1 ),
    num5: yup.number().typeError("").required("").test('len', '', val => val && val.toString().length === 1 ),
    num6: yup.number().typeError("").required("").test('len', '', val => val && val.toString().length === 1 ),
});

export const SendEmail= yup.object({
    email: yup.string().email().required("email required"),
});


export const ChangePassword= yup.object({
    password: yup.string().trim().min(8,"password lengt must be 8 characters").required("password required"),
    confirm_password: yup.string().trim().min(8,"confirm password lengt must be 8 characters").required().oneOf([yup.ref("password")], "confirm password not match"),
});

export const RateSchema=yup.object({
    freightInfo:yup.array(yup.object({
        qty:yup.number().required(""),
        weight:yup.number().required(""),
        weightType:yup.string().required(""),
        length:yup.number().required(""),
        width:yup.number().required(""),
        height:yup.number().required(""),
    })),
    originCountry:yup.string().trim().required("country required"),
    originState:yup.string().trim().required("state required"),
    originCity:yup.string().trim().required("city required"),
    originZipcode:yup.string().trim().required("zipcode required"),

    destinationCountry:yup.string().trim().required("country required"),
    destinationState:yup.string().trim().required("state required"),
    destinationCity:yup.string().trim().required("city required"),
    destinationZipcode:yup.string().trim().required("zipcode required"),

    uom:yup.string().trim().required("unit of measure required"),

});


export const StateAddSchma= yup.object({
    country_id: yup.string().trim().required("country required"),
    state_name: yup.string().trim().required("state name required"),
    state_code: yup.string().trim().required("state iso2 code required").min(2,"code length 2").max(2,"code length 2"),
   
});

export const CityAddSchma= yup.object({
    country_id: yup.string().trim().required("country required"),
    state_id: yup.string().trim().required("state required"),
    city_name: yup.string().trim().required("city name required")
   
});


export const BookingSchma= yup.object({
    emergency_contact: yup.string().trim().required("emergency contact required"),
    emergency_phone: yup.string().required("emergency phone required").max(10," emergency phone lengt must be 10 characters").min(10,"emergency phone lengt must be 10 characters").matches(phoneRegExps, 'emergency phone number is not valid'),
    card_number: yup.string().min(16,"card number lengt must be 16 characters").max(16,"card number lengt must be 16 characters").required("card number required"),
    expiry: yup.string().typeError('Not a valid expiration date. Example: MM/YY')
    .max(5, 'Not a valid expiration date. Example: MM/YY')
    .matches(
      /([0-9]{2})\/([0-9]{2})/,
      'Not a valid expiration date. Example: MM/YY'
    )
    .required('Expiration date is required').test(
        'test-credit-card-expiration-date',
        'Invalid Expiration Date has past',
        expirationDate => {
          if (!expirationDate) {
            return false
          }
    
          const today = new Date()
          const monthToday = today.getMonth() + 1
          const yearToday = today
            .getFullYear()
            .toString()
            .substr(-2)
    
          const [expMonth, expYear] = expirationDate.split('/')
    
          if (Number(expYear) < Number(yearToday)) {
            return false
          } else if (
            Number(expMonth) < monthToday &&
            Number(expYear) <= Number(yearToday)
          ) {
            return false
          }
    
          return true
        }
      )
      .test(
        'test-credit-card-expiration-date',
        'Invalid Expiration Month',
        expirationDate => {
          if (!expirationDate) {
            return false
          }
          const today = new Date()
            .getFullYear()
            .toString()
            .substr(-2)
    
          const [expMonth] = expirationDate.split('/')
    
          if (Number(expMonth) > 12) {
            return false
          }
    
          return true
        }
      ),
    cvc: yup.string().min(3,"cvc lengt must be 3 characters").max(3,"cvc lengt must be 3 characters").required("cvc required"),
    name: yup.string().required("name required"),

    bill_firstname: yup.string().required("firstname required"),
    bill_lastname: yup.string().required("lastname required"),
    bill_address: yup.string().required("address required"),
   
    ship_firstname: yup.string().required("firstname required"),
    ship_lastname: yup.string().required("lastname required"),
    ship_address: yup.string().required("address required"),
    

   
});






