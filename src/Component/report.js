import React, { useState, useEffect } from "react";
import LoGo from "../Ramlogo.png";
import { useParams } from "react-router";
import axios from "axios";
import BaseUrl from "../api/BaseUrl";
import ReactLoading from "react-loading";
import Barcode from "react-barcode";
import {
  formatYearMonthDayTime,
  formatDayMonthYearTimeThai,
  currentYearMonthDay,
} from "../utils/utils.js";
import urlencode from "urlencode";
import { nl2br } from 'react-js-nl2br';

function Report() {
  const [header, setHeader] = useState([]);
  const [patient, setPatient] = useState([]);
  const [userinfo, setUserinfo] = useState([]);
  const [paperinfo, setPaperinfo] = useState([]);
  const [transfer, setTransfer] = useState([]);
  const [vsinfo, setVsinfo] = useState([]);
  const [body, setBody] = useState();
  const [table, setTable] = useState("PTSTBL    ");
  const [type, setType] = useState("PTS1      ");
  const [done, setDone] = useState(true);
  const [ocr, setOcr] = useState([]);
  const { ocmnum, chtnum, seq, user } = useParams();
  const nl2br = require('react-nl2br');
  // const [userinfo, setUserinfo] = useState([]);
  const [bodypre, setBodypre] = useState([]);

  //pre-op summary
  const opt6_opt037 = [{ "code": "OPT037001 ", "textValue": "", "dataType": "CODE", "chtnum": "900004 ", "require": "", "title": "Pre-op evaluated by Doctor", "type": "OPT6 ", "codeValue": "", "datetime": " ", "topic": "OPT037 ", "formNum": "2341", "ocmnum": "13454292 ", "user": " ", "table": "OPTNTBL " }, { "code": "OPT037002 ", "textValue": "WardText", "dataType": "RADIO", "chtnum": "900004 ", "require": "", "title": "Ward", "type": "OPT6 ", "codeValue": "N", "datetime": "202212221453", "topic": "OPT037 ", "formNum": "2341", "ocmnum": "13454292 ", "user": "W32 ", "seq": "93473", "table": "OPTNTBL " }, { "code": "OPT037003 ", "textValue": "ORText", "dataType": "RADIO", "chtnum": "900004 ", "require": "", "title": "OR", "type": "OPT6 ", "codeValue": "N", "datetime": "202212221453", "topic": "OPT037 ", "formNum": "2341", "ocmnum": "13454292 ", "user": "W32 ", "seq": "93474", "table": "OPTNTBL " }, { "code": "OPT037004 ", "textValue": "Other text", "dataType": "RADIO", "chtnum": "900004 ", "require": "", "title": "Other", "type": "OPT6 ", "codeValue": "Y", "datetime": "202212221453", "topic": "OPT037 ", "formNum": "2341", "ocmnum": "13454292 ", "user": "W32 ", "seq": "93475", "table": "OPTNTBL " }, { "code": "OPT037005 ", "textValue": "202212221411", "dataType": "DATETIME", "chtnum": "900004 ", "require": "", "title": "Date of operation", "type": "OPT6 ", "codeValue": "", "datetime": "202212221453", "topic": "OPT037 ", "formNum": "2341", "ocmnum": "13454292 ", "user": "W32 ", "seq": "93476", "table": "OPTNTBL " }, { "code": "OPT037006 ", "textValue": "", "dataType": "CODE", "chtnum": "900004 ", "require": "", "title": "Surgeon", "type": "OPT6 ", "codeValue": "", "datetime": " ", "topic": "OPT037 ", "formNum": "2341", "ocmnum": "13454292 ", "user": " ", "table": "OPTNTBL " }, { "code": "OPT037007 ", "textValue": "", "dataType": "CODE", "chtnum": "900004 ", "require": "", "title": "Anesthesiologist", "type": "OPT6 ", "codeValue": "", "datetime": " ", "topic": "OPT037 ", "formNum": "2341", "ocmnum": "13454292 ", "user": " ", "table": "OPTNTBL " }];


  let setData1 = [];
  let setData2 = [];
  let dataList = [];
  const test1 = [
    [
      {
        "code": "OPT037001 ",
        "textValue": "",
        "dataType": "CODE",
        "chtnum": "900004  ",
        "require": "",
        "title": "Pre-op evaluated by Doctor",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT037    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT037002 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "Ward",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT037    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT037003 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "OR",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT037    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT037004 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "Other",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT037    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT037005 ",
        "textValue": "",
        "dataType": "DATETIME",
        "chtnum": "900004  ",
        "require": "",
        "title": "Date of operation",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT037    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT037006 ",
        "textValue": "",
        "dataType": "CODE",
        "chtnum": "900004  ",
        "require": "",
        "title": "Surgeon",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT037    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT037007 ",
        "textValue": "",
        "dataType": "CODE",
        "chtnum": "900004  ",
        "require": "",
        "title": "Anesthesiologist",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT037    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      }
    ],
    [
      {
        "code": "OPT038004 ",
        "textValue": "",
        "dataType": "",
        "chtnum": "900004  ",
        "require": "",
        "title": "Previous Anesthesia",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT038    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT038001 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "G.A.",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT038    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT038002 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "R.A.",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT038    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT038003 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "MAC Problem",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT038    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT038005 ",
        "textValue": "",
        "dataType": "TEXT",
        "chtnum": "900004  ",
        "require": "",
        "title": "Previous Medication",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT038    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT038006 ",
        "textValue": "",
        "dataType": "TEXT",
        "chtnum": "900004  ",
        "require": "",
        "title": "Family Hx",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT038    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT038007 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "Alcohol",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT038    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT038008 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "Smoking",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT038    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT038009 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "Drugs Allergy",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT038    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      }
    ],
    [],
    [
      {
        "code": "OPT040001 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "1",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT040    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT040002 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "2",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT040    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT040003 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "3",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT040    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT040004 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "4",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT040    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      }
    ],
    [
      {
        "code": "OPT041001 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "WNL",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT041    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT041002 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "URI",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT041    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT041003 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "LRI",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT041    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT041004 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "Asthma",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT041    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT041005 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "Effusion",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT041    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT041006 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "Obstruction",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT041    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      }
    ],
    [
      {
        "code": "OPT042001 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "WNL",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT042    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT042002 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "HT",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT042    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT042003 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "IHD",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT042    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT042004 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "CHD",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT042    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT042005 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "CHF",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT042    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT042006 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "Arrthymia",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT042    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      }
    ],
    [
      {
        "code": "OPT043001 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "WNL",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT043    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT043002 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "SCI",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT043    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT043003 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "CVA",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT043    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT043004 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "IICP",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT043    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT043005 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "Seizure",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT043    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT043006 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "Alt.of Conscious",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT043    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      }
    ],
    [
      {
        "code": "OPT044001 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "WNL",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT044    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT044002 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "Full stomatch",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT044    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT044003 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "Ascites",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT044    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT044004 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "Jaundice",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT044    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT044005 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "Cirrhosis",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT044    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      }
    ],
    [
      {
        "code": "OPT045001 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "WNL",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT045    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT045002 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "UTI",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT045    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT045003 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "ARF",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT045    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT045004 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "ESRD",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT045    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT045005 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "Renal Insufficiency",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT045    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      }
    ],
    [
      {
        "code": "OPT046001 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "WNL",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT046    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT046002 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "DM",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT046    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT046003 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "Thyriod",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT046    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT046004 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "Adrenal",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT046    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT046005 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "Autoimmune Disease",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT046    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      }
    ],
    [
      {
        "code": "OPT047001 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "WNL",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT047    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT047002 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "Anemia",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT047    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT047003 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "Coagulopathy",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT047    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT047004 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "Hepatitis",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT047    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT047005 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "HIV",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT047    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      }
    ],
    [
      {
        "code": "OPT048001 ",
        "textValue": "",
        "dataType": "TEXT",
        "chtnum": "900004  ",
        "require": "",
        "title": "Detail",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT048    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      }
    ],
    [],
    [
      {
        "code": "OPT050001 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "Thin",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT050    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT050002 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "Normal",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT050    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT050003 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "Obesity",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT050    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT050004 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "Morbid Obesity",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT050    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT050005 ",
        "textValue": "",
        "dataType": "TEXT",
        "chtnum": "900004  ",
        "require": "",
        "title": "Weight/kg",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT050    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT050006 ",
        "textValue": "",
        "dataType": "TEXT",
        "chtnum": "900004  ",
        "require": "",
        "title": "Height/cm",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT050    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT050007 ",
        "textValue": "",
        "dataType": "TEXT",
        "chtnum": "900004  ",
        "require": "",
        "title": "BMI/ kg/m2",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT050    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT050008 ",
        "textValue": "",
        "dataType": "TEXT",
        "chtnum": "900004  ",
        "require": "",
        "title": "BP/mmHg",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT050    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT050009 ",
        "textValue": "",
        "dataType": "TEXT",
        "chtnum": "900004  ",
        "require": "",
        "title": "P/bpm",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT050    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT050011 ",
        "textValue": "",
        "dataType": "TEXT",
        "chtnum": "900004  ",
        "require": "",
        "title": "RR/bpm",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT050    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT050010 ",
        "textValue": "",
        "dataType": "TEXT",
        "chtnum": "900004  ",
        "require": "",
        "title": "Temp/C",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT050    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      }
    ],
    [
      {
        "code": "OPT051001 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "Alert",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT051    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT051002 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "Confusion",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT051    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT051003 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "Drowsiness",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT051    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT051004 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "COMA [GCS......./15]",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT051    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT051005 ",
        "textValue": "",
        "dataType": "Normal Airway|Difficulty Intubation Expected",
        "chtnum": "900004  ",
        "require": "",
        "title": "Airway",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT051    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      }
    ],
    [
      {
        "code": "OPT052001 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "1",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT052    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT052002 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "2",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT052    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT052003 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "3",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT052    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT052004 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "4",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT052    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      }
    ],
    [
      {
        "code": "OPT053001 ",
        "textValue": "",
        "dataType": "<6|>6",
        "chtnum": "900004  ",
        "require": "",
        "title": "",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT053    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      }
    ],
    [
      {
        "code": "OPT054001 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "<3",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT054    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT054004 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": ">3",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT054    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT054002 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "Limitation of Head-Neck Motility",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT054    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT054003 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "Prominent Incisor",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT054    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT054005 ",
        "textValue": "",
        "dataType": "Endotracheal|Tracheostomy",
        "chtnum": "900004  ",
        "require": "",
        "title": "Artificial airways",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT054    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT054006 ",
        "textValue": "",
        "dataType": "WNL|Abnormal",
        "chtnum": "900004  ",
        "require": "",
        "title": "Dental",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT054    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT054007 ",
        "textValue": "",
        "dataType": "WNL|Abnormal",
        "chtnum": "900004  ",
        "require": "",
        "title": "CVS",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT054    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT054008 ",
        "textValue": "",
        "dataType": "WNL|Abnormal",
        "chtnum": "900004  ",
        "require": "",
        "title": "RS",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT054    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT054009 ",
        "textValue": "",
        "dataType": "WNL|Abnormal",
        "chtnum": "900004  ",
        "require": "",
        "title": "CNS",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT054    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT054010 ",
        "textValue": "",
        "dataType": "WNL|Abnormal",
        "chtnum": "900004  ",
        "require": "",
        "title": "Abdomen",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT054    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT054011 ",
        "textValue": "",
        "dataType": "WNL|Abnormal",
        "chtnum": "900004  ",
        "require": "",
        "title": "Extremity",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT054    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT054012 ",
        "textValue": "",
        "dataType": "WNL|Abnormal",
        "chtnum": "900004  ",
        "require": "",
        "title": "Landmark for R.A.",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT054    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT054013 ",
        "textValue": "",
        "dataType": "WNL|Abnormal",
        "chtnum": "900004  ",
        "require": "",
        "title": "Landmark for IV",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT054    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT054014 ",
        "textValue": "",
        "dataType": "TEXT",
        "chtnum": "900004  ",
        "require": "",
        "title": "Note",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT054    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      }
    ],
    [
      {
        "code": "OPT055001 ",
        "textValue": "",
        "dataType": "TEXT",
        "chtnum": "900004  ",
        "require": "",
        "title": "CBC:Hct",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT055    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT055002 ",
        "textValue": "",
        "dataType": "TEXT",
        "chtnum": "900004  ",
        "require": "",
        "title": "Hb",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT055    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT055003 ",
        "textValue": "",
        "dataType": "TEXT",
        "chtnum": "900004  ",
        "require": "",
        "title": "WBC",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT055    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT055004 ",
        "textValue": "",
        "dataType": "TEXT",
        "chtnum": "900004  ",
        "require": "",
        "title": "Plt",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT055    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT055005 ",
        "textValue": "",
        "dataType": "TEXT",
        "chtnum": "900004  ",
        "require": "",
        "title": "BS",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT055    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT055006 ",
        "textValue": "",
        "dataType": "TEXT",
        "chtnum": "900004  ",
        "require": "",
        "title": "BUN",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT055    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT055007 ",
        "textValue": "",
        "dataType": "TEXT",
        "chtnum": "900004  ",
        "require": "",
        "title": "Cr",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT055    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT055008 ",
        "textValue": "",
        "dataType": "TEXT",
        "chtnum": "900004  ",
        "require": "",
        "title": "Electrolytes:Na",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT055    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT055009 ",
        "textValue": "",
        "dataType": "TEXT",
        "chtnum": "900004  ",
        "require": "",
        "title": "K",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT055    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT055010 ",
        "textValue": "",
        "dataType": "TEXT",
        "chtnum": "900004  ",
        "require": "",
        "title": "Cl",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT055    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT055011 ",
        "textValue": "",
        "dataType": "TEXT",
        "chtnum": "900004  ",
        "require": "",
        "title": "CO2",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT055    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT055012 ",
        "textValue": "",
        "dataType": "TEXT",
        "chtnum": "900004  ",
        "require": "",
        "title": "LFT",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT055    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT055013 ",
        "textValue": "",
        "dataType": "TEXT",
        "chtnum": "900004  ",
        "require": "",
        "title": "Coagulation",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT055    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT055014 ",
        "textValue": "",
        "dataType": "TEXT",
        "chtnum": "900004  ",
        "require": "",
        "title": "INR",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT055    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT055015 ",
        "textValue": "",
        "dataType": "TEXT",
        "chtnum": "900004  ",
        "require": "",
        "title": "HIV",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT055    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT055016 ",
        "textValue": "",
        "dataType": "TEXT",
        "chtnum": "900004  ",
        "require": "",
        "title": "HBV",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT055    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT055017 ",
        "textValue": "",
        "dataType": "TEXT",
        "chtnum": "900004  ",
        "require": "",
        "title": "UA",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT055    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT055018 ",
        "textValue": "",
        "dataType": "TEXT",
        "chtnum": "900004  ",
        "require": "",
        "title": "CXR",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT055    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT055019 ",
        "textValue": "",
        "dataType": "TEXT",
        "chtnum": "900004  ",
        "require": "",
        "title": "[ABG/PFT]",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT055    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT055020 ",
        "textValue": "",
        "dataType": "TEXT",
        "chtnum": "900004  ",
        "require": "",
        "title": "EKG",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT055    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT055021 ",
        "textValue": "",
        "dataType": "TEXT",
        "chtnum": "900004  ",
        "require": "",
        "title": "Echo",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT055    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT055022 ",
        "textValue": "",
        "dataType": "TEXT",
        "chtnum": "900004  ",
        "require": "",
        "title": "CAG",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT055    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      }
    ],
    [
      {
        "code": "OPT056001 ",
        "textValue": "",
        "dataType": "TEXT",
        "chtnum": "900004  ",
        "require": "",
        "title": "PRC/Unit",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT056    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT056002 ",
        "textValue": "",
        "dataType": "TEXT",
        "chtnum": "900004  ",
        "require": "",
        "title": "FFP/Unit",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT056    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT056003 ",
        "textValue": "",
        "dataType": "TEXT",
        "chtnum": "900004  ",
        "require": "",
        "title": "WB/Unit",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT056    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT056004 ",
        "textValue": "",
        "dataType": "TEXT",
        "chtnum": "900004  ",
        "require": "",
        "title": "Plt/Unit",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT056    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT056005 ",
        "textValue": "",
        "dataType": "TEXT",
        "chtnum": "900004  ",
        "require": "",
        "title": "Other",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT056    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      }
    ],
    [
      {
        "code": "OPT057001 ",
        "textValue": "",
        "dataType": "TEXT",
        "chtnum": "900004  ",
        "require": "",
        "title": "NPO time/hours",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT057    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT057002 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "Full Stomach",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT057    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT057003 ",
        "textValue": "",
        "dataType": "TEXT",
        "chtnum": "900004  ",
        "require": "",
        "title": "Problem list",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT057    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      }
    ],
    [
      {
        "code": "OPT058001 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "1",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT058    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT058002 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "2",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT058    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT058003 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "3",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT058    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT058004 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "4",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT058    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT058005 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "5",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT058    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT058006 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "6",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT058    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT058007 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "E",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT058    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT058008 ",
        "textValue": "",
        "dataType": "Yes|No",
        "chtnum": "900004  ",
        "require": "",
        "title": "Discussion of anesthetic risk with patient/family",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT058    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT058009 ",
        "textValue": "",
        "dataType": "TEXT",
        "chtnum": "900004  ",
        "require": "",
        "title": "After discussion, patient/family prefer",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT058    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT058010 ",
        "textValue": "",
        "dataType": "Yes|No",
        "chtnum": "900004  ",
        "require": "",
        "title": "Informed Consent",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT058    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      }
    ],
    [
      {
        "code": "OPT059001 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "L.A.",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT059    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT059002 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "MAC",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT059    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT059003 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "G.A.",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT059    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT059004 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "R.A.:S.B./E.B./BB",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT059    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT059005 ",
        "textValue": "",
        "dataType": "TEXT",
        "chtnum": "900004  ",
        "require": "",
        "title": "Preparation",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT059    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT059006 ",
        "textValue": "",
        "dataType": "TEXT",
        "chtnum": "900004  ",
        "require": "",
        "title": "Monitoring",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT059    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT059007 ",
        "textValue": "",
        "dataType": "TEXT",
        "chtnum": "900004  ",
        "require": "",
        "title": "Premedication",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT059    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT059008 ",
        "textValue": "",
        "dataType": "TEXT",
        "chtnum": "900004  ",
        "require": "",
        "title": "Consultations",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT059    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT059009 ",
        "textValue": "",
        "dataType": "Yes|No",
        "chtnum": "900004  ",
        "require": "",
        "title": "Postoperative care need ICU",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT059    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      }
    ],
    [
      {
        "code": "OPT060001 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "Routine by Surgeon",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT060    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT060002 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "PCA",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT060    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT060003 ",
        "textValue": "",
        "dataType": "RADIO",
        "chtnum": "900004  ",
        "require": "",
        "title": "Epidural / Spinal Opioids",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT060    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT060004 ",
        "textValue": "",
        "dataType": "TEXT",
        "chtnum": "900004  ",
        "require": "",
        "title": "Note",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT060    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT060005 ",
        "textValue": "",
        "dataType": "CODE",
        "chtnum": "900004  ",
        "require": "",
        "title": "Anesthesiologist Signature",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT060    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      },
      {
        "code": "OPT060006 ",
        "textValue": "",
        "dataType": "DATETIME",
        "chtnum": "900004  ",
        "require": "",
        "title": "MD/Date",
        "type": "OPT6      ",
        "codeValue": "",
        "datetime": "            ",
        "topic": "OPT060    ",
        "formNum": "2341",
        "ocmnum": "13454292  ",
        "user": "          ",
        "table": "OPTNTBL   "
      }
    ]
  ];
  useEffect(() => {
    getPatientInfo();
    // getUserinfo();
  }, []);

  // const getUserinfo = async () => {
  //   const request_Patient_Report = {
  //     params: {
  //       dbServiceName: "WSGetPatientPhysicalExamByUser",
  //       ocmnum: ocmnum,
  //     },
  //   };
  //   // const userinfonull = [
  //   //   {
  //   //     "datetime": "",
  //   //     "user": "",
  //   //     "userCode": ""
  //   //   }
  //   // ];
  //   // const userinfotest = [
  //   //   // {
  //   //   //   "datetime": "20/09/2565",
  //   //   //   "user": "วิชัย ศรีมนัส",
  //   //   //   "userCode": "70390 "
  //   //   // }
  //   // ];
  //   await axios
  //     .get(
  //       `${BaseUrl.ram_internet_discharge_summary_newborn_patient_DBService_JSON_path}`,
  //       request_Patient_Report
  //     )
  //     .then((response) => {
  //       const responseData4 = response.data.result;
  //       setUserinfo(response.data.result);
  //       console.log("userinfo", responseData4);
  //       // getHeader();
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  const getPatientInfo = async () => {
    const request_Patient_Report = {
      params: {
        dbServiceName: "HSPatientInfo",
        ocmnum: ocmnum,
      },
    };
    await axios
      .get(
        `${BaseUrl.ram_internet_discharge_summary_newborn_patient_DBService_JSON_path}`,
        request_Patient_Report
      )
      .then((response) => {
        const responseData = response.data.result;
        setPatient(response.data.result);
        console.log("patient", responseData);
        getBody1();
        // getUserinfo();
        // getPaperinfo();
      })
      .catch((error) => {
        console.error(error);
      });
  };


  // const getHeader = async () => {
  //   const request_Header_Report = {
  //     params: {
  //       dbServiceName: "SWPhysicalExamTopic2",
  //       table: table,
  //       type: type,
  //     },
  //   };
  //   await axios
  //     .get(
  //       `${BaseUrl.ram_internet_discharge_summary_newborn_patient_DBService_JSON_path}`,
  //       request_Header_Report
  //     )
  //     .then((response) => {
  //       const responseData = response.data.result;
  //       setHeader(response.data.result);
  //       console.log("header", responseData);

  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };




  // useEffect(() => {
  //   getBody();
  // }, [header]);

  const getBody1 = async () => {
    let setRequst = [];
    for (let i = 37; i <= 60; i++) {
      const requestBody = {
        // params: {
        //   dbServiceName: "SWPatientFormList",
        //   ocmnum: ocmnum, // (เลขการรกษาของคนไขในรอบ รบมาจากหนา web P’Jane)
        //   type: type, //(column code in picture 1 )
        //   topic: header[i].topic, //(column “topic” in picture 2 )
        // },

        params: {
          dbServiceName: "SWPatientForm",
          ocmnum: ocmnum,
          chtnum: chtnum,
          table: "OPTNTBL",
          type: "OPT6",
          topic: "OPT0" + [i],
          seq: seq
        }
      };
      setRequst.push(
        await axios
          .get(
            `${BaseUrl.ram_internet_discharge_summary_newborn_patient_DBService_JSON_path}`,
            requestBody
          )
          .then((response) => {
            setData1.push(response.data.result);
          })
          .catch((error) => console.error(error))
      );
    }
    console.log(setData1, 'bodypre');
    getBody2();
  }

  const getBody2 = async () => {
    let setRequst = [];
    for (let i = 61; i <= 75; i++) {
      const requestBody = {
        // params: {
        //   dbServiceName: "SWPatientFormList",
        //   ocmnum: ocmnum, // (เลขการรกษาของคนไขในรอบ รบมาจากหนา web P’Jane)
        //   type: type, //(column code in picture 1 )
        //   topic: header[i].topic, //(column “topic” in picture 2 )
        // },

        params: {
          dbServiceName: "SWPatientForm",
          ocmnum: ocmnum,
          chtnum: chtnum,
          table: "OPTNTBL",
          type: "OPT5",
          topic: "OPT0" + [i],
          seq: seq
        }
      };
      setRequst.push(
        await axios
          .get(
            `${BaseUrl.ram_internet_discharge_summary_newborn_patient_DBService_JSON_path}`,
            requestBody
          )
          .then((response) => {
            setData2.push(response.data.result);
          })
          .catch((error) => console.error(error))
      );
    }
    console.log(setData2, 'bodypost');
  }
  //   // if (body != undefined || body.length > 0) {
  //   //   body.map((body, i) => {
  //   //     console.log("Data", body);
  //   //   });
  //   // }

  //   if (setData.length > 0) {
  //     console.log("Body", setData);
  //     // await getOcrNumber();
  //     await getData();
  //     await setDone(true);
  //   }
  // };
  // function ocrheader() {
  //   // if (setData.length > 0) {
  //   console.log("Body", setData);
  //   getOcrNumber();
  //   // getData();
  //   // setDone(true);
  //   // }
  // }
  // const getOcrNumber = () => {

  //   if (user.trim()) {


  //     const request_config = {
  //       params: {
  //         prm_ocm: urlencode(ocmnum.trim()), //ocm
  //         prm_date: urlencode(currentYearMonthDay()), //date
  //         prm_type: urlencode("ACC15"), //รหัสเอกสาร
  //         prm_user: urlencode(user), //user ใช้งาน
  //       },
  //     };

  //     axios
  //       .get(
  //         `http://10.100.212.182/AWSqlConnect/RequestOCR.php`,
  //         request_config
  //       )
  //       .then(async (response) => {
  //         try {
  //           let responseData = await response.data;
  //           console.log(responseData, 'ocrdata');
  //           await setOcr(responseData);
  //           window.print();
  //           console.log('You clicked window print.');
  //         } catch (error) {
  //           console.log(error);
  //         }
  //       })
  //       .catch((error) => console.error(error));
  //   }
  // };

  // const getData = () => {
  //   setData.map((body, i) => {
  //     body.map((list, i) => {
  //       dataList.push(list);
  //     });
  //   });

  //   console.log("list", dataList);

  // };

  return (
    <>
      {!done ? (
        <div className="justify-center flex mt-96 content-center ">
          <ReactLoading
            type={"spin"}
            color={"#3c4187"}
            height={100}
            width={100}
          />
        </div>
      ) : (
        <div className=" ">
          {!done ? null : (
            <div className=" px-5 py-2 w-screen text-3xl font-bold shadow-lg items-center bg-slate-50 flex space-x-6 mb-3">
              {/* <img src={LoGo} className=" " width="300" alt="" /> */}
              <p classname="">Pre-Post Anesthesia Evaluation Record</p>
              <button
                onClick={window.print}
                className=" border-black rounded-md hover:bg-indigo-900 h-10  hover:text-white border parafont2 px-5 "
              >
                Print
              </button>
            </div>
          )}

          <div >
            <page
              size="A4"
              id="section-to-print"
              className="div-container-print "
            >


              <thead>
                {/* page1 */}
                <header className="grid grid-cols-3 parafont" style={{ marginBottom: "10px" }}>
                  <div className="header-1 ">
                    <div className="border border-black  border-r-0 border-b-0 pl-5 place-items-center">
                      <img src={LoGo} className=" w-11/12" alt="" />
                      {/* <div className="col-span-3 ">
                <p>โรงพยาบาลรามคำแหง</p>
                <p className="text-xxs uppercase">Ramkhamhaeng Hospital</p>
                <p className="text-xxs">https://www.ram-hosp.co.th</p>
              </div> */}
                    </div>
                    <div className="border border-black border-r-0 grid grid-cols-4  place-items-center" style={{ height: "67px" }}>
                      <div className=" col-span-4 text-center">
                        <b>
                          Pre-Post Anesthesia Evaluation Record {test1[0][0]['code']}
                        </b>
                      </div>
                    </div>
                  </div>
                  <div className="border border-black border-r-0 p-1 -mr-10 space-y-1 pt-0.5">
                    {patient.map((data, i) => (
                      <>
                        <div key={i} className="flex space-x-4">
                          <p className="font-bold">Name:</p>
                          &nbsp;{data.name}
                        </div>
                        <div className="flex space-x-4">
                          <p className="font-bold">Birthday: </p>
                          &nbsp;{data.BirthDte}{" "}
                          <p className="font-bold">Age (Y.M.D):</p>
                          &nbsp;{data.age}
                        </div>
                        <div className="flex space-x-4 "></div>
                        <div className="flex space-x-4">
                          <p className="font-bold">HN: </p>
                          &nbsp;{data.hn}
                          <p className="font-bold">VN: </p>
                          &nbsp;{data.AN_VN}
                        </div>
                        <div className="flex space-x-4">
                          <p className="font-bold">Register date: </p>
                          {/* &nbsp;{data.registerDatetime} */}
                          <br />
                        </div>
                      </>
                    ))}
                  </div>
                  <div className="border overflow-hidden border-black ml-5 place-items-center center-kit">
                    {ocr.length > 0 ? (
                      <div className="text-white headertitleocr mt-1.5">
                        +{ocr[0].Return}+
                      </div>
                    ) : null}
                    <div className="hidden mt-7 font-thin">
                      {patient.map((data, i) => (
                        <Barcode
                          height="25"
                          width="1"
                          displayValue="false"
                          format="CODE39"
                          // textMargin={2}
                          // fontSize={20}
                          value={data.hn}
                        />
                      ))}
                    </div>
                  </div>
                </header>
              </thead>
              <tbody>
                <header className="grid grid-cols-1 parafont" style={{ marginBottom: "10px", lineHeight: "normal" }}>
                  <div className="header-1 ">
                    <div className="border border-black   border-b-0 pl-1 place-items-center">
                      {/* <div>
                        ............................................................................................................................................................................................
                      </div> */}
                      <div className=" grid grid-cols-5 gap-3 " style={{}}>
                        <div className=" col-span-3 parafont">
                          <p className=" fontpage">Pre-op evaluated by Doctor :  ................................................................................................... at</p>
                        </div>
                        <div className=" col-span-2 ">
                          <div className=" grid grid-cols-4 gap-3 my-1" >
                            <div className=" col-span-1 fontpage">
                              <div id="squares">
                                <div id="square1"></div>
                              </div>
                              ward
                            </div>
                            <div className=" col-span-1 fontpage">
                              <div id="squares">
                                <div id="square1"></div>
                              </div>
                              OR
                            </div>

                            <div className=" col-span-2 fontpage">
                              <div id="squares">
                                <div id="square1"></div>
                              </div>
                              ...............................
                            </div>

                          </div>
                        </div>

                      </div>
                      <div className=" grid grid-cols-3 gap-3 " style={{}}>
                        <div className=" col-span-1 parafont">
                          <p className=" fontpage">Date of Operation  .................................................</p>
                        </div>
                        <div className=" col-span-1 parafont">
                          <p className=" fontpage">Surgeon  ..............................................................</p>
                        </div>
                        <div className=" col-span-1 parafont">
                          <p className=" fontpage">Anesthesiologist  ..............................................</p>
                        </div>

                      </div>
                    </div>
                    <div className=" grid grid-cols-11  border border-black   border-b-0 " style={{}}>
                      <div className=" col-span-6 parafont border border-black  border-y-0 border-l-0 pl-1" style={{ lineHeight: "20px" }}>
                        <h3><b>History :</b></h3>
                        <div className=" grid grid-cols-6  " style={{}}>
                          <div className=" col-span-2 parafont">
                            <p className=" fontpage">Previous Anesthesia</p>
                          </div>
                          <div className=" col-span-1 fontpage">
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            G.A
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-15px" }}>
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            R.A
                          </div>
                          <div className=" col-span-2 fontpage" style={{ marginLeft: "-18px" }}>
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            MAC Problem ...................
                          </div>
                        </div>
                        <p className=" fontpage">Previous Medication ...................................................</p>
                        <p className=" fontpage">Family Hx ................................................................................</p>
                        <div className=" grid grid-cols-4  " style={{ paddingLeft: "20px" }}>

                          <div className=" col-span-1 fontpage">
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            Alcohol
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-15px" }}>
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            Smoking
                          </div>
                          <div className=" col-span-2 fontpage" style={{ marginLeft: "-18px" }}>
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            Drugs Allergy ..........................
                          </div>
                        </div>
                        <h3><b>Personal Hx :</b></h3>
                        <div className=" grid grid-cols-8 gap-3 my-1" >
                          <div className=" col-span-3 parafont">
                            <p className=" fontpage">Functional Class [NYHA] :  </p></div>
                          <div className=" col-span-1 fontpage">
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            1
                          </div>
                          <div className=" col-span-1 fontpage">
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            2
                          </div>
                          <div className=" col-span-1 fontpage">
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            3
                          </div>
                          <div className=" col-span-1 fontpage">
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            4
                          </div>

                        </div>
                        <div className=" grid grid-cols-7 gap-3 my-1" >
                          <div className=" col-span-1 parafont">
                            <p className=" fontpage">RS  </p></div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-11px" }}>
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            WNL
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-25px" }}>
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            URI
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-40px" }}>
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            LRI
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-45px" }}>
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            Asthma
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-45px" }}>
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            Effusion
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-45px" }}>
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            Obstruction
                          </div>

                        </div>

                        <div className=" grid grid-cols-7 gap-3 my-1" >
                          <div className=" col-span-1 parafont">
                            <p className=" fontpage">CVS  </p></div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-11px" }}>
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            WNL
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-25px" }}>
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            HT
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-40px" }}>
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            IHD
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-45px" }}>
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            CHD
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-45px" }}>
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            CHF
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-45px" }}>
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            Arrthymia
                          </div>

                        </div>
                        <div className=" grid grid-cols-7 gap-3 my-1" >
                          <div className=" col-span-1 parafont">
                            <p className=" fontpage">CNS  </p></div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-11px" }}>
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            WNL
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-25px" }}>
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            SCI
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-40px" }}>
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            CVA
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-45px" }}>
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            IICP
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-45px" }}>
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            Seizure
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-45px" }}>
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            Alt. of Conscious
                          </div>

                        </div>
                        <div className=" grid grid-cols-7 gap-3 my-1" >
                          <div className=" col-span-1 parafont">
                            <p className=" fontpage">GI  </p></div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-11px" }}>
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            WNL
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-25px" }}>
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            Full stomach
                          </div>
                          <div className=" col-span-1 fontpage">
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            Ascites
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-10px" }}>
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            Jaundice
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-10px" }}>
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            Cirrhosis
                          </div>


                        </div>
                        <div className=" grid grid-cols-7 gap-3 my-1" >
                          <div className=" col-span-1 parafont">
                            <p className=" fontpage">GU  </p></div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-11px" }}>
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            WNL
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-25px" }}>
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            UTI
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-40px" }}>
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            ARF
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-45px" }}>
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            ESRD
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-45px" }}>
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            Renal Insufficiency
                          </div>


                        </div>
                        <div className=" grid grid-cols-7 gap-3 my-1" >
                          <div className=" col-span-1 parafont">
                            <p className=" fontpage">Endoc  </p></div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-11px" }}>
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            WNL
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-25px" }}>
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            DM
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-40px" }}>
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            Thyroid
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-45px" }}>
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            Adrenal
                          </div>
                          <div className=" col-span-2 fontpage" style={{ marginLeft: "-45px" }}>
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            Autoimmune Disease
                          </div>


                        </div>
                        <div className=" grid grid-cols-7 gap-3 my-1" >
                          <div className=" col-span-1 parafont">
                            <p className=" fontpage">Hemato  </p></div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-11px" }}>
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            WNL
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-25px" }}>
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            Anemia
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-35px" }}>
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            Coagulopathy
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-15px" }}>
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            Hepatitis
                          </div>
                          <div className=" col-span-2 fontpage" style={{ marginLeft: "-15px" }}>
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            HIV
                          </div>


                        </div>
                        <p className="fontpage">Note : ..................................................................</p>
                      </div>




                      <div className=" col-span-5 parafont pl-1" style={{ lineHeight: "20px" }}>
                        <h3><b>LABORATORY :</b></h3>
                        <div className=" grid grid-cols-5  my-1" >
                          <div className=" col-span-2 parafont">
                            <p className=" fontpage">CBC:Hct .....................  </p>
                          </div>
                          <div className=" col-span-1 parafont">
                            <p className=" fontpage">Hb ................  </p>
                          </div>
                          <div className=" col-span-1 parafont">
                            <p className=" fontpage">WBC ...........  </p>
                          </div>
                          <div className=" col-span-1 parafont">
                            <p className=" fontpage">Pit ................  </p>
                          </div>
                        </div>
                        <div className=" grid grid-cols-3  my-1" >
                          <div className=" col-span-1 parafont">
                            <p className=" fontpage">ฺBS ........................ </p>
                          </div>
                          <div className=" col-span-1 parafont">
                            <p className=" fontpage">BUN ................  </p>
                          </div>
                          <div className=" col-span-1 parafont">
                            <p className=" fontpage">CR ...........  </p>
                          </div>
                        </div>
                        <div className=" grid grid-cols-5  my-1 parafont" >
                          <div className=" col-span-1">
                            <p className=" fontpage">Electrolytes : </p>
                          </div>
                          <div className=" col-span-1">
                            <p className=" fontpage">NA ................  </p>
                          </div>
                          <div className=" col-span-1">
                            <p className=" fontpage">K ...........  </p>
                          </div>
                          <div className=" col-span-1">
                            <p className=" fontpage">CI ...........  </p>
                          </div>
                          <div className=" col-span-1">
                            <p className=" fontpage">CO2 ...........  </p>
                          </div>
                        </div>
                        <p className="fontpage">LFT  ..................................................................</p>
                        <div className=" grid grid-cols-2  my-1 parafont" >
                          <div className=" col-span-1">
                            <p className=" fontpage">Coagulation .............................. </p>
                          </div>
                          <div className=" col-span-1">
                            <p className=" fontpage">JNR ............................... </p>
                          </div>
                        </div>
                        <div className=" grid grid-cols-2  my-1 parafont" >
                          <div className=" col-span-1">
                            <p className=" fontpage">HIV .............................. </p>
                          </div>
                          <div className=" col-span-1">
                            <p className=" fontpage">HBV ............................... </p>
                          </div>
                        </div>
                        <p className="fontpage">UA  ..................................................................</p>
                        <p className="fontpage">CXR  ..................................................................</p>
                        <p className="fontpage">[ABG/PFT]  ..................................................................</p>
                        <p className="fontpage">EKG  ..................................................................</p>
                        <p className="fontpage">Echo  ..................................................................</p>
                        <p className="fontpage">CAG  ..................................................................</p>
                        <div className=" grid grid-cols-4 gap-3 my-1" >
                          <div className=" col-span-1 parafont">
                            <p className=" fontpage">Blood Preparation  </p></div>
                          <div className=" col-span-1 fontpage" >
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            PRC...........Unit
                          </div>
                          <div className=" col-span-1 fontpage">
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            FFP...........Unit
                          </div>
                          <div className=" col-span-1 fontpage">
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            WB...........Unit
                          </div>
                        </div>
                        <div className=" grid grid-cols-4 gap-3 my-1" >
                          <div className=" col-span-1 parafont">
                            <p className=" fontpage">   </p></div>
                          <div className=" col-span-1 fontpage">
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            Plt...........Unit
                          </div>
                          <div className=" col-span-2 fontpage" style={{ marginLeft: "" }}>
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            ............................................
                          </div>

                        </div>
                      </div>

                    </div>
                    <div className=" grid grid-cols-11  border border-black    " style={{}}>
                      <div className=" col-span-6 parafont border border-black  border-y-0 border-l-0 pl-1" style={{ lineHeight: "20px" }}>
                        <h3><b>PHYSICAL EXAMINATION :</b></h3>
                        <div className=" grid grid-cols-5 gap-3 my-1" >
                          <div className=" col-span-1 parafont">
                            <p className=" fontpage">Body built  </p>
                          </div>
                          <div className=" col-span-1 fontpage" >
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            Thin
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-10px" }}>
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            Normal
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-10px" }} >
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            Obesity
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-10px" }}>
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            Morbid Obesity
                          </div>
                        </div>
                        <div className=" grid grid-cols-3 gap-3 my-1" >
                          <div className=" col-span-1 parafont">
                            <p className=" fontpage">Weight ........................ kg </p>
                          </div>
                          <div className=" col-span-1 parafont">
                            <p className=" fontpage">Height ........................ cm</p>
                          </div>
                          <div className=" col-span-1 parafont">
                            <p className=" fontpage">ฺBMI ........................ kg/m2</p>
                          </div>
                        </div>
                        <div className=" grid grid-cols-4 gap-3 my-1" >
                          <div className=" col-span-1 parafont">
                            <p className=" fontpage">BP............./.............mmHg </p>
                          </div>
                          <div className=" col-span-1 parafont">
                            <p className=" fontpage">P ........................ bpm</p>
                          </div>
                          <div className=" col-span-1 parafont">
                            <p className=" fontpage">RR..........bpm</p>
                          </div>
                          <div className=" col-span-1 parafont">
                            <p className=" fontpage">T.......... C</p>
                          </div>
                        </div>
                        <div className=" grid grid-cols-6 gap-3 my-1" >
                          <div className=" col-span-1 parafont">
                            <p className=" fontpage">Conscious  </p>
                          </div>
                          <div className=" col-span-1 fontpage" >
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            Alert
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-10px" }}>
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            Confusion
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-10px" }} >
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            Drowsiness
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-10px" }}>
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            COMA
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-10px" }}>

                            [GCS......../15]
                          </div>
                        </div>
                        <div className=" grid grid-cols-4 gap-3 my-1" >
                          <div className=" col-span-1 parafont">
                            <p className=" fontpage">Airway  </p>
                          </div>
                          <div className=" col-span-1 fontpage" style={{ marginLeft: "-40px" }}>
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            Normal Airway
                          </div>
                          <div className=" col-span-2 fontpage" style={{ marginLeft: "-10px" }}>
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            Difficulty Intubation Expected
                          </div>
                        </div>
                        <p className="fontpage">- Maillampati Classification   1    2   3    4</p>
                        <div className=" grid grid-cols-3 gap-3 my-1" >
                          <div className=" col-span-1 parafont">
                            <p className=" fontpage">-  Thyromental Distance  </p>
                          </div>
                          <div className=" col-span-1 fontpage" >
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            &gt; 6 cm
                          </div>
                          <div className=" col-span-1 fontpage" >
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            &lt; 6 cm
                          </div>
                        </div>
                        <div className=" grid grid-cols-3 gap-3 my-1" >
                          <div className=" col-span-1 parafont">
                            <p className=" fontpage">-  Mouth Opening  </p>
                          </div>
                          <div className=" col-span-1 fontpage" >
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            &gt; 3 cm
                          </div>
                          <div className=" col-span-1 fontpage" >
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            &lt; 3 cm
                          </div>
                        </div>
                        <div className=" grid grid-cols-3 gap-3 my-1" >
                          <div className=" col-span-2 parafont fontpage" style={{ marginLeft: "20px" }}>
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            Limitation of Head-Neck Motility
                          </div>
                          <div className=" col-span-1 fontpage" >
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            Prominent Incisor
                          </div>
                        </div>
                        <div className=" grid grid-cols-3 gap-3 my-1" >
                          <div className=" col-span-1 parafont fontpage" >
                            Artificial airways
                          </div>
                          <div className=" col-span-1 fontpage" >
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            Endotracheal
                          </div>
                          <div className=" col-span-1 fontpage" >
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            Tracheostomy
                          </div>
                        </div>
                        <div className=" grid grid-cols-6 gap-3 my-1" >
                          <div className=" col-span-1 parafont fontpage" >
                            Dental
                          </div>
                          <div className=" col-span-1 fontpage" >
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            WNL
                          </div>
                          <div className=" col-span-4 fontpage" >
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            Abnormal .......................................
                          </div>
                        </div>
                        <div className=" grid grid-cols-6 gap-3 my-1" >
                          <div className=" col-span-1 parafont fontpage" >
                            CVS
                          </div>
                          <div className=" col-span-1 fontpage" >
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            WNL
                          </div>
                          <div className=" col-span-4 fontpage" >
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            Abnormal .......................................
                          </div>
                        </div>
                        <div className=" grid grid-cols-6 gap-3 my-1" >
                          <div className=" col-span-1 parafont fontpage" >
                            RS
                          </div>
                          <div className=" col-span-1 fontpage" >
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            WNL
                          </div>
                          <div className=" col-span-4 fontpage" >
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            Abnormal .......................................
                          </div>
                        </div>
                        <div className=" grid grid-cols-6 gap-3 my-1" >
                          <div className=" col-span-1 parafont fontpage" >
                            CNS
                          </div>
                          <div className=" col-span-1 fontpage" >
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            WNL
                          </div>
                          <div className=" col-span-4 fontpage" >
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            Abnormal .......................................
                          </div>
                        </div>
                        <div className=" grid grid-cols-6 gap-3 my-1" >
                          <div className=" col-span-1 parafont fontpage" >
                            Abdomen
                          </div>
                          <div className=" col-span-1 fontpage" >
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            WNL
                          </div>
                          <div className=" col-span-4 fontpage" >
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            Abnormal .......................................
                          </div>
                        </div>
                        <div className=" grid grid-cols-6 gap-3 my-1" >
                          <div className=" col-span-1 parafont fontpage" >
                            Extremity
                          </div>
                          <div className=" col-span-1 fontpage" >
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            WNL
                          </div>
                          <div className=" col-span-4 fontpage" >
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            Abnormal .......................................
                          </div>
                        </div>
                        <div className=" grid grid-cols-4 gap-3 my-1" >
                          <div className=" col-span-1 parafont fontpage" >
                            Landmark for R.A.
                          </div>
                          <div className=" col-span-1 fontpage" >
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            WNL
                          </div>
                          <div className=" col-span-2 fontpage" >
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            Abnormal .......................................
                          </div>
                        </div>
                        <div className=" grid grid-cols-4 gap-3 my-1" >
                          <div className=" col-span-1 parafont fontpage" >
                            Landmark for IV
                          </div>
                          <div className=" col-span-1 fontpage" >
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            WNL
                          </div>
                          <div className=" col-span-2 fontpage" >
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            Abnormal .......................................
                          </div>
                        </div>
                        <p className="fontpage">Note : ......................................</p>
                      </div>
                      <div className=" col-span-5 parafont pl-1" style={{ lineHeight: "20px" }}>
                        <h3><b>ASSESSMENT :</b></h3>
                        <div className=" grid grid-cols-2 gap-3 my-1" >
                          <div className=" col-span-1 parafont">
                            <p className=" fontpage">NPO time ................ hours  </p>
                          </div>
                          <div className=" col-span-1 fontpage" >
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            Full stomach [....................]
                          </div>
                        </div>
                        <p className="fontpage">Problem list ...................................................................................................................</p>
                        <div className=" grid grid-cols-10 gap-3 my-1" >
                          <div className=" col-span-3 parafont">
                            <p className=" fontpage">ASA classification  </p>
                          </div>
                          <div className=" col-span-1 fontpage" >
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            1
                          </div>
                          <div className=" col-span-1 fontpage" >
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            2
                          </div>
                          <div className=" col-span-1 fontpage" >
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            3
                          </div>
                          <div className=" col-span-1 fontpage" >
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            4
                          </div>
                          <div className=" col-span-1 fontpage" >
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            5
                          </div>
                          <div className=" col-span-1 fontpage" >
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            6
                          </div>
                          <div className=" col-span-1 fontpage" >
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            E
                          </div>
                        </div>
                        <div className=" grid grid-cols-6 gap-3 my-1" >
                          <div className=" col-span-4 parafont fontpage" >
                            Discussion of anesthetic risk with patient/family
                          </div>
                          <div className=" col-span-1 fontpage" >
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            Yes
                          </div>
                          <div className=" col-span-1 fontpage" >
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            No
                          </div>
                        </div>
                        <div className=" grid grid-cols-2 gap-3 my-1" >
                          <div className=" col-span-1 parafont fontpage" >
                            After discussion, patient/ family prefer
                          </div>
                          <div className=" col-span-1 fontpage" >
                            .......................................................
                          </div>

                        </div>
                        <div className=" grid grid-cols-7 gap-3 my-1" >
                          <div className=" col-span-2 parafont fontpage" >
                            Informed Consent
                          </div>
                          <div className=" col-span-1 fontpage" >
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            Yes
                          </div>
                          <div className=" col-span-1 fontpage" >
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            No
                          </div>
                        </div>
                        <div className=" grid grid-cols-7 gap-3 my-1" >
                          <div className=" col-span-2 parafont fontpage" >
                            Anesthetic Technique
                          </div>
                          <div className=" col-span-1 fontpage" >
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            L.A
                          </div>
                          <div className=" col-span-1 fontpage" >
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            MAC
                          </div>
                          <div className=" col-span-1 fontpage" >
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            G.A.
                          </div>
                          <div className=" col-span-2 fontpage" >
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            R.A:S.B/E.B/BB
                          </div>
                        </div>
                        <p className="fontpage">Preparation .........................................................</p>
                        <p className="fontpage">Monitoring .........................................................</p>
                        <p className="fontpage">Premedication .........................................................</p>
                        <p className="fontpage">Consultations .........................................................</p>
                        <div className=" grid grid-cols-6 gap-3 my-1" >
                          <div className=" col-span-3 parafont fontpage" >
                            Postoperative care need ICU
                          </div>
                          <div className=" col-span-1 fontpage" >
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            Yes
                          </div>
                          <div className=" col-span-1 fontpage" >
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            No
                          </div>
                        </div>
                        <p className="fontpage">..................................................</p>
                        <div className=" grid grid-cols-6 gap-3 my-1" >
                          <div className=" col-span-2 parafont fontpage" >
                            Postoperative Pain
                          </div>
                          <div className=" col-span-2 fontpage" >
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            Routine by Surgeon
                          </div>
                          <div className=" col-span-1 fontpage" >
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            PCA
                          </div>
                        </div>
                        <div className=" grid grid-cols-6 gap-3 my-1" >
                          <div className=" col-span-2 parafont fontpage" >
                          </div>
                          <div className=" col-span-3 fontpage" >
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            Epidural / Spinal Opioids
                          </div>
                        </div>
                        <p className="fontpage">Note : ..................................................</p>
                        <div className=" grid grid-cols-3 gap-3 my-1" >
                          <div className=" col-span-2 parafont fontpage" >
                            Anesthesiologist Signature ...........................................
                          </div>
                          <div className=" col-span-1 fontpage" >
                            MD/Date.............................
                          </div>

                        </div>
                      </div>





                    </div>

                  </div>
                  <div className=" grid grid-cols-3 gap-3 my-1" style={{ marginTop: "18px" }} >
                    <div className=" col-span-1 " style={{ fontSize: "18px" }}>
                      <p className="">EMR:AOP53 </p>
                    </div>
                    <div className=" col-span-1 " style={{ fontSize: "18px", textAlign: "center" }}>

                      Page 1 of 2
                    </div>
                    <div className=" col-span-1 " style={{ fontSize: "18px", textAlign: "right" }}>
                      <p className="">FAOP 00053Rev06</p>
                    </div>
                  </div>
                </header>
              </tbody>

              <tbody>
                <header className="grid grid-cols-1 parafont" style={{ marginBottom: "10px" }}>
                  <div className="header-1 ">
                    <div className=" grid grid-cols-11  border border-black   border-b-0 " style={{}}>
                      <div className=" col-span-5 parafont border border-black  border-y-0 border-l-0 pl-1">
                        <p className="fontpage">Post Operation evaluated by Doctor ....................................</p>
                      </div>
                      <div className=" col-span-6 parafont  pl-1 fontpage">
                        <div className=" grid grid-cols-2">
                          <div className="col-span-1">Date of Operation .........................</div>
                          <div className="col-span-1">Post Operation day ...............................</div>

                        </div>
                      </div>
                    </div>
                    <div className=" grid grid-cols-11  border border-black   border-b-0 " style={{}}>
                      <div className=" col-span-5 parafont border border-black  border-y-0 border-l-0 pl-1" >
                        <h3><b>Intraoperaive management:</b></h3>
                        <p className="fontpage">Diagnosis ...................................</p>
                        <p className="fontpage">Operation ...................................</p>
                        <div className=" grid grid-cols-2 fontpage" >
                          <div className="col-span=2">
                            Anesthesiologist ...........................
                          </div>
                          <div className="col-span=2">
                            Surgeon .................................
                          </div>
                        </div>
                        <p className="fontpage">Anesthetic thechnique:</p>
                        <div className="grid grid-cols-8 fontpage">
                          <div className="col-span-1">
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            L.A.
                          </div>
                          <div className="col-span-1">
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            MAC
                          </div>
                          <div className="col-span-1">
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            G.A.
                          </div>
                          <div className="col-span-2">
                            :ET-tube/Mask/.........
                          </div>
                          <div className="col-span-3">
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            R.A.:S.B/E.B./BB/..........
                          </div>
                        </div>
                        <p className="fontpage">Positioning:</p>
                        <div className="grid grid-cols-6 fontpage">
                          <div className="col-span-1">
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            Supine
                          </div>
                          <div className="col-span-1">
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            Lithotomy
                          </div>
                          <div className="col-span-1">
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            Prone
                          </div>
                          <div className="col-span-1">
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            Lateral
                          </div>
                          <div className="col-span-2">
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            Other .............
                          </div>
                        </div>
                        <div className="grid grid-cols-4 fontpage">
                          <div className="col-span-2">
                            Intraoperaive untoward events:
                          </div>
                          <div className="col-span-1">
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            No
                          </div>
                          <div className="col-span-1">
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            Yes
                          </div>
                        </div>
                        <div className="fontpage">
                          <div id="squares">
                            <div id="square1"></div>
                          </div>
                          Airway.................................................................
                        </div>
                        <div className="fontpage">
                          <div id="squares">
                            <div id="square1"></div>
                          </div>
                          Respiratory.................................................................
                        </div>
                        <div className="fontpage">
                          <div id="squares">
                            <div id="square1"></div>
                          </div>
                          CVS.................................................................
                        </div>
                        <div className="fontpage">
                          <div id="squares">
                            <div id="square1"></div>
                          </div>
                          CNS.................................................................
                        </div>
                        <div className="fontpage">
                          <div id="squares">
                            <div id="square1"></div>
                          </div>
                          Block.................................................................
                        </div>
                        <div className="fontpage">
                          <div id="squares">
                            <div id="square1"></div>
                          </div>
                          Pain.................................................................
                        </div>
                        <div className="fontpage">
                          <div id="squares">
                            <div id="square1"></div>
                          </div>
                          Miscellaneous.................................................................
                        </div>
                      </div>
                      <div className=" col-span-6 parafont border border-black  border-r-0 border-t-0 border-l-0 pl-1" >
                        <div className=" col-span-5 parafont" >
                          <h3><b>Postoperative Complications:</b></h3>
                          <div className="grid grid-cols-5" >
                            <div className="col-span-3 fontpage">
                              1.HEENT :
                            </div>
                            <div className="col-span-1 fontpage">
                              <div id="squares">
                                <div id="square1"></div>
                              </div>
                              No
                            </div>
                            <div className="col-span-1 fontpage" style={{ marginLeft: "-16px" }}>
                              <div id="squares">
                                <div id="square1"></div>
                              </div>
                              Yes
                            </div>
                          </div>
                          <div className="grid grid-cols-4" style={{ marginLeft: "30px" }}>
                            <div className="col-span-1 fontpage">
                              <div id="squares">
                                <div id="square1"></div>
                              </div>
                              Lip Trauma
                            </div>
                            <div className="col-span-1 fontpage">
                              <div id="squares">
                                <div id="square1"></div>
                              </div>
                              Dental Trauma
                            </div>
                            <div className="col-span-1 fontpage">
                              <div id="squares">
                                <div id="square1"></div>
                              </div>
                              Sor Throat
                            </div>
                            <div className="col-span-1 fontpage">
                              <div id="squares">
                                <div id="square1"></div>
                              </div>
                              Hoarseness
                            </div>
                          </div>
                          <div className="grid grid-cols-4" style={{ marginLeft: "30px" }}>
                            <div className="col-span-1 fontpage">
                              <div id="squares">
                                <div id="square1"></div>
                              </div>
                              Corneal Abrasion
                            </div>
                            <div className="col-span-1 fontpage">
                              <div id="squares">
                                <div id="square1"></div>
                              </div>
                              Eye Injury
                            </div>
                            <div className="col-span-1 fontpage">
                              <div id="squares">
                                <div id="square1"></div>
                              </div>
                              Ear Injury
                            </div>
                            <div className="col-span-1 fontpage">
                              <div id="squares">
                                <div id="square1"></div>
                              </div>
                              Nose Injury
                            </div>
                          </div>
                          <div className="grid grid-cols-5" >
                            <div className="col-span-3 fontpage">
                              1.Respiratory :
                            </div>
                            <div className="col-span-1 fontpage">
                              <div id="squares">
                                <div id="square1"></div>
                              </div>
                              No
                            </div>
                            <div className="col-span-1 fontpage" style={{ marginLeft: "-16px" }}>
                              <div id="squares">
                                <div id="square1"></div>
                              </div>
                              Yes
                            </div>
                          </div>
                          <div className="grid grid-cols-4" style={{ marginLeft: "30px" }}>
                            <div className="col-span-1 fontpage">
                              <div id="squares">
                                <div id="square1"></div>
                              </div>
                              Hypoxemia
                            </div>
                            <div className="col-span-1 fontpage">
                              <div id="squares">
                                <div id="square1"></div>
                              </div>
                              Hypoventilation
                            </div>
                            <div className="col-span-2 fontpage" style={{ marginLeft: "30px" }}>
                              <div id="squares">
                                <div id="square1"></div>
                              </div>
                              Hyperventilation
                            </div>

                          </div>
                          <div className="grid grid-cols-4" style={{ marginLeft: "30px" }}>
                            <div className="col-span-1 fontpage">
                              <div id="squares">
                                <div id="square1"></div>
                              </div>
                              Aspiration
                            </div>
                            <div className="col-span-1 fontpage">
                              <div id="squares">
                                <div id="square1"></div>
                              </div>
                              Pneumothorax
                            </div>
                            <div className="col-span-2 fontpage" style={{ marginLeft: "30px" }}>
                              <div id="squares">
                                <div id="square1"></div>
                              </div>
                              Reintubation
                            </div>

                          </div>
                          <div className="grid grid-cols-5" >
                            <div className="col-span-3 fontpage">
                              3.CVS :
                            </div>
                            <div className="col-span-1 fontpage">
                              <div id="squares">
                                <div id="square1"></div>
                              </div>
                              No
                            </div>
                            <div className="col-span-1 fontpage" style={{ marginLeft: "-16px" }}>
                              <div id="squares">
                                <div id="square1"></div>
                              </div>
                              Yes
                            </div>
                          </div>
                          <div className="grid grid-cols-5" style={{ marginLeft: "30px" }}>
                            <div className="col-span-1 fontpage">
                              <div id="squares">
                                <div id="square1"></div>
                              </div>
                              Bradycardia
                            </div>
                            <div className="col-span-1 fontpage">
                              <div id="squares">
                                <div id="square1"></div>
                              </div>
                              Tachycardia
                            </div>
                            <div className="col-span-1 fontpage" >
                              <div id="squares">
                                <div id="square1"></div>
                              </div>
                              Dysrhythmia
                            </div>
                          </div>
                          <div className="grid grid-cols-5" style={{ marginLeft: "30px" }}>
                            <div className="col-span-2 fontpage">
                              <div id="squares">
                                <div id="square1"></div>
                              </div>
                              Hypotension [&gt;30%Pre-op SBP]
                            </div>
                            <div className="col-span-3 fontpage">
                              <div id="squares">
                                <div id="square1"></div>
                              </div>
                              Hypertension [&lt;30%Pre-op SBP]
                            </div>
                          </div>
                          <div className="grid grid-cols-5" style={{ marginLeft: "30px" }}>
                            <div className="col-span-2 fontpage">
                              <div id="squares">
                                <div id="square1"></div>
                              </div>
                              Chest Pain/MI suspected
                            </div>
                            <div className="col-span-3 fontpage">
                              <div id="squares">
                                <div id="square1"></div>
                              </div>
                              Myocardial Ischemia
                            </div>
                          </div>
                          <div className="grid grid-cols-5" style={{ marginLeft: "30px" }}>
                            <div className="col-span-2 fontpage">
                              <div id="squares">
                                <div id="square1"></div>
                              </div>
                              Pulmonary Edema/CHF
                            </div>
                            <div className="col-span-3 fontpage">
                              <div id="squares">
                                <div id="square1"></div>
                              </div>
                              Cardiac Arrest
                            </div>
                          </div>
                          <div className="grid grid-cols-5" >
                            <div className="col-span-3 fontpage">
                              4.CNS :
                            </div>
                            <div className="col-span-1 fontpage">
                              <div id="squares">
                                <div id="square1"></div>
                              </div>
                              No
                            </div>
                            <div className="col-span-1 fontpage" style={{ marginLeft: "-16px" }}>
                              <div id="squares">
                                <div id="square1"></div>
                              </div>
                              Yes
                            </div>
                          </div>
                          <div className="grid grid-cols-4" style={{ marginLeft: "30px" }}>
                            <div className="col-span-1 fontpage">
                              <div id="squares">
                                <div id="square1"></div>
                              </div>
                              Awareness
                            </div>
                            <div className="col-span-1 fontpage">
                              <div id="squares">
                                <div id="square1"></div>
                              </div>
                              Headache
                            </div>
                            <div className="col-span-2 fontpage" style={{ marginLeft: "30px" }}>
                              <div id="squares">
                                <div id="square1"></div>
                              </div>
                              Drowsy/Anxiety
                            </div>
                          </div>
                          <div className="grid grid-cols-4" style={{ marginLeft: "30px" }}>
                            <div className="col-span-1 fontpage">
                              <div id="squares">
                                <div id="square1"></div>
                              </div>
                              Convulsion
                            </div>
                            <div className="col-span-3 fontpage">
                              <div id="squares">
                                <div id="square1"></div>
                              </div>
                              Peripheral Nerve Injury from positoning ........................
                            </div>


                          </div>
                          <div className="grid grid-cols-5" >
                            <div className="col-span-3 fontpage">
                              5.Others :
                            </div>
                            <div className="col-span-1 fontpage">
                              <div id="squares">
                                <div id="square1"></div>
                              </div>
                              No
                            </div>
                            <div className="col-span-1 fontpage" style={{ marginLeft: "-16px" }}>
                              <div id="squares">
                                <div id="square1"></div>
                              </div>
                              Yes
                            </div>
                          </div>
                          <div className="grid grid-cols-4" style={{ marginLeft: "30px" }}>
                            <div className="col-span-2 fontpage">
                              <div id="squares">
                                <div id="square1"></div>
                              </div>
                              Hypothemia [BT&lt;35C]/Shivering
                            </div>
                            <div className="col-span-2 fontpage">
                              <div id="squares">
                                <div id="square1"></div>
                              </div>
                              Hypothemia [BT&gt;38C]/Burn
                            </div>
                          </div>
                          <div className="grid grid-cols-4" style={{ marginLeft: "30px" }}>
                            <div className="col-span-2 fontpage">
                              <div id="squares">
                                <div id="square1"></div>
                              </div>
                              Drugs Intoxicity / Allergic reaction
                            </div>
                            <div className="col-span-2 fontpage">
                              <div id="squares">
                                <div id="square1"></div>
                              </div>
                              Delayed Emergence
                            </div>
                          </div>
                          <div className="grid grid-cols-4" style={{ marginLeft: "30px" }}>
                            <div className="col-span-2 fontpage">
                              <div id="squares">
                                <div id="square1"></div>
                              </div>
                              Muscular discomfort / Back pain
                            </div>
                            <div className="col-span-2 fontpage">
                              <div id="squares">
                                <div id="square1"></div>
                              </div>
                              Dead on table / Death within 48 hours
                            </div>
                          </div>
                          .............................................................................................
                        </div>
                      </div>
                    </div>
                    <div className=" grid grid-cols-11  border border-black    border-t-0  border-r-0 border-b-0 " >
                      <div className=" col-span-5 parafont border border-black  border-r-1 border-l-0 pl-1" style={{ marginTop: "-90px", paddingLeft: "8px" }}>
                        <h3><b>Postoperative Pain controlled by:</b></h3>
                        <div className="fontpage">
                          <div id="squares">
                            <div id="square1"></div>
                          </div>
                          Routine order by surgeon
                        </div>
                        <div className="grid grid-cols-3">
                          <div className="col-span-1 fontpage">
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            Acute Pain Service :
                          </div>
                          <div className="col-span-1 fontpage">
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            Epidural/Spinal Opioids :
                          </div>
                          <div className="col-span-1 fontpage" style={{ marginLeft: "20px" }}>
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            PCA
                          </div>
                        </div>
                        <div className="fontpage">
                          <div id="squares">
                            <div id="square1"></div>
                          </div>
                          Other ..........................................
                        </div>
                        <div className="grid grid-cols-5 ">
                          <div className="col-span-1">
                            <h3><b>Pain score:</b>  </h3>
                          </div>
                          <div className="col-span-4 fontpage">
                            Verbal Numerical Rating Scale [VNRS]
                          </div>
                        </div>
                        <div className="grid grid-cols-4 ">
                          <div className="col-span-2 fontpage">
                            [0=No Pain .............. 10=Worst Pain]
                          </div>
                          <div className="col-span-1 fontpage">
                            Rest ..................
                          </div>
                          <div className="col-span-1 fontpage">
                            Activity ......................
                          </div>
                        </div>
                        <div className="grid grid-cols-5 ">
                          <div className="col-span-2">
                            <h3><b>Sedation Score:</b>  </h3>
                          </div>
                        </div>
                        <div className="grid grid-cols-7">
                          <div className="col-span-4 fontpage">
                            [0=Awake 1=Drowsy 2=Asleep 3=Deep Sleep]
                          </div>
                          <div className="col-span-1 fontpage">
                            ..............................
                          </div>
                        </div>
                        <div className="grid grid-cols-6">
                          <div className="col-span-2 fontpage">
                            Side Effects of Opioids
                          </div>
                          <div className="col-span-1 fontpage">
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            No
                          </div>
                          <div className="col-span-1 fontpage">
                            <div id="squares">
                              <div id="square1"></div>
                            </div>
                            Yes
                          </div>
                          <div className="col-span-2 fontpage">
                            Treatment
                          </div>
                        </div>
                        <div className="fontpage">
                          <div id="squares">
                            <div id="square1"></div>
                          </div>
                          Respiratory Depression ...........................................................
                        </div>
                        <div className="fontpage">
                          <div id="squares">
                            <div id="square1"></div>
                          </div>
                          Nausea/Vomiting ...........................................................
                        </div>
                        <div className="fontpage">
                          <div id="squares">
                            <div id="square1"></div>
                          </div>
                          Pruritus ...........................................................
                        </div>
                        <div className="fontpage">
                          <div id="squares">
                            <div id="square1"></div>
                          </div>
                          Urinary retention ...........................................................
                        </div>
                        <div className="fontpage">
                          Plan for post operative pain if inadequate: ..............................................................................................................
                        </div>
                      </div>
                      <div className=" col-span-6 parafont border border-black  border-t-0 border-l-0" style={{ paddingTop: "10px" }}>
                        <div style={{ paddingLeft: "5px" }}>
                          <b>Impression:</b> ...............................................................
                        </div>
                        <div className="fontpage  border border-black border-t-0 border-l-0 border-r-0 " style={{ paddingLeft: "5px" }}>
                          Anesthetic Plan: ...............................................................
                          ............................................................... ............................................................... ...............................................................
                        </div>
                      </div>
                      <div className=" col-span-5 parafont" style={{ marginTop: "20px", paddingLeft: "5px" }}>

                      </div>
                      <div className=" col-span-6 parafont" style={{ paddingTop: "10px", marginTop: "-279px" }}>

                        <div className="fontpage  border border-black border-t-0 border-l-0 border-r-0 " style={{ marginTop: "20px", paddingLeft: "5px" }}>
                          Progress note: ...............................................................
                          ............................................................... ............................................................... ...............................................................
                        </div>
                      </div>
                      <div className=" col-span-5 parafont" >

                      </div>
                      <div className=" col-span-6 parafont " style={{ paddingTop: "10px", marginTop: "-220px" }}>

                        <div className="fontpage  border border-black border-t-0 border-l-0 border-r-0 " style={{ marginTop: "20px", paddingLeft: "5px" }}>
                          Progress note: ...............................................................
                          ............................................................... ............................................................... ...............................................................
                        </div>
                      </div>
                      <div className=" col-span-5 parafont pl-1" >

                      </div>
                      <div className=" col-span-6 parafont " style={{ paddingTop: "10px", marginTop: "-160px" }}>

                        <div className="fontpage" style={{ marginTop: "20px", paddingLeft: "5px" }}>
                          Patient Comment: ...............................................................
                          ............................................................... ............................................................... ...............................................................
                        </div>
                        <div className="grid grid-cols-4 fontpage" style={{ marginTop: "20px", paddingLeft: "5px" }}>
                          <div className="col-span-3">Anesthesiologist Signature.................................................................................</div>
                          <div className="col-span-1">MD/Date.............................</div>
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className=" grid grid-cols-3 gap-3 my-1" style={{ marginTop: "18px" }} >
                    <div className=" col-span-1 " style={{ fontSize: "18px" }}>
                      <p className="">EMR:AOP53 </p>
                    </div>
                    <div className=" col-span-1 " style={{ fontSize: "18px", textAlign: "center" }}>

                      Page 2 of 2
                    </div>
                    <div className=" col-span-1 " style={{ fontSize: "18px", textAlign: "right" }}>
                      <p className="">FAOP 00053Rev06</p>
                    </div>
                  </div>
                </header>
              </tbody>
            </page>
          </div>
        </div>
      )}
    </>
  );
}

export default Report;