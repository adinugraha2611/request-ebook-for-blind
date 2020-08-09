import React from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import { ManageUsers } from './ManageUsers';
import { ManageBooks } from './ManageBooks';

export const AdminTools = () => {
  return (
    <div>
      <h2>Admin Tools</h2>
      <nav className="nav-admin-tools">
        <ul>
          <li>
            <Link to="/admin-tools/users">Users</Link>
          </li>
          <li>
            <Link to="/admin-tools/books">Books</Link>
          </li>
        </ul>
      </nav>

      {/* AdminTools routes */}
      <Switch>
        <Route path="/admin-tools/users">
          <ManageUsers />
        </Route>
        <Route path="/admin-tools/books">
          <ManageBooks />
        </Route>

        {/* automatically go to users management page */}
        <Redirect exact from="/admin-tools" to="/admin-tools/users" />
      </Switch>
    </div>
  );
};
