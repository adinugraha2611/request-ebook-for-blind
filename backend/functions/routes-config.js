const controller = require('./controllers/data-and-user-controller');
const manageDb = controller.manageDb;
const manageUser = controller.manageUser;

module.exports = (app) => {
  app.get('/api/requests', (req, res) => {
    manageDb
      .showAll()
      .then((allData) => {
        res.json(allData);
        return allData;
      })
      .catch((err) => console.log(err));
  });

  app.post('/api/add', manageDb.addReq, (req, res) => {
    res.json(res.locals.addBookStatus);
  });

  // add vote
  app.post('/api/add-vote', manageDb.addVote);
  // remove vote
  app.post('/api/remove-vote', manageDb.removeVote);
  // remove book entry
  app.post('/api/remove-entry', manageDb.removeEntry);

  // user account stuff
  // register
  app.post('/api/users', manageUser.register, (req, res) => {
    res.json(res.locals.regStatus);
  });

  // get all users
  app.get('/api/get-users', manageUser.getAllUsers);
};
