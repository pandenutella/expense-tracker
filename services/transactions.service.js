import { createRef, getAuditFields } from "@/utilities/service.utility";

const COLLECTION = "transactions";

export const getInitializeTransactionRequest = (
  accountId,
  categoryId,
  startingBalance,
  timestamp
) => ({
  type: "INITIALIZE",
  accountId,
  categoryId,
  amount: startingBalance,
  notes: null,
  cleared: true,
  date: timestamp,
  ...getAuditFields(timestamp),
});

export const createTransactionRef = () => createRef(COLLECTION);
