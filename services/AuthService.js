export const AuthService = {
    authorizeWithGoogle,
    loginWithGoogle,
};

async function loginWithGoogle() {
    const result = await authorizeWithGoogle();
    if (result['error']) {
       throw result['message'];
    } else {
        return googleAuthenticate(result.idToken, result.accessToken);
    }
}

const authorizeWithGoogle = async () => {
    try {
        const result = await Expo.Google.logInAsync({
            androidClientId: "81512437678-egb3j88rtp27c85eboc0vdcpa23a44rn.apps.googleusercontent.com",
            scopes: ['profile', 'email'],
        });
        if (result.type === 'success') {
            return {error: false, ...result };
        } else {
            return {error: true, message: 'Authorization cancelled'};
        }
    } catch (error) {
        return {error: true, message: error.message};
    }
};

const googleAuthenticate = (idToken, accessToken) => {
    const credential = fire.auth.GoogleAuthProvider.credential(idToken, accessToken);
    return auth.setPersistence(fire.auth.Auth.Persistence.LOCAL)
        .then(function() {
            // Existing and future Auth states are now persisted in the current
            // session only. Closing the window would clear any existing state even
            // if a user forgets to sign out.
            // ...
            // New sign-in will be persisted with session persistence.
            console.log('persistent')
            return auth.signInAndRetrieveDataWithCredential(credential);
        });
};