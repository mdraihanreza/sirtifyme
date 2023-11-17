import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import UserService from '../../services/user.service';
import { AuthContext } from '../../App';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import view from '../../assets/images/view.png';
import avtar from '../../assets/images/iconlogo.png';
import imgupload from '../../assets/images/img-upload.png';
import { useForm } from 'react-hook-form';
import Licensure from './Licensure';
import Certificate from './Certifications';
import { userContext } from '../../store';
import Loader from '../Loder';
import { Button } from 'bootstrap/dist/js/bootstrap.bundle';
import CurrentEmployement from './CurrentEmployement';
import Education from './Education';
import Legalhistory from './Legalhistory';
import Medicalhistory from './MedicalHistory';
import References from './Reference';
import jQuery from "jquery";
import TokenHelper from '../TokenHelper';
import SubuserPage from './SubUser';
import TransactionDetails from './TransactionDetails';

function PersonalDetails() {
    const countryCodes = [
        {
            "name": "Afghanistan",
            "dial_code": "+93",
            "code": "AF"
        },
        // { label: '+1 (United States)', value: '+1' },
        {
            "name": "Aland Islands",
            "dial_code": "+358",
            "code": "AX"
        },
        {
            "name": "Albania",
            "dial_code": "+355",
            "code": "AL"
        },
        {
            "name": "Algeria",
            "dial_code": "+213",
            "code": "DZ"
        },
        {
            "name": "AmericanSamoa",
            "dial_code": "+1684",
            "code": "AS"
        },
        {
            "name": "Andorra",
            "dial_code": "+376",
            "code": "AD"
        },
        {
            "name": "Angola",
            "dial_code": "+244",
            "code": "AO"
        },
        {
            "name": "Anguilla",
            "dial_code": "+1264",
            "code": "AI"
        },
        {
            "name": "Antarctica",
            "dial_code": "+672",
            "code": "AQ"
        },
        {
            "name": "Antigua and Barbuda",
            "dial_code": "+1268",
            "code": "AG"
        },
        {
            "name": "Argentina",
            "dial_code": "+54",
            "code": "AR"
        },
        {
            "name": "Armenia",
            "dial_code": "+374",
            "code": "AM"
        },
        {
            "name": "Aruba",
            "dial_code": "+297",
            "code": "AW"
        },
        {
            "name": "Australia",
            "dial_code": "+61",
            "code": "AU"
        },
        {
            "name": "Austria",
            "dial_code": "+43",
            "code": "AT"
        },
        {
            "name": "Azerbaijan",
            "dial_code": "+994",
            "code": "AZ"
        },
        {
            "name": "Bahamas",
            "dial_code": "+1242",
            "code": "BS"
        },
        {
            "name": "Bahrain",
            "dial_code": "+973",
            "code": "BH"
        },
        {
            "name": "Bangladesh",
            "dial_code": "+880",
            "code": "BD"
        },
        {
            "name": "Barbados",
            "dial_code": "+1246",
            "code": "BB"
        },
        {
            "name": "Belarus",
            "dial_code": "+375",
            "code": "BY"
        },
        {
            "name": "Belgium",
            "dial_code": "+32",
            "code": "BE"
        },
        {
            "name": "Belize",
            "dial_code": "+501",
            "code": "BZ"
        },
        {
            "name": "Benin",
            "dial_code": "+229",
            "code": "BJ"
        },
        {
            "name": "Bermuda",
            "dial_code": "+1441",
            "code": "BM"
        },
        {
            "name": "Bhutan",
            "dial_code": "+975",
            "code": "BT"
        },
        {
            "name": "Bolivia, Plurinational State of",
            "dial_code": "+591",
            "code": "BO"
        },
        {
            "name": "Bosnia and Herzegovina",
            "dial_code": "+387",
            "code": "BA"
        },
        {
            "name": "Botswana",
            "dial_code": "+267",
            "code": "BW"
        },
        {
            "name": "Brazil",
            "dial_code": "+55",
            "code": "BR"
        },
        {
            "name": "British Indian Ocean Territory",
            "dial_code": "+246",
            "code": "IO"
        },
        {
            "name": "Brunei Darussalam",
            "dial_code": "+673",
            "code": "BN"
        },
        {
            "name": "Bulgaria",
            "dial_code": "+359",
            "code": "BG"
        },
        {
            "name": "Burkina Faso",
            "dial_code": "+226",
            "code": "BF"
        },
        {
            "name": "Burundi",
            "dial_code": "+257",
            "code": "BI"
        },
        {
            "name": "Cambodia",
            "dial_code": "+855",
            "code": "KH"
        },
        {
            "name": "Cameroon",
            "dial_code": "+237",
            "code": "CM"
        },
        {
            "name": "Canada",
            "dial_code": "+1",
            "code": "CA"
        },
        {
            "name": "Cape Verde",
            "dial_code": "+238",
            "code": "CV"
        },
        {
            "name": "Cayman Islands",
            "dial_code": "+ 345",
            "code": "KY"
        },
        {
            "name": "Central African Republic",
            "dial_code": "+236",
            "code": "CF"
        },
        {
            "name": "Chad",
            "dial_code": "+235",
            "code": "TD"
        },
        {
            "name": "Chile",
            "dial_code": "+56",
            "code": "CL"
        },
        {
            "name": "China",
            "dial_code": "+86",
            "code": "CN"
        },
        {
            "name": "Christmas Island",
            "dial_code": "+61",
            "code": "CX"
        },
        {
            "name": "Cocos (Keeling) Islands",
            "dial_code": "+61",
            "code": "CC"
        },
        {
            "name": "Colombia",
            "dial_code": "+57",
            "code": "CO"
        },
        {
            "name": "Comoros",
            "dial_code": "+269",
            "code": "KM"
        },
        {
            "name": "Congo",
            "dial_code": "+242",
            "code": "CG"
        },
        {
            "name": "Congo, The Democratic Republic of the Congo",
            "dial_code": "+243",
            "code": "CD"
        },
        {
            "name": "Cook Islands",
            "dial_code": "+682",
            "code": "CK"
        },
        {
            "name": "Costa Rica",
            "dial_code": "+506",
            "code": "CR"
        },
        {
            "name": "Cote d'Ivoire",
            "dial_code": "+225",
            "code": "CI"
        },
        {
            "name": "Croatia",
            "dial_code": "+385",
            "code": "HR"
        },
        {
            "name": "Cuba",
            "dial_code": "+53",
            "code": "CU"
        },
        {
            "name": "Cyprus",
            "dial_code": "+357",
            "code": "CY"
        },
        {
            "name": "Czech Republic",
            "dial_code": "+420",
            "code": "CZ"
        },
        {
            "name": "Denmark",
            "dial_code": "+45",
            "code": "DK"
        },
        {
            "name": "Djibouti",
            "dial_code": "+253",
            "code": "DJ"
        },
        {
            "name": "Dominica",
            "dial_code": "+1767",
            "code": "DM"
        },
        {
            "name": "Dominican Republic",
            "dial_code": "+1849",
            "code": "DO"
        },
        {
            "name": "Ecuador",
            "dial_code": "+593",
            "code": "EC"
        },
        {
            "name": "Egypt",
            "dial_code": "+20",
            "code": "EG"
        },
        {
            "name": "El Salvador",
            "dial_code": "+503",
            "code": "SV"
        },
        {
            "name": "Equatorial Guinea",
            "dial_code": "+240",
            "code": "GQ"
        },
        {
            "name": "Eritrea",
            "dial_code": "+291",
            "code": "ER"
        },
        {
            "name": "Estonia",
            "dial_code": "+372",
            "code": "EE"
        },
        {
            "name": "Ethiopia",
            "dial_code": "+251",
            "code": "ET"
        },
        {
            "name": "Falkland Islands (Malvinas)",
            "dial_code": "+500",
            "code": "FK"
        },
        {
            "name": "Faroe Islands",
            "dial_code": "+298",
            "code": "FO"
        },
        {
            "name": "Fiji",
            "dial_code": "+679",
            "code": "FJ"
        },
        {
            "name": "Finland",
            "dial_code": "+358",
            "code": "FI"
        },
        {
            "name": "France",
            "dial_code": "+33",
            "code": "FR"
        },
        {
            "name": "French Guiana",
            "dial_code": "+594",
            "code": "GF"
        },
        {
            "name": "French Polynesia",
            "dial_code": "+689",
            "code": "PF"
        },
        {
            "name": "Gabon",
            "dial_code": "+241",
            "code": "GA"
        },
        {
            "name": "Gambia",
            "dial_code": "+220",
            "code": "GM"
        },
        {
            "name": "Georgia",
            "dial_code": "+995",
            "code": "GE"
        },
        {
            "name": "Germany",
            "dial_code": "+49",
            "code": "DE"
        },
        {
            "name": "Ghana",
            "dial_code": "+233",
            "code": "GH"
        },
        {
            "name": "Gibraltar",
            "dial_code": "+350",
            "code": "GI"
        },
        {
            "name": "Greece",
            "dial_code": "+30",
            "code": "GR"
        },
        {
            "name": "Greenland",
            "dial_code": "+299",
            "code": "GL"
        },
        {
            "name": "Grenada",
            "dial_code": "+1473",
            "code": "GD"
        },
        {
            "name": "Guadeloupe",
            "dial_code": "+590",
            "code": "GP"
        },
        {
            "name": "Guam",
            "dial_code": "+1671",
            "code": "GU"
        },
        {
            "name": "Guatemala",
            "dial_code": "+502",
            "code": "GT"
        },
        {
            "name": "Guernsey",
            "dial_code": "+44",
            "code": "GG"
        },
        {
            "name": "Guinea",
            "dial_code": "+224",
            "code": "GN"
        },
        {
            "name": "Guinea-Bissau",
            "dial_code": "+245",
            "code": "GW"
        },
        {
            "name": "Guyana",
            "dial_code": "+595",
            "code": "GY"
        },
        {
            "name": "Haiti",
            "dial_code": "+509",
            "code": "HT"
        },
        {
            "name": "Holy See (Vatican City State)",
            "dial_code": "+379",
            "code": "VA"
        },
        {
            "name": "Honduras",
            "dial_code": "+504",
            "code": "HN"
        },
        {
            "name": "Hong Kong",
            "dial_code": "+852",
            "code": "HK"
        },
        {
            "name": "Hungary",
            "dial_code": "+36",
            "code": "HU"
        },
        {
            "name": "Iceland",
            "dial_code": "+354",
            "code": "IS"
        },
        {
            "name": "India",
            "dial_code": "+91",
            "code": "IN"
        },
        {
            "name": "Indonesia",
            "dial_code": "+62",
            "code": "ID"
        },
        {
            "name": "Iran, Islamic Republic of Persian Gulf",
            "dial_code": "+98",
            "code": "IR"
        },
        {
            "name": "Iraq",
            "dial_code": "+964",
            "code": "IQ"
        },
        {
            "name": "Ireland",
            "dial_code": "+353",
            "code": "IE"
        },
        {
            "name": "Isle of Man",
            "dial_code": "+44",
            "code": "IM"
        },
        {
            "name": "Israel",
            "dial_code": "+972",
            "code": "IL"
        },
        {
            "name": "Italy",
            "dial_code": "+39",
            "code": "IT"
        },
        {
            "name": "Jamaica",
            "dial_code": "+1876",
            "code": "JM"
        },
        {
            "name": "Japan",
            "dial_code": "+81",
            "code": "JP"
        },
        {
            "name": "Jersey",
            "dial_code": "+44",
            "code": "JE"
        },
        {
            "name": "Jordan",
            "dial_code": "+962",
            "code": "JO"
        },
        {
            "name": "Kazakhstan",
            "dial_code": "+77",
            "code": "KZ"
        },
        {
            "name": "Kenya",
            "dial_code": "+254",
            "code": "KE"
        },
        {
            "name": "Kiribati",
            "dial_code": "+686",
            "code": "KI"
        },
        {
            "name": "Korea, Democratic People's Republic of Korea",
            "dial_code": "+850",
            "code": "KP"
        },
        {
            "name": "Korea, Republic of South Korea",
            "dial_code": "+82",
            "code": "KR"
        },
        {
            "name": "Kuwait",
            "dial_code": "+965",
            "code": "KW"
        },
        {
            "name": "Kyrgyzstan",
            "dial_code": "+996",
            "code": "KG"
        },
        {
            "name": "Laos",
            "dial_code": "+856",
            "code": "LA"
        },
        {
            "name": "Latvia",
            "dial_code": "+371",
            "code": "LV"
        },
        {
            "name": "Lebanon",
            "dial_code": "+961",
            "code": "LB"
        },
        {
            "name": "Lesotho",
            "dial_code": "+266",
            "code": "LS"
        },
        {
            "name": "Liberia",
            "dial_code": "+231",
            "code": "LR"
        },
        {
            "name": "Libyan Arab Jamahiriya",
            "dial_code": "+218",
            "code": "LY"
        },
        {
            "name": "Liechtenstein",
            "dial_code": "+423",
            "code": "LI"
        },
        {
            "name": "Lithuania",
            "dial_code": "+370",
            "code": "LT"
        },
        {
            "name": "Luxembourg",
            "dial_code": "+352",
            "code": "LU"
        },
        {
            "name": "Macao",
            "dial_code": "+853",
            "code": "MO"
        },
        {
            "name": "Macedonia",
            "dial_code": "+389",
            "code": "MK"
        },
        {
            "name": "Madagascar",
            "dial_code": "+261",
            "code": "MG"
        },
        {
            "name": "Malawi",
            "dial_code": "+265",
            "code": "MW"
        },
        {
            "name": "Malaysia",
            "dial_code": "+60",
            "code": "MY"
        },
        {
            "name": "Maldives",
            "dial_code": "+960",
            "code": "MV"
        },
        {
            "name": "Mali",
            "dial_code": "+223",
            "code": "ML"
        },
        {
            "name": "Malta",
            "dial_code": "+356",
            "code": "MT"
        },
        {
            "name": "Marshall Islands",
            "dial_code": "+692",
            "code": "MH"
        },
        {
            "name": "Martinique",
            "dial_code": "+596",
            "code": "MQ"
        },
        {
            "name": "Mauritania",
            "dial_code": "+222",
            "code": "MR"
        },
        {
            "name": "Mauritius",
            "dial_code": "+230",
            "code": "MU"
        },
        {
            "name": "Mayotte",
            "dial_code": "+262",
            "code": "YT"
        },
        {
            "name": "Mexico",
            "dial_code": "+52",
            "code": "MX"
        },
        {
            "name": "Micronesia, Federated States of Micronesia",
            "dial_code": "+691",
            "code": "FM"
        },
        {
            "name": "Moldova",
            "dial_code": "+373",
            "code": "MD"
        },
        {
            "name": "Monaco",
            "dial_code": "+377",
            "code": "MC"
        },
        {
            "name": "Mongolia",
            "dial_code": "+976",
            "code": "MN"
        },
        {
            "name": "Montenegro",
            "dial_code": "+382",
            "code": "ME"
        },
        {
            "name": "Montserrat",
            "dial_code": "+1664",
            "code": "MS"
        },
        {
            "name": "Morocco",
            "dial_code": "+212",
            "code": "MA"
        },
        {
            "name": "Mozambique",
            "dial_code": "+258",
            "code": "MZ"
        },
        {
            "name": "Myanmar",
            "dial_code": "+95",
            "code": "MM"
        },
        {
            "name": "Namibia",
            "dial_code": "+264",
            "code": "NA"
        },
        {
            "name": "Nauru",
            "dial_code": "+674",
            "code": "NR"
        },
        {
            "name": "Nepal",
            "dial_code": "+977",
            "code": "NP"
        },
        {
            "name": "Netherlands",
            "dial_code": "+31",
            "code": "NL"
        },
        {
            "name": "Netherlands Antilles",
            "dial_code": "+599",
            "code": "AN"
        },
        {
            "name": "New Caledonia",
            "dial_code": "+687",
            "code": "NC"
        },
        {
            "name": "New Zealand",
            "dial_code": "+64",
            "code": "NZ"
        },
        {
            "name": "Nicaragua",
            "dial_code": "+505",
            "code": "NI"
        },
        {
            "name": "Niger",
            "dial_code": "+227",
            "code": "NE"
        },
        {
            "name": "Nigeria",
            "dial_code": "+234",
            "code": "NG"
        },
        {
            "name": "Niue",
            "dial_code": "+683",
            "code": "NU"
        },
        {
            "name": "Norfolk Island",
            "dial_code": "+672",
            "code": "NF"
        },
        {
            "name": "Northern Mariana Islands",
            "dial_code": "+1670",
            "code": "MP"
        },
        {
            "name": "Norway",
            "dial_code": "+47",
            "code": "NO"
        },
        {
            "name": "Oman",
            "dial_code": "+968",
            "code": "OM"
        },
        {
            "name": "Pakistan",
            "dial_code": "+92",
            "code": "PK"
        },
        {
            "name": "Palau",
            "dial_code": "+680",
            "code": "PW"
        },
        {
            "name": "Palestinian Territory, Occupied",
            "dial_code": "+970",
            "code": "PS"
        },
        {
            "name": "Panama",
            "dial_code": "+507",
            "code": "PA"
        },
        {
            "name": "Papua New Guinea",
            "dial_code": "+675",
            "code": "PG"
        },
        {
            "name": "Paraguay",
            "dial_code": "+595",
            "code": "PY"
        },
        {
            "name": "Peru",
            "dial_code": "+51",
            "code": "PE"
        },
        {
            "name": "Philippines",
            "dial_code": "+63",
            "code": "PH"
        },
        {
            "name": "Pitcairn",
            "dial_code": "+872",
            "code": "PN"
        },
        {
            "name": "Poland",
            "dial_code": "+48",
            "code": "PL"
        },
        {
            "name": "Portugal",
            "dial_code": "+351",
            "code": "PT"
        },
        {
            "name": "Puerto Rico",
            "dial_code": "+1939",
            "code": "PR"
        },
        {
            "name": "Qatar",
            "dial_code": "+974",
            "code": "QA"
        },
        {
            "name": "Romania",
            "dial_code": "+40",
            "code": "RO"
        },
        {
            "name": "Russia",
            "dial_code": "+7",
            "code": "RU"
        },
        {
            "name": "Rwanda",
            "dial_code": "+250",
            "code": "RW"
        },
        {
            "name": "Reunion",
            "dial_code": "+262",
            "code": "RE"
        },
        {
            "name": "Saint Barthelemy",
            "dial_code": "+590",
            "code": "BL"
        },
        {
            "name": "Saint Helena, Ascension and Tristan Da Cunha",
            "dial_code": "+290",
            "code": "SH"
        },
        {
            "name": "Saint Kitts and Nevis",
            "dial_code": "+1869",
            "code": "KN"
        },
        {
            "name": "Saint Lucia",
            "dial_code": "+1758",
            "code": "LC"
        },
        {
            "name": "Saint Martin",
            "dial_code": "+590",
            "code": "MF"
        },
        {
            "name": "Saint Pierre and Miquelon",
            "dial_code": "+508",
            "code": "PM"
        },
        {
            "name": "Saint Vincent and the Grenadines",
            "dial_code": "+1784",
            "code": "VC"
        },
        {
            "name": "Samoa",
            "dial_code": "+685",
            "code": "WS"
        },
        {
            "name": "San Marino",
            "dial_code": "+378",
            "code": "SM"
        },
        {
            "name": "Sao Tome and Principe",
            "dial_code": "+239",
            "code": "ST"
        },
        {
            "name": "Saudi Arabia",
            "dial_code": "+966",
            "code": "SA"
        },
        {
            "name": "Senegal",
            "dial_code": "+221",
            "code": "SN"
        },
        {
            "name": "Serbia",
            "dial_code": "+381",
            "code": "RS"
        },
        {
            "name": "Seychelles",
            "dial_code": "+248",
            "code": "SC"
        },
        {
            "name": "Sierra Leone",
            "dial_code": "+232",
            "code": "SL"
        },
        {
            "name": "Singapore",
            "dial_code": "+65",
            "code": "SG"
        },
        {
            "name": "Slovakia",
            "dial_code": "+421",
            "code": "SK"
        },
        {
            "name": "Slovenia",
            "dial_code": "+386",
            "code": "SI"
        },
        {
            "name": "Solomon Islands",
            "dial_code": "+677",
            "code": "SB"
        },
        {
            "name": "Somalia",
            "dial_code": "+252",
            "code": "SO"
        },
        {
            "name": "South Africa",
            "dial_code": "+27",
            "code": "ZA"
        },
        {
            "name": "South Sudan",
            "dial_code": "+211",
            "code": "SS"
        },
        {
            "name": "South Georgia and the South Sandwich Islands",
            "dial_code": "+500",
            "code": "GS"
        },
        {
            "name": "Spain",
            "dial_code": "+34",
            "code": "ES"
        },
        {
            "name": "Sri Lanka",
            "dial_code": "+94",
            "code": "LK"
        },
        {
            "name": "Sudan",
            "dial_code": "+249",
            "code": "SD"
        },
        {
            "name": "Suriname",
            "dial_code": "+597",
            "code": "SR"
        },
        {
            "name": "Svalbard and Jan Mayen",
            "dial_code": "+47",
            "code": "SJ"
        },
        {
            "name": "Swaziland",
            "dial_code": "+268",
            "code": "SZ"
        },
        {
            "name": "Sweden",
            "dial_code": "+46",
            "code": "SE"
        },
        {
            "name": "Switzerland",
            "dial_code": "+41",
            "code": "CH"
        },
        {
            "name": "Syrian Arab Republic",
            "dial_code": "+963",
            "code": "SY"
        },
        {
            "name": "Taiwan",
            "dial_code": "+886",
            "code": "TW"
        },
        {
            "name": "Tajikistan",
            "dial_code": "+992",
            "code": "TJ"
        },
        {
            "name": "Tanzania, United Republic of Tanzania",
            "dial_code": "+255",
            "code": "TZ"
        },
        {
            "name": "Thailand",
            "dial_code": "+66",
            "code": "TH"
        },
        {
            "name": "Timor-Leste",
            "dial_code": "+670",
            "code": "TL"
        },
        {
            "name": "Togo",
            "dial_code": "+228",
            "code": "TG"
        },
        {
            "name": "Tokelau",
            "dial_code": "+690",
            "code": "TK"
        },
        {
            "name": "Tonga",
            "dial_code": "+676",
            "code": "TO"
        },
        {
            "name": "Trinidad and Tobago",
            "dial_code": "+1868",
            "code": "TT"
        },
        {
            "name": "Tunisia",
            "dial_code": "+216",
            "code": "TN"
        },
        {
            "name": "Turkey",
            "dial_code": "+90",
            "code": "TR"
        },
        {
            "name": "Turkmenistan",
            "dial_code": "+993",
            "code": "TM"
        },
        {
            "name": "Turks and Caicos Islands",
            "dial_code": "+1649",
            "code": "TC"
        },
        {
            "name": "Tuvalu",
            "dial_code": "+688",
            "code": "TV"
        },
        {
            "name": "Uganda",
            "dial_code": "+256",
            "code": "UG"
        },
        {
            "name": "Ukraine",
            "dial_code": "+380",
            "code": "UA"
        },
        {
            "name": "United Arab Emirates",
            "dial_code": "+971",
            "code": "AE"
        },
        {
            "name": "United Kingdom",
            "dial_code": "+44",
            "code": "GB"
        },
        {
            "name": "United States",
            "dial_code": "+1",
            "code": "US"
        },
        {
            "name": "Uruguay",
            "dial_code": "+598",
            "code": "UY"
        },
        {
            "name": "Uzbekistan",
            "dial_code": "+998",
            "code": "UZ"
        },
        {
            "name": "Vanuatu",
            "dial_code": "+678",
            "code": "VU"
        },
        {
            "name": "Venezuela, Bolivarian Republic of Venezuela",
            "dial_code": "+58",
            "code": "VE"
        },
        {
            "name": "Vietnam",
            "dial_code": "+84",
            "code": "VN"
        },
        {
            "name": "Virgin Islands, British",
            "dial_code": "+1284",
            "code": "VG"
        },
        {
            "name": "Virgin Islands, U.S.",
            "dial_code": "+1340",
            "code": "VI"
        },
        {
            "name": "Wallis and Futuna",
            "dial_code": "+681",
            "code": "WF"
        },
        {
            "name": "Yemen",
            "dial_code": "+967",
            "code": "YE"
        },
        {
            "name": "Zambia",
            "dial_code": "+260",
            "code": "ZM"
        },
        {
            "name": "Zimbabwe",
            "dial_code": "+263",
            "code": "ZW"
        }

    ];
    // const { user } = useContext(AuthContext);
    const { user, dispatch } = useContext(userContext);
    const [UserProfileData, setUserProfileData] = useState([]);
    const [selectedCode, setSelectedCode] = useState(countryCodes[0]);
    const [TransactionData, setTransactionData] = useState([]);
    const [filename, setFilename] = useState("Select Your Document");
    const [filedata, setFiledata] = useState("");
    const [loader, setLoader] = useState(false);
    console.log(user, 'userinfotoken')

    //    var token=user.tokendata
    var getProfileData = async () => {
        setLoader(true);
        var token = TokenHelper.getToken();
 

        //  alert(id)
        if (token !== null) {
            console.log("repeat");
            var response = await UserService.getProfile(user.tokendata)
            console.log("profile ", response.data)
            console.log("name ", response.data.data.only_mobile_no)
            //  alert("sss" ,response.data.success)
            if (response.data.success) {
                setLoader(false);
                reset({
                    name: response.data.data.name,
                    email: response.data.data.email,
                    country_code: response.data.data.country_code,
                    only_mobile_no: response.data.data.only_mobile_no,
                    profile_image: response.data.data.profile_picture,
                    cv: response.data.data.cv,
                })
                // setFilename(response.data.data.cv)
                setFiledata(response.data.data.cv)
                setUserProfileData(response.data.data)

                console.log(response.data)
            }
        }
        else {
            setLoader(false);
            console.log("not get token")
        }
    }

    //  getProfileData();
    //===============//
    var getSubscriptionData = async () => {
        var token = TokenHelper.getToken();
        if (token !== null) {
            console.log("repeat");
            var response = await UserService.getSubscriptionData(user.tokendata)
    
    
            if (response.data.success) {
    
                setTransactionData(response.data.data)
    
                console.log(response.data)
            }
        }
        else {
            console.log("not get token")
        }
    }
    
   
    //=============//
    useEffect(() => {
        getSubscriptionData();
        

        getProfileData();

    }, []);
    const dataSubmit = async (data) => {
        setLoader(true);
        // alert(data.profile_image)
        // console.log("fdata  ", data.cv[0]);
        console.log(data)
        var fdata = new FormData();
        fdata.append("name", data.name);
        fdata.append("country_code", data.country_code);
        fdata.append("only_mobile_no", data.only_mobile_no);
        if (data.profile_image!== null) {
        fdata.append("profile_image", data.profile_image[0]);
        }
        if (data.cv!== null) {
            fdata.append("cv", data.cv[0]);
        }

        var response = await UserService.updateprofile(fdata);
        // alert(response,'response')

        console.log(response.data.message)
        if (response.data.error) {
            setLoader(false);
            toast.error(response.data.error.usererror)
        }
        if (response.data.success) {
            setLoader(false);
            toast.success(response.data.message)
        }

        console.log(response.data)
        reset()
        await getProfileData();



    }
    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm({
        mode: "all"
    });
    console.log(UserProfileData, 'UserProfileData')


    return (
        <>
            {/* =================== Profile Start================================ */}
            <section className="profile">
                <div className="container">
                    <p>Your Package Expire Soon</p>
                    {/* =================== Profile Start================================ */}
                    <div className="out-wrap">
                        <div className="tab-nav-wrapper">
                            <ul className="nav-pills" id="tabs" role="tablist">

                                {user.user_type == 1 || user.user_type == 2 || user.user_type == 3 ? (

                                    <>
                                        <li className="nav-item" role="presentation">
                                            <a
                                                href="#pills-home"
                                                className="nav-link active"
                                                role="tab"
                                                data-bs-toggle="tab"
                                            >
                                                Personal Details
                                            </a>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <a
                                                href="#pills-profile"
                                                role="tab"
                                                className="nav-link"
                                                data-bs-toggle="tab"
                                            >
                                                Licensure
                                            </a>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <a
                                                href="#pills-contact"
                                                role="tab"
                                                className="nav-link"
                                                data-bs-toggle="tab"
                                            >
                                                Certifications
                                            </a>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <a
                                                href="#current-employment"
                                                role="tab"
                                                className="nav-link"
                                                data-bs-toggle="tab"
                                            >
                                                Employment History
                                            </a>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <a href="#education" role="tab" className="nav-link" data-bs-toggle="tab">
                                                Education
                                            </a>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <a href="#history" role="tab" className="nav-link" data-bs-toggle="tab">
                                                Legal History
                                            </a>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <a href="#medical" role="tab" className="nav-link" data-bs-toggle="tab">
                                                Medical History
                                            </a>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <a
                                                href="#references"
                                                role="tab"
                                                className="nav-link"
                                                data-bs-toggle="tab"
                                            >
                                                References
                                            </a>
                                        </li>
                                    </>) : (
                                    <>

                                        <li className="nav-item" role="presentation">
                                            <a
                                                href="#pills-home"
                                                className="nav-link active"
                                                role="tab"
                                                data-bs-toggle="tab"
                                            >
                                                Personal Details
                                            </a>
                                        </li>
                                      {user.sub_user_type=='0'? <li className="nav-item" role="presentation">
                                            <a
                                                href="#hospitaluser"
                                                className="nav-link"
                                                role="tab"
                                                data-bs-toggle="tab"
                                            >
                                                Sub User
                                            </a>
                                        </li>:''}
                                        <li className="nav-item" role="presentation">
                                            <a
                                                href="#transactiondetails"
                                                className="nav-link"
                                                role="tab"
                                                data-bs-toggle="tab"
                                            >
                                                Transaction Details
                                            </a>
                                        </li>
                                    </>)}
                            </ul>
                        </div>

                        <div className="tab-content tab-content-wrapper registration-form-main" id="pills-tabContent">
                            <div className="tab-pane active" id="pills-home" role="tabpanel">
                                <form action="" method="post" id="form-image" onSubmit={handleSubmit(dataSubmit)}>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="avatar-upload">
                                                <div className="avatar-edit">

                                                    <input type="file" id="imageUpload" accept=".png, .jpg, .jpeg" {...register("profile_image")} />
                                                    <label htmlFor="imageUpload">
                                                        <img
                                                            className="img-responsive rounded-circle"
                                                            src={imgupload}
                                                            alt=""
                                                        />
                                                    </label>

                                                </div>
                                                <div className="avatar-preview">
                                                    {UserProfileData.profile_picture ? <img
                                                        className="profile-user-img img-responsive rounded-circle"
                                                        id="imagePreview"
                                                        src={UserProfileData.profile_picture}
                                                        alt=""
                                                    /> : <img
                                                        className="profile-user-img img-responsive rounded-circle"
                                                        id="imagePreview"
                                                        src={avtar}
                                                        alt=""
                                                        value={UserProfileData ? UserProfileData.profile_picture : ''}
                                                    />}

                                                    <p className='form-field-error'>{errors.profile_picture?.message}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Name</label>
                                                <input type="text" className="form-control" placeholder="Full Name" {...register("name")} />
                                                <p className='form-field-error'>{errors.name?.message}</p>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Email ID</label>
                                                <input type="email" className="form-control" {...register("email")} placeholder="Email Id" />
                                                <p className='form-field-error'>{errors.email?.message}</p>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Phone Number</label>
                                                <select className="form-select countrydropdown" {...register("country_code")}  >
                                                    {countryCodes && countryCodes.map((item) => <option value={item.dial_code}>{item.dial_code}</option>)}
                                                </select>
                                                <input
                                                    type="number" {...register("only_mobile_no")}
                                                    className="form-control phoneinput"
                                                    placeholder="Mobile Number"
                                                //   value={UserProfileData?UserProfileData.only_mobile_no:''}
                                                />
                                                <p className='form-field-error'>{errors.only_mobile_no?.message}</p>
                                            </div>
                                        </div>
                                        {user.user_type == 1 || user.user_type == 2 || user.user_type == 3 ?
                                            <div className="col-md-6">
                                                <label>Upload CV Option</label>
                                                <div
                                                    className="form-group custom-file-button"
                                                    data-text="Select your file!"
                                                >
                                                    <input type="file" className="form-control" id="file-upload-field" {...register("cv")} onChange={e => setFilename((e.target.files && e.target.files[0].name))} accept=".doc,.docx,.pdf" />
                                                    {/* <span className="filename">{filename}</span> */}
                                                    {UserProfileData.cv ? <a href={filedata} target='_blank'><img src={view} className='viewicon' /></a> : <span className="filename">{filename}</span>}
                                                    <p className='form-field-error'>{errors.cv?.message}</p>
                                                </div>
                                            </div> : ''}

                                        <div className="col-md-12">
                                            <button type="submit" className='submit_button' name="submit">Submit</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <Licensure />
                            <Certificate />
                            <CurrentEmployement />
                            <Education />
                            <Legalhistory />
                            <Medicalhistory />
                            <References />
                            <SubuserPage />
                            <TransactionDetails />
                        </div>

                    </div>
                    {loader && <Loader />}
                </div>
            </section>

        </>
    )
}

export default PersonalDetails