// firebaseInit.ts
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp({
    credential: admin.credential.cert("src/files/infinity-quiz-d08fc-firebase-adminsdk-5kj9n-46f9fa9d31.json"),
    // storageBucket: BUCKET_NAME,
});

const firestore = admin.firestore();
const storage = admin.storage();

export {admin, firestore, storage, functions};
