// imports
import * as dotenv from "dotenv";
dotenv.config({path: "./.env"});

import functions = require("firebase-functions");
import sheets = require("google-spreadsheet");
import _ = require("lodash");

// consts
const spreadsheetId = process.env.SHEET_ID;
