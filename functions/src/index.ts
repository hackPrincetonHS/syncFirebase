// imports
import * as functions from "firebase-functions";
import {exportData} from "./exportData";


exports.exportOrderData = functions.region("us-central1").firestore
    .document("users/{id}")
    .onCreate(async (snapshot, _) => {
      const documentData = snapshot.data();
      const firstName = documentData.firstName;

      await exportData(firstName);
    });
