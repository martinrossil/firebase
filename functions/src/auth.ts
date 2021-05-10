import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Storage } from '@google-cloud/storage';
// import * as fs from 'fs-extra';
import { tmpdir } from 'os';
import { join, dirname } from 'path';
// import * as sharp from 'sharp';

admin.initializeApp();

const db = admin.firestore();
const gcs = new Storage();

export const createUserRecord = functions.auth
    .user()
    .onCreate((user, context) => {
    const userRef = db.doc('users/' + user.uid);
    functions.logger.info('createUserRecord', context);
    return userRef.set({
        name: user.displayName,
        createdAt: 'test', // context.timestamp,
        nickname: 'bubba'
    })
});

export const resizeAvatar = functions.storage
    .object()
    .onFinalize(async object => {
        if (!object.name) {
            return false;
        }
        const bucket = gcs.bucket(object.bucket);
        // const filePath = object.name;
        const fileName = object.name.split('/').pop();
        functions.logger.info('resizeAvatar', fileName);

        const tmpFilePath = join(tmpdir(), object.name);
        const avatarFileName = 'avatar_' + fileName;
        const tmpAvatarPath = join(tmpdir(), avatarFileName);

        if (object.name.includes('avatar_')) {
            return false;
        }

        await bucket.file(object.name).download({ destination: tmpFilePath })

        // await sharp(tmpFilePath).resize(100, 100).toFile(tmpAvatarPath);

        return bucket.upload(tmpAvatarPath, { destination: join(dirname(object.name), avatarFileName) });
    });
