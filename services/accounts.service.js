import { auth, db } from "@/firebase";
import { existsBy, readAll, readById } from "@/utilities/service.utility";
import dayjs from "dayjs";
import {
  collection,
  doc,
  orderBy,
  Timestamp,
  where,
  writeBatch,
} from "firebase/firestore";

const COLLECTION = "accounts";

export const findAllAccounts = async () => {
  return await readAll(COLLECTION, [
    where("userUuid", "==", auth.currentUser.uid),
    orderBy("label"),
  ]);
};

export const findById = async (id) => {
  return await readById(COLLECTION, id);
};

export const createAccount = async (account, startingBalance) => {
  const labelExists = await existsBy(COLLECTION, [
    where("userUuid", "==", auth.currentUser.uid),
    where("label", "==", account.label),
  ]);

  if (labelExists) {
    return Promise.reject({
      statusCode: 422,
      message: `Label "${account.label}" is already used!`,
    });
  }

  const batch = writeBatch(db);

  const accountRef = doc(collection(db, COLLECTION));
  batch.set(accountRef, {
    ...account,
    amount: startingBalance,
    userUuid: auth.currentUser.uid,
  });

  const transactionRef = doc(collection(db, "transactions"));
  batch.set(transactionRef, {
    userUuid: auth.currentUser.uid,
    accountId: accountRef.id,
    categoryId: null,
    amount: startingBalance,
    notes: "Starting balance",
    cleared: true,
    date: Timestamp.fromDate(dayjs().toDate()),
  });

  return await batch.commit().then(() => findById(accountRef.id));
};
