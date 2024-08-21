/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
import * as users from "./users";
import * as transactions from "./transactions";
import * as notifications from "./notifications";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

module.exports = {
    users,
    transactions,
    notifications
};
