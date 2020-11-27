import * as admin from 'firebase-admin';

const serviceAccount = {
  "type": process.env.FIRESTORE_TYPE,
  "project_id": process.env.FIRESTORE_PROJECT_ID,
  "private_key_id": process.env.FIRESTORE_PRIVATE_KEY_ID,
  "private_key": process.env.FIRESTORE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  "client_email": process.env.FIRESTORE_CLIENT_EMAIL,
  "client_id": process.env.FIRESTORE_CLIENT_ID,
  "auth_uri": process.env.FIRESTORE_AUTH_URL,
  "token_uri": process.env.FIRESTORE_TOKEN_URL,
  "auth_provider_x509_cert_url":
    process.env.FIRESTORE_AUTH_PROVIDER_X509_CERT_URL,
  "client_x509_cert_url": process.env.FIRESTORE_CLIENT_X509_CERT_URL,
};


const jsonStr = JSON.stringify(serviceAccount)
const json = JSON.parse(jsonStr)




admin.apps.length === 0 ? admin.initializeApp({ credential: admin.credential.cert(json), databaseURL: `${process.env.DATABASE_URL}`}): null

const database = admin.firestore();
export default database;