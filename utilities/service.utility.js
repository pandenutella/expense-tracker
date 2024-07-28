import { db } from "@/firebase";
import { collection as coll, getDocs, query } from "firebase/firestore";

export const readAll = async (collection, options) => {
  const data = [];

  const snapshot = await getDocs(query(coll(db, collection), ...options));
  snapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });

  return data;
};
