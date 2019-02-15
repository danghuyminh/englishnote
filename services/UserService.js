import {Sqlite} from "./DbService";

export const UserService = {
    getAllUsers,
    updateUserInfo,
};

async function updateUserInfo() {
    let user = auth.currentUser;

    firestore.collection("users").doc(user.uid).set({
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL
    })
    .then(function() {
        return true;
    })
    .catch(function(error) {
        console.error("Error writing user document: ", error);
        throw error;
    });
}

async function getAllUsers() {
    // Create a reference to the users collection
    const usersRef = firestore.collection("users");

    // Create a query against the collection.
    const querySnapshot = await usersRef.get();
    let users = [];
    if (!querySnapshot.size) {
        return users;
    }
    querySnapshot.forEach(function(doc) {
        users.push({id: doc.id, ...doc.data()})
    });
    return users;
}