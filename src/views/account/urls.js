// import { stringify as stringifyQs } from "qs";
import urlJoin from "url-join";

export const accountPath = "/account/"

export const accountBillingPath = urlJoin(accountPath ,"billing")
export const accountInfo= urlJoin(accountPath ,"info")
export const accountPurchasedCourses = urlJoin(accountPath ,"courses")
export const accountAddressPath = urlJoin(accountPath, "addresses")