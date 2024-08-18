import { db } from "@/firebase";
import {
  addDoc,
  collection as coll,
  doc,
  getDoc,
  getDocs,
  query,
} from "firebase/firestore";

export const readAll = async (collection, options) => {
  const data = [];

  const snapshot = await getDocs(query(coll(db, collection), ...options));
  snapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });

  return data;
};

export const readById = async (collection, id) => {
  const snapshot = await getDoc(doc(db, collection, id));
  if (!snapshot.exists()) {
    return Promise.reject({ statusCode: 404 });
  }

  return { ...snapshot.data(), id: snapshot.id };
};

export const readBy = async (collection, options) => {
  const snapshot = await getDocs(query(coll(db, collection), ...options));
  if (snapshot.empty) {
    return Promise.reject({ statusCode: 404 });
  }

  const doc = snapshot.docs[0];
  return { id: doc.id, ...doc.data() };
};

export const existsBy = async (collection, options) => {
  const snapshot = await getDocs(query(coll(db, collection), ...options));

  return !snapshot.empty;
};

export const createOne = async (collection, request) => {
  const doc = await addDoc(coll(db, collection), request);

  return await readById(collection, doc.id);
};
