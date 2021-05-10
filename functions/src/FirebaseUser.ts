import IFirebaseUser from './IFirebaseUser';

export default class FirebaseUser implements IFirebaseUser {
    public idToken: string;
    public email: string;
    public refreshToken: string;
    public expiresIn: number;
    public localId: string;
    public constructor(idToken: string, email: string, refreshToken: string, expiresIn: number, localId: string) {
        this.idToken = idToken;
        this.email = email;
        this.refreshToken = refreshToken;
        this.expiresIn = expiresIn;
        this.localId = localId;
    }
}
