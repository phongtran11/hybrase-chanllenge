import { NextResponse, type NextRequest } from "next/server";
import { google } from "googleapis";
import { EFormType } from "@app/enums";
import { mailService } from "@app/services/node-mailer";

type TBaseForm = {
  email: string;
  name: string;
};

type TBasicForm = TBaseForm & {
  type: EFormType.BASIC;
};

type TStandardForm = TBaseForm & {
  type: EFormType.STANDARD;
  phoneNumber: number;
};

type TPremiumForm = TBaseForm & {
  type: EFormType.PREMIUM;
  phoneNumber: number;
  company: string;
};

export type TRequestBody = TBasicForm | TStandardForm | TPremiumForm;

// This is the route that the form submits to.
export async function POST(request: NextRequest) {
  const requestBody: TRequestBody = JSON.parse(await request.json());

  let sheetValues: any[][] = [];

  switch (requestBody.type) {
    case EFormType.BASIC:
      sheetValues = [[requestBody.name, requestBody.email]];
      break;

    case EFormType.STANDARD:
      sheetValues = [
        [requestBody.name, requestBody.email, requestBody.phoneNumber],
      ];
      break;

    case EFormType.PREMIUM:
      sheetValues = [
        [
          requestBody.name,
          requestBody.email,
          requestBody.phoneNumber,
          requestBody.company,
        ],
      ];
      break;

    default:
      sheetValues = [[]];
  }

  // init google auth client
  const auth = new google.auth.GoogleAuth({
    keyFile: process.env.KEY_FILE_GOOGLE_AUTH,
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // Create the Google Sheets API client
  const sheets = google.sheets({
    version: "v4",
    auth,
  });

  const spreadsheetId = process.env.SPREAD_SHEET_ID;

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId, // ID of the spreadsheet
      range: requestBody.type, //sheet name
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: sheetValues,
      },
    });

    // send email to marketing department
    mailService.sendMail(requestBody);

    return NextResponse.json("Success", {
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Error", {
      status: 500,
    });
  }
}
