import React, { FC } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

//Routes
import Layout from "./pages/Layout";
import Services from "./pages/Services";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import SignUpVerification from "./pages/SignUpVerification";
import AuthAction from "./components/AuthAction";
import BookAppointment from "./pages/BookAppointment";
import AppointmentFinal from "./pages/AppointmentFinal";
import RequireAuth from "./components/RequireAuth";
import Account from "./pages/Account";

//Firebase
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

export const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseApp);

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Services />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="services" element={<Services />} />
        <Route path="sign-up-verify" element={<SignUpVerification />} />
        <Route path="auth/action" element={<AuthAction />} />
        <Route
          path="services/book/:serviceId"
          element={
            <RequireAuth>
              <BookAppointment />
            </RequireAuth>
          }
        />
        <Route path="appointment-confirmed" element={<AppointmentFinal />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
        <Route path="my-account" element={<Account />} />
      </Route>
    </Routes>
  );
};

export default App;
