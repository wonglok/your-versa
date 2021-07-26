import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

export const FireCache = new Map();
function setupOnce() {
  if (!FireCache.has("app")) {
    FireCache.set("app", firebase.initializeApp(firebaseConfig));
  }

  if (!FireCache.has("database")) {
    FireCache.set("database", firebase.database());
  }

  if (!FireCache.has("setup-listen-login")) {
    FireCache.set("setup-listen-login", true);
    FireCache.get("app")
      .auth()
      .onAuthStateChanged((user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          FireCache.set("user", user);
          // ...
        } else {
          // User is signed out
          // ...
          FireCache.delete("user");
        }
      });
  }
  if (!FireCache.has("setup-do-login")) {
    FireCache.set("setup-do-login", true);

    // FireCache.get("app")
    //   .auth()
    //   .signInAnonymously()
    //   .then((singin) => {
    //     // Signed in..
    //     FireCache.set("user", singin.user);
    //   })
    //   .catch((error) => {
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     // ...
    //     console.log(errorCode, errorMessage);

    //     return Promise.reject(new Error(errorMessage));
    //   });
  }

  return FireCache.get("app");
}

export function getFire() {
  setupOnce();
  return firebase;
}

export const loginGuest = async () => {
  setupOnce();
  return firebase.auth().signInAnonymously();
};

export const loginGoogle = () => {
  setupOnce();
  var provider = new firebase.auth.GoogleAuthProvider();

  return firebase.auth().signInWithPopup(provider);
};

//

export const onReady = () => {
  setupOnce();
  return new Promise((resolve) => {
    let tt = setInterval(() => {
      if (FireCache.has("user")) {
        clearInterval(tt);
        resolve({
          firebase,
          user: FireCache.get("user"),
          fire: FireCache.get("app"),
          db: FireCache.get("database"),
          logout: () => {
            return FireCache.get("app").auth().signOut();
          },
        });
      }
    });
  });
};
