import IFirebaseAuth from './IFirebaseAuth';

export default class FirebaseAuth implements IFirebaseAuth {
    private endpoint: string;
    public constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    public signUp(email: string, password: string): Promise<Response> {
        console.log('signup', this.endpoint);
        return fetch(this.endpoint + 'signUp', {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
    }
}
