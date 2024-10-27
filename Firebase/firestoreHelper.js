import { collection, addDoc, getDocs } from "firebase/firestore";
import { database } from "./fireBaseSetup";

export async function writeToDB(data, collectionName) {
    try {
      const docRef = await addDoc(collection(database, collectionName), data);
      console.log(docRef);
    } catch (err) {
      console.log(err);
    }
  }


export async function getAllDocuments(collectionName) {
    try {
      const querySnapshot = await getDocs(collection(database, collectionName));
      const data = [];
      if (!querySnapshot.empty) {
        querySnapshot.forEach((docSnapShot) => {
          data.push(docSnapShot.data());
        });
      }
      return data;
    } catch (err) {
      console.log("get all docs", err);
    }
}