import backEndURL from "./backEndApi";
import { authMethods } from "./authMethods";

export const PaymentMethods = {
  updatePayment: async function (userID, shuttleID) {
    try {

      const retrievedData = await authMethods.refreshToken();
      if (!retrievedData || (retrievedData.role !== "Admin" && retrievedData.role !== "Cashier")) {
        console.error("Unauthorized access: Admin role required.");
        return null;
      }

      const accessToken = retrievedData.accessToken;

      const dateFormatter = new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });

      const date = dateFormatter.format(new Date());

      const response = await fetch(`${backEndURL}/updatePayment`, {
        method: "PUT",
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({recordID: "", userID: userID, shuttleID: shuttleID, date: date.toString() })
      });

      if (!response.ok) {
        console.error(`Error updating record (status: ${response.status})`);
        return null;
      }

      const data = await response.text();
      console.log("Payment updated:", data);
      return data;
    } catch (error) {
      console.error("Error updating record:", error);
      return null;
    }
  },

  getAllPayments: async function () {
    try {
      const data = await authMethods.refreshToken();
      if (!data || (data.role !== "Admin" && data.role !== "Cashier")) {
        console.error("Unauthorized access: Admin role required.");
        return null;
      }

      const accessToken = data.accessToken;
      const response = await fetch(`${backEndURL}/getAllPayments`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        console.error(`Error fetching all records (status: ${response.status})`);
        return null;
      }

      const records = await response.json();
      return records;
    } catch (error) {
      console.error("Error fetching all records:", error);
      return null;
    }
  },

  deleteAllPayments: async function () {
    try{
      const data = await authMethods.refreshToken();
    if (!data || data.role !== "Admin") {
      console.error("Unauthorized access: Admin role required.");
      return null;
    }

    const accessToken = data.accessToken;
    const response = await fetch(`${backEndURL}/deleteAllPayments`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      console.error(`Error deleting all records (status: ${response.status})`);
      return null;
    }
    else {
      return true;
    }
    }
    catch{
      return null;
    }
  }
};
