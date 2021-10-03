/* eslint-disable require-jsdoc */
import {google} from "googleapis";
const sheets = google.sheets("v4");

// eslint-disable-next-line @typescript-eslint/no-var-requires
const serviceAccount = require("../service_account.json");

const jwtClient = new google.auth.JWT({
  email: serviceAccount.client_email,
  key: serviceAccount.private_key,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const jwtAuthPromise = jwtClient.authorize();

export async function exportUsers(
    date: string,
    fullName: string,
    isFullyLoggedIn: boolean,
    shirtSize: string,
    school: string,
    specialAccomadations: string,
    phone: string,
    graduationYear: string,
    latino: boolean,
    ethnicity: string,
    gender: string,
    studyLevel: string
) {
  const finalData: Array<Array<string>> = [];
  const singleUser: Array<any> = [
    date,
    fullName,
    isFullyLoggedIn,
    shirtSize,
    school,
    specialAccomadations,
    phone,
    graduationYear,
    latino,
    ethnicity,
    gender,
    studyLevel,
  ];
  finalData.push(singleUser);

  await jwtAuthPromise;
  await sheets.spreadsheets.values.append({
    auth: jwtClient,
    spreadsheetId: "12Du6pww7wz6NHZQATMJqGrU7pViuPooNhUqtZYXGdpk",
    // eslint-disable-next-line quotes
    range: `Sheet1!A1:Z1`,
    valueInputOption: "RAW",
    requestBody: {values: finalData, majorDimension: "ROWS"},
  }, {});
}
