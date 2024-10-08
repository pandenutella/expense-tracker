import { auth, db } from "@/firebase";
import {
  addDoc,
  collection as coll,
  doc,
  getDoc,
  getDocs,
  query,
  Timestamp,
} from "firebase/firestore";

export const createRef = (collection) => doc(coll(db, collection));

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

export const readDocBy = async (collection, options) => {
  const snapshot = await getDocs(query(coll(db, collection), ...options));
  if (snapshot.empty) {
    return Promise.reject({ statusCode: 404 });
  }

  const doc = snapshot.docs[0];
  const record = { id: doc.id, ...doc.data() };

  return { doc, ref: doc.ref, record };
};

export const readBy = async (collection, options) => {
  const { record } = await readDocBy(collection, options);

  return record;
};

export const existsBy = async (collection, options) => {
  const snapshot = await getDocs(query(coll(db, collection), ...options));

  return !snapshot.empty;
};

export const createOne = async (collection, request) => {
  const doc = await addDoc(coll(db, collection), request);

  return await readById(collection, doc.id);
};

export const getAuditFields = (timestamp) => {
  const nullCheckedTimestamp = timestamp ?? Timestamp.now();

  return {
    userUuid: auth.currentUser.uid,
    createdAt: nullCheckedTimestamp,
    updatedAt: nullCheckedTimestamp,
  };
};
