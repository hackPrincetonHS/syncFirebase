import * as functions from "firebase-functions";
import {exportUsers} from "./exportUsers";

const region = "us-central1";

exports.exportOrderData = functions
    .region(region)
    .firestore
    .document("users/{id}")
    .onCreate(
        async (snapshot, _) => {
          const docData = snapshot.data();

          const date = docData.dateCreated.toDate().toLocaleString("en-US", {
            datestyle: "long",
            timestyle: "long",
          });
          const fullName = docData.fullName;
          const isFullyLoggedIn = docData.isFullyLoggedIn;
          const shirtSize = docData.shirtSize;
          const school = docData.school;
          const specialAccomadations = docData.specialAccomadations;
          const phone = docData.phone;
          const graduationYear = docData.graduationYear;
          const latino = docData.latino;
          const ethnicity = docData.ethnicity;
          const gender = docData.gender;

          // let githubLink = "";
          // if(docData.githubLink) githubLink = docData.githubLink;

          const studyLevel = docData.studyLevel;

          await exportUsers(
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
          );
        });
