export default interface IFirebaseUser {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: number;
    localId: string;
}
