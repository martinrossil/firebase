import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';
import IFirebaseAuth from './IFirebaseAuth';
import FirebaseAuth from './FirebaseAuth';
// import { UserRecord } from 'firebase-functions/lib/providers/auth';

admin.initializeApp();

const API_KEY = 'AIzaSyBadPY7a0Ec-Fp-56IYpMYauAY9mmNhLlY';
const firebaseAuth: IFirebaseAuth = new FirebaseAuth(API_KEY);
// const auth: admin.auth.Auth = admin.auth();
const app = express();
app.use(cors({ origin: true }));
app.all('/api/*', (request, response) => {
    response.setHeader('Content-Type', 'application/json');
    if (request.path === '/api/signUp') {
        firebaseAuth.signUp(request.body.email, request.body.password)
            .then((result: Response) => {
                response.send(result).status(200);
            }, (rejected: unknown) => {
                response.send(rejected).status(200);
            })
            .catch((error: Error) => {
                response.send({ error: error.name, message: error.message }).status(200);
            });
    } else {
        response.send({ message: 'method ' + request.path + ', does not exist.' }).status(200);
    }
});

/* app.all('/api/*', (request, response) => {
    if (request.path === '/api/createUser') {
        response.setHeader('Content-Type', 'application/json');
        // response.setHeader('Content-Type', 'text/plain');
        // auth.verifyIdToken
        auth.createUser(request.body)
            .then((userRecord: UserRecord) => auth.createCustomToken(userRecord.uid))
            .then(token => {
                response.send({ token }).status(200);
            })
            .catch((error: Error) => {
                response.send(error).status(200);
            });
    } else {
        setHeaders(response);
        response.send(getPath(request)).status(200)
    }
});

function getPath(request: express.Request): unknown {
    return { path: request.path };
}

function setHeaders(response: express.Response): void {
    response.setHeader('Content-Type', 'application/json');
} */

export const api = functions.https.onRequest(app);
