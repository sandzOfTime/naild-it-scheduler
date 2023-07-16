import { Auth } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { db } from "../App";

const useCurrentUser = (auth: Auth) => {
  const [user] = useAuthState(auth);
  const [currentUser, setCurrentUser] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, "users"),
        where("user_id", "==", user?.uid)
      );
      getDocs(q).then((snapshot) => {
        setCurrentUser(snapshot?.docs[0]?.data());
        setLoading(false);
      });
    }
  }, [user, loading]);

  return [currentUser, loading];
};

export default useCurrentUser;
