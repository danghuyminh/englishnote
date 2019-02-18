import {Sqlite} from "./DbService";

export const UserService = {
    getAllUsers,
    updateUserInfo,
    getRemoteNotes
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

async function getRemoteNotes(uid, nextQuery) {
    if (!nextQuery) {
        nextQuery = firestore.collection("notes")
            .where("user_id", "==", uid)
            .orderBy("id", "desc")
            .limit(10);
    }

    const querySnapShot = await nextQuery.get();

    let notes = [];
    if (!querySnapShot.size) {
        return {notes, next: undefined};
    }

    querySnapShot.forEach(function(doc) {
        notes.push({id: doc.id, ...doc.data()})
    });

    if (querySnapShot.size && querySnapShot.size < 10) {
        return {notes, next: undefined};
    }

    // Get the last visible document
    let lastVisible = querySnapShot.docs[querySnapShot.docs.length-1];

    let next = firestore.collection("notes")
        .where("user_id", "==", uid)
        .orderBy("id", "desc")
        .startAfter(lastVisible)
        .limit(10);

    return {notes, next}
}