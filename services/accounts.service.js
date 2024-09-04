import { auth, db } from "@/firebase";
import {
  createRef,
  existsBy,
  getAuditFields,
  readAll,
  readBy,
  readById,
} from "@/utilities/service.utility";
import { orderBy, Timestamp, where, writeBatch } from "firebase/firestore";
import {
  getAdjustUnallocatedCategoryAmountUpdateRequest,
  getUnallocatedCategoryDoc,
} from "./categories.service";
import {
  createTransactionRef,
  getInitializeTransactionRequest,
} from "./transactions.service";

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

export const findByLabel = async (labelLowerCase) => {
  return await readBy(COLLECTION, [
    where("userUuid", "==", auth.currentUser.uid),
    where("labelLowerCase", "==", labelLowerCase),
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

  const batch = writeBatch(db);

  const timestamp = Timestamp.now();

  const accountRef = createRef(COLLECTION);
  batch.set(accountRef, {
    ...account,
    labelLowerCase: account.label.toLowerCase(),
    amount: startingBalance,
    ...getAuditFields(timestamp),
  });

  const { ref: categoryRef, record: category } =
    await getUnallocatedCategoryDoc();
  batch.update(
    categoryRef,
    getAdjustUnallocatedCategoryAmountUpdateRequest(
      category,
      startingBalance,
      timestamp
    )
  );

  const transactionRef = createTransactionRef();
  batch.set(
    transactionRef,
    getInitializeTransactionRequest(
      accountRef.id,
      categoryRef.id,
      startingBalance,
      timestamp
    )
  );

  return await batch.commit().then(() => findById(accountRef.id));
};
