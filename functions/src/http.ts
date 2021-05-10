import * as functions from 'firebase-functions';
// import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';

// admin.initializeApp();

export const basicHTTP = functions.https.onRequest((request, response) => {
    functions.logger.info('basicHTTP', { structuredData: true });
    const name = request.query.name;
    response.send('Hello ' + name);
});

const app = express();
app.use(cors({ origin: true }));

app.get('/cat', (request, response) => {
    response.send('CAT');
});

app.get('/dog', (request, response) => {
    response.send('DOG');
});

app.get('/createUser', (request, response) => {
    const name = request.query.name;
    response.setHeader('Content-Type', 'application/json')
    response.send('{"name":"' + name + '"}').status(200);
});

export const api = functions.https.onRequest(app);
