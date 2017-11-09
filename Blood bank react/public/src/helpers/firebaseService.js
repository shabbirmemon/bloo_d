import * as firebase from 'firebase';

  var config = {
    apiKey: "AIzaSyBvgguuKqvnaxTE3nit09YqjpBzjgC206o",
    authDomain: "blood-bank-19a3c.firebaseapp.com",
    databaseURL: "https://blood-bank-19a3c.firebaseio.com",
    projectId: "blood-bank-19a3c",
    storageBucket: "blood-bank-19a3c.appspot.com",
    messagingSenderId: "386326493551"
  };
  firebase.initializeApp(config);

export class FirebaseService {

    static firebaseTimeStamp = firebase.database['ServerValue'].TIMESTAMP;
    static ref = firebase.database().ref();
    static storage = firebase.storage().ref();
    static auth = firebase.auth();


    static saveMultipath(multipath) {
        return this.ref.update(multipath);
    } 

    static customAuth(user) {
        return this.auth.createUserWithEmailAndPassword(user.email, user.pass);
    } 

    static customLogin(user) {
        return this.auth.signInWithEmailAndPassword(user.email, user.pass);
    } //loginUser

    static addNewUser(user) {
        return this.ref.child(user).set();
    } //AuthNewUser

    static getPushRef(path) {
        return this.ref.child(path).push();
    }
    // static uploadImageOnStorageBlob(path, blob) {
    //     return new Promise(res => {
    //         this.storage.child(path).put(blob).then((snapshot) => {
    //             console.log('Uploaded a blob or file!');
    //             // The promise will resolve with a Download URL provided by Firebase Storage
    //             res(snapshot.downloadURL);
    //         })
    //     });
    // }

}