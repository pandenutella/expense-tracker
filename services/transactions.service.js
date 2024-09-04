import { auth } from "@/firebase";
import { createRef } from "@/utilities/service.utility";

const COLLECTION = "transactions";

export const getInitializeTransactionRequest = (
  accountId,
  categoryId,
  startingBalance,
  timestamp
) => ({
  userUuid: auth.currentUser.uid,
  type: "INITIALIZE",
  accountId,
  categoryId,
  amount: startingBalance,
  notes: null,
  cleared: true,
  date: timestamp,
  createdAt: timestamp,
  updatedAt: timestamp,
});

export const createTransactionRef = () => createRef(COLLECTION);
