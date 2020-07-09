/**
 * set firebase admin db and auth
 * don't forget to set env var when on production stage or auth related actions:
 * $env:GOOGLE_APPLICATION_CREDENTIALS="D:\documents\javascript\code testing\my projects\mitranetra-cloud-functions-clean\functions\mitranetra-1234-firebase-adminsdk-izyqz-dc403073b1.json"
 */
const admin = require('firebase-admin');
const firebase = require('../firebaseConfig');

// init firebase admin using server credentioal file
const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://mitranetra-1234.firebaseio.com',
});

// init firebase using cloud functions config
// const firebaseAdmin = admin.initializeApp(functions.config().firebase);

// init db
const db = firebaseAdmin.firestore();

// init auth
const auth = firebaseAdmin.auth();

/**
 * start manageDb
 */

// functions
const addUserReqList = async (uid, bookId) => {
  await db
    .collection('users')
    .doc(uid)
    .update({
      // push new bookId to requestList array
      requestList: admin.firestore.FieldValue.arrayUnion(bookId),
    });
};

const removeUserReqList = async (uid, bookId) => {
  await db
    .collection('users')
    .doc(uid)
    .update({
      requestList: admin.firestore.FieldValue.arrayRemove(bookId),
    });
};

const manageDb = {
  //show all requests
  showAll: function () {
    return new Promise((resolve, reject) => {
      db.collection('buku')
        .orderBy('voteSum', 'desc')
        .onSnapshot(
          (querySnapshot) => {
            let allData = [];
            querySnapshot.forEach((doc) => {
              allData.push(doc.data());
            });
            resolve(allData);
          },
          (err) => reject(err)
        );
    });
  },

  // add request
  addReq: async (req, res, next) => {
    try {
      // nanti gabungin 2 db ini menjadi 1 transaction
      const bookRef = await db
        .collection('buku')
        .doc(req.body.book.id)
        .set(req.body.book);

      addUserReqList(req.body.uid, req.body.book.id);
      res.locals.addBookStatus = `book added: ${req.body.book.id}`;
      return next();
    } catch (err) {
      res.locals.addBookStatus = new Error(`Adding request Failed: ${err}`);
    }
    /* finally {
      next();
    } */
  },

  // add vote
  addVote: async (req, res) => {
    try {
      await db
        .collection('buku')
        .doc(req.body.book.id)
        .update({
          voteSum: admin.firestore.FieldValue.increment(1),
        });
      addUserReqList(req.body.uid, req.body.book.id);
      res.status(200).json('success');
    } catch (err) {
      console.log(err);
      res.status(400).json('failed');
    }
  },

  // remove vote
  removeVote: async (req, res) => {
    try {
      await db
        .collection('buku')
        .doc(req.body.book.id)
        .update({
          voteSum: admin.firestore.FieldValue.increment(-1),
        });

      // delete entry if voteSum < 1
      await db
        .collection('buku')
        .doc(req.body.book.id)
        .get()
        .then((doc) => {
          const voteSum = doc.data().voteSum;
          if (voteSum < 1) {
            db.collection('buku').doc(req.body.book.id).delete();
          }
          return console.log('entry deleted:', req.body.book.id);
        });
      removeUserReqList(req.body.uid, req.body.book.id);
      res.status(200).json('success');
    } catch (err) {
      console.log(err);
      res.status(400).json('failed');
    }
  },

  // remove entry
  removeEntry: async (req, res) => {
    try {
      console.log('deleting entry');
      console.log(req.body.book.id);
      await db.collection('buku').doc(req.body.book.id).delete();
      res.status(200).json('success');
    } catch (err) {
      console.log(err);
      res.status(400).json('failed');
    }
  },
};

/**
 * end manageDb
 */

/**
 * start manageUser
 */

const manageUser = {
  register: async (req, res, next) => {
    const { email, password } = req.body;
    let uid = '';
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          firebase.auth().onAuthStateChanged((user) => {
            uid = user.uid;
            user.sendEmailVerification();
          });
          return console.log('email verification sent');
        });

      // add users document
      const usersRef = db.collection('users');
      usersRef.doc(uid).set({
        email,
        requestList: [],
      });
      console.log('user data added');
      res.locals.regStatus = { status: 'success', uid };
      return next();
    } catch (err) {
      console.log(err);
      res.locals.regStatus = { status: 'failed', err };
    }
    /* finally {
      next();
    } */
  },
  // assign user as admin
  assignUserAsAdmin: (adminAuth, uid) => {
    admin.auth().setCustomUserClaims(uid, { admin: true });
  },

  // show all users
  showUsers: (nextPageToken) => {
    // List batch of users, 1000 at a time.
    auth
      .listUsers(1000, nextPageToken)
      .then((listUsersResult) => {
        listUsersResult.users.forEach((userRecord) => {
          console.log('user', userRecord.toJSON());
        });
        if (listUsersResult.pageToken) {
          // List next batch of users.
          showUsers(listUsersResult.pageToken);
        }
        return console.log('showing batch of users');
      })
      .catch((error) => {
        console.log('Error listing users:', error);
      });
  },
};

/**
 * end manageUser
 */

exports.manageDb = manageDb;
exports.manageUser = manageUser;
