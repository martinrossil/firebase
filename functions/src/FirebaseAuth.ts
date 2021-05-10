import IFirebaseAuth from './IFirebaseAuth';
import axios, { AxiosResponse } from 'axios';

export default class FirebaseAuth implements IFirebaseAuth {
    private apiKey: string;
    private static END_POINT = 'https://identitytoolkit.googleapis.com/v1/accounts:';
    public constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    public signUp(email:string, password: string): Promise<AxiosResponse<any>> {
        console.log('signUp(' + email + ', ' + password);
        return axios.post(FirebaseAuth.END_POINT + 'signUp?key=' + this.apiKey, {
            email,
            password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        /* return fetch(FirebaseAuth.END_POINT + 'signUp?key=' + this.apiKey, {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        }); */
    }
}
