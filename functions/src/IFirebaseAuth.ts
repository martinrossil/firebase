export default interface IFirebaseAuth {
    signUp(email: string, password: string): Promise<Response>;
}
