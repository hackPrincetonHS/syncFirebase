/* eslint-disable require-jsdoc */
// imports
import {google} from "googleapis";
const sheet = google.sheets("v4");
import * as dotenv from "dotenv";

// config and auth
dotenv.config({path: "./.env"});

const jwtClient = new google.auth.JWT({
  email: process.env.CLIENT_EMAIL,
  key: process.env.PRIVATE_KEY,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});
const jwtAuthPromise = jwtClient.authorize();

// export bids
export async function exportData(
    firstName: string,
) {
  console.info(`Exporting user ${firstName}`);
  const finalData: Array<Array<string>> = [];

  await jwtAuthPromise;
  await sheet.spreadsheets.values.append({
    auth: jwtClient,
    spreadsheetId: process.env.SHEETS_ID,
    // eslint-disable-next-line quotes
    range: `Sheet1!A1:E1`,
    valueInputOption: "RAW",
    requestBody: {values: finalData, majorDimension: "ROWS"},
  }, {});
}
