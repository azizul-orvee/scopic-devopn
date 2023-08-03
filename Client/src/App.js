import React from "react";
import "./App.css";
import { Amplify } from "aws-amplify";
import { awsExports } from "./aws-exports";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import Home from "./pages/Home";

Amplify.configure({
  Auth: {
    region: awsExports.REGION,
    userPoolId: awsExports.USER_POOL_ID,
    userPoolWebClientId: awsExports.USER_POOL_APP_CLIENT_ID,
  },
});

function App() {

  return (
    <Authenticator
      initialState="signIn"
      components={{
        SignUp: {
          FormFields() {
            return (
              <>
                <Authenticator.SignUp.FormFields />
                <div>
                  <label>Email</label>
                </div>
                <input
                  type="text"
                  name="email"
                  placeholder="Please enter a valid email"
                />
              </>
            );
          },
        },
      }}
    >
      {({ signOut, user }) => (
        <div>
          {/* <h4>Your JWT token:</h4>
          {jwtToken} */}
          <div className="container">
            Welcome <b>{user.username}</b>
            <br />
            <button onClick={signOut}>Sign out</button>
            <br />
            Scopic Software Test task
            <Home />
          </div>
        </div>
      )}
    </Authenticator>
  );
}

export default App;
