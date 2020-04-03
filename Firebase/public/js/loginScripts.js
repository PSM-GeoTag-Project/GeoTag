

function toggleSignIn() {
    if (firebase.auth().currentUser) {
      firebase.auth().signOut();
    } else {
      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
      if (email.length < 4) {
        alert('Please enter an email address.');
        return;
      }
      if (password.length < 4) {
        alert('Please enter a password.');
        return;
      }
      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        document.getElementById('quickstart-sign-in').disabled = false;
      });
    }
    document.getElementById('quickstart-sign-in').disabled = true;
  }

  function handleSignUp() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    if (email.length < 4) {
      alert('Please enter an email address.');
      return;
    }
    if (password.length < 4) {
      alert('Please enter a password.');
      return;
    }
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
  }

  function sendEmailVerification() {
    firebase.auth().currentUser.sendEmailVerification().then(function() {
      alert('Email Verification Sent!');
    });
  }

  function sendPasswordReset() {
    var email = document.getElementById('email').value;
    firebase.auth().sendPasswordResetEmail(email).then(function() {
      alert('Password Reset Email Sent!');
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/invalid-email') {
        alert(errorMessage);
      } else if (errorCode == 'auth/user-not-found') {
        alert(errorMessage);
      }
      console.log(error);
    });
  }

function initApp() {


    const firebaseConfig = {
        apiKey: "AIzaSyBxvBY-hT2DigCnNSY-t4_YQGIG5R4SGfw",
        authDomain: "geotag-8dae5.firebaseapp.com",
        databaseURL: "https://geotag-8dae5.firebaseio.com",
        projectId: "geotag-8dae5",
        storageBucket: "geotag-8dae5.appspot.com",
        messagingSenderId: "649673377801",
        appId: "1:649673377801:web:babf09388cdd79387d10d8",
        measurementId: "G-C8BT8GRT0C"
      };

      console.log(firebase);

   firebase.auth().onAuthStateChanged(function(user) {
      document.getElementById('quickstart-verify-email').disabled = true;
      if (user) {
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        var userNameToDisplay = '';

        if(user.displayName == null)
        {
           userNameToDisplay = email;
        }else {
           userNameToDisplay = user.displayName;
        }

        document.getElementById('quickstart-sign-in-status').textContent = ` ${userNameToDisplay}`;
        document.getElementById('quickstart-sign-in').textContent = 'Sign out';
        // document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
        if (!emailVerified) {
          document.getElementById('quickstart-verify-email').disabled = false;
        }
      } else {
        document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
        document.getElementById('quickstart-sign-in').textContent = 'Sign in';
        // document.getElementById('quickstart-account-details').textContent = 'null';
      }
      document.getElementById('quickstart-sign-in').disabled = false;
    });

    document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
    document.getElementById('quickstart-sign-up').addEventListener('click', handleSignUp, false);
    document.getElementById('quickstart-verify-email').addEventListener('click', sendEmailVerification, false);
    document.getElementById('quickstart-password-reset').addEventListener('click', sendPasswordReset, false);
  }

  window.onload = function() {
    initApp();
  };

document.addEventListener("DOMContentLoaded", event => {
    const app = firebase.app();
});

function googleLogin() {
    if (!firebase.auth().currentUser) {
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        firebase.auth().signInWithPopup(provider).then(function (result) {
            var token = result.credential.accessToken;
            var user = result.user;
            document.getElementById('quickstart-oauthtoken').textContent = token;
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            if (errorCode === 'auth/account-exists-with-different-credential') {
                alert('You have already signed up with a different auth provider for that email.');

            } else {
                console.error(error);
            }
        });
    } else {
        firebase.auth().signOut();
    }
    document.getElementById('quickstart-sign-in').disabled = true;
}

function githubLogin() {
    if (!firebase.auth().currentUser) {
        var provider = new firebase.auth.GithubAuthProvider();
        provider.addScope('repo');
        firebase.auth().signInWithPopup(provider).then(function (result) {
            var token = result.credential.accessToken;
            var user = result.user;
            document.getElementById('quickstart-oauthtoken').textContent = token;
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            if (errorCode === 'auth/account-exists-with-different-credential') {
                alert('You have already signed up with a different auth provider for that email.');
            } else {
                console.error(error);
            }
        });
    } else {
        firebase.auth().signOut();
    }
    document.getElementById('quickstart-sign-in').disabled = true;
}
