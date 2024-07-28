import { auth } from "@/firebase";
import { readAll } from "@/utilities/service.utility";
import { orderBy, where } from "firebase/firestore";

export const findAllAccounts = async () => {
  return await readAll("accounts", [
    where("userUuid", "==", auth.currentUser.uid),
    orderBy("label"),
  ]);
};
