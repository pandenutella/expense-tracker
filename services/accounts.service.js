import { auth } from "@/firebase";
import { createOne, existsBy, readAll } from "@/utilities/service.utility";
import { orderBy, where } from "firebase/firestore";

const COLLECTION = "accounts";

export const findAllAccounts = async () => {
  return await readAll(COLLECTION, [
    where("userUuid", "==", auth.currentUser.uid),
    orderBy("label"),
  ]);
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

  return await createOne(COLLECTION, {
    ...account,
    userUuid: auth.currentUser.uid,
  });
};
