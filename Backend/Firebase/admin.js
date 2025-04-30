const admin = require('firebase-admin');
const path = require('path');

// Load the service account key JSON file
const serviceAccount = require(path.resolve(__dirname, './serviceAccountKey.json'));

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "gen-scheduler.firebasestorage.appspot.com", // corrected
    databaseURL: "https://gen-scheduler-default-rtdb.firebaseio.com"
  });
}

// Export Firestore, Storage, and Auth
const db = admin.firestore(); // ✅ Correct name
const bucket = admin.storage().bucket();
const auth = admin.auth();

module.exports = {
  admin,
  db,
  bucket,
  auth
};
