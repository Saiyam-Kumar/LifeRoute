import {
  useEffect,
  useState
} from "react";

import {
  doc,
  onSnapshot
} from "firebase/firestore";

import {
  onAuthStateChanged
} from "firebase/auth";

import {
  auth,
  db
} from "../firebase";


const useLivePatientState = () => {

  const [
    emergencyState,
    setEmergencyState
  ] = useState(null);

  const [
    loading,
    setLoading
  ] = useState(true);

  const [
    error,
    setError
  ] = useState(null);


  useEffect(() => {

    let unsubscribeAuth = null;
    let unsubscribeFirestore = null;


    unsubscribeAuth =
      onAuthStateChanged(
        auth,
        (user) => {

          // ----------------------------------------
          // No authenticated patient
          // ----------------------------------------

          if (!user) {

            setEmergencyState(null);
            setLoading(false);

            if (unsubscribeFirestore) {
              unsubscribeFirestore();
              unsubscribeFirestore = null;
            }

            return;
          }


          // ----------------------------------------
          // Listen to this patient's document
          // ----------------------------------------

          const patientRef = doc(
            db,
            "patients",
            user.uid
          );


          unsubscribeFirestore =
            onSnapshot(
              patientRef,

              (snapshot) => {

                if (!snapshot.exists()) {

                  setEmergencyState(null);
                  setLoading(false);

                  return;
                }


                const data =
                  snapshot.data();


                setEmergencyState(
                  data.emergency_state || null
                );

                setError(null);
                setLoading(false);
              },


              (snapshotError) => {

                console.error(
                  "Live patient state error:",
                  snapshotError
                );

                setError(
                  "Unable to load live emergency status."
                );

                setLoading(false);
              }
            );
        }
      );


    return () => {

      if (unsubscribeAuth) {
        unsubscribeAuth();
      }

      if (unsubscribeFirestore) {
        unsubscribeFirestore();
      }

    };

  }, []);


  return {
    emergencyState,
    loading,
    error,
  };
};


export default useLivePatientState;