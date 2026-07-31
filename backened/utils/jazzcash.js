import crypto from "crypto";
import moment from "moment";

export const getTxnDateTime = () => {
  return moment().format("YYYYMMDDHHmmss");
};

export const getExpiryDateTime = () => {
  return moment().add(1, "hour").format("YYYYMMDDHHmmss");
};

export const generateTxnRefNo = () => {
  return "T" + moment().format("YYYYMMDDHHmmss");
};

/*
Generate Secure Hash

NOTE:
The exact fields used for hash generation depend on the
JazzCash API version. We'll complete the final hash string
in the payment controller in the next response.
*/

export const generateSecureHash = (data) => {
  const integritySalt = process.env.JAZZCASH_INTEGRITY_SALT;

  const sortedKeys = Object.keys(data).sort();

  let hashString = integritySalt;

  sortedKeys.forEach((key) => {
    if (data[key] !== undefined && data[key] !== "") {
      hashString += "&" + data[key];
    }
  });

  return crypto
    .createHmac("sha256", integritySalt)
    .update(hashString)
    .digest("hex");
};