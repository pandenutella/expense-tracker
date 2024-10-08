import { CategoryTypes } from "@/constants/categories.constant";
import { auth, db } from "@/firebase";
import {
  createRef,
  existsBy,
  getAuditFields,
  readAll,
  readById,
  readDocBy,
} from "@/utilities/service.utility";
import {
  collection,
  doc,
  orderBy,
  Timestamp,
  where,
  writeBatch,
} from "firebase/firestore";

const COLLECTION = "categories";

export const findAllCategories = async () => {
  return await readAll(COLLECTION, [
    where("userUuid", "==", auth.currentUser.uid),
    orderBy("label"),
  ]);
};

export const findById = async (id) => {
  return await readById(COLLECTION, id);
};

export const createCategory = async (category) => {
  const labelExists = await existsBy(COLLECTION, [
    where("userUuid", "==", auth.currentUser.uid),
    where("label", "==", category.label),
  ]);

  if (labelExists) {
    return Promise.reject({
      statusCode: 422,
      message: `Label "${category.label}" is already used!`,
    });
  }

  const batch = writeBatch(db);

  const timestamp = Timestamp.now();

  const categoryRef = doc(collection(db, COLLECTION));
  batch.set(categoryRef, {
    ...category,
    userUuid: auth.currentUser.uid,
    createdAt: timestamp,
    updatedAt: timestamp,
  });

  return await batch.commit().then(() => findById(categoryRef.id));
};

export const initializeUnallocatedCategory = async () => {
  const exists = await existsBy(COLLECTION, [
    where("userUuid", "==", auth.currentUser.uid),
    where("type", "==", CategoryTypes.SYSTEM),
    where("label", "==", "Unallocated"),
  ]);

  if (exists) {
    return Promise.resolve();
  }

  const batch = writeBatch(db);

  const categoryRef = createCategoryRef();
  batch.set(categoryRef, {
    type: CategoryTypes.SYSTEM,
    label: "Unallocated",
    amount: 0.0,
    ...getAuditFields(),
  });

  return await batch.commit();
};

export const getUnallocatedCategoryDoc = async () => {
  const data = await readDocBy(COLLECTION, [
    where("userUuid", "==", auth.currentUser.uid),
    where("type", "==", CategoryTypes.SYSTEM),
    where("label", "==", "Unallocated"),
  ]);

  return data;
};

export const getAdjustUnallocatedCategoryAmountUpdateRequest = (
  category,
  amount,
  timestamp
) => ({
  amount: category.amount + amount,
  updatedAt: timestamp,
});

export const createCategoryRef = () => createRef(COLLECTION);
