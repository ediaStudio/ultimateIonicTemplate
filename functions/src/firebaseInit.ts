// firebaseInit.ts
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp({
    // TODO replace by your own service account file
    credential: admin.credential.cert("src/files/my-first-demo-a7635-firebase-adminsdk-77epm-a65583f68a.json"),
    // storageBucket: BUCKET_NAME,
});

const firestore = admin.firestore();
const storage = admin.storage();

export {admin, firestore, storage, functions};
