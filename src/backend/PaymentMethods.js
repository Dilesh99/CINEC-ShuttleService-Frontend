import backEndURL from "./backEndApi";
import { authMethods } from "./authMethods";

export const PaymentMethods = {
  updatePayment: async function (recordID) {
    try {
      const response = await fetch(`${backEndURL}/updatePayment`, {
        method: "PUT",
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recordID: recordID, vehicleNumber: vehicleNumber })
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

  getPayment: async function(recordID){
    try {
      const data = await authMethods.refreshToken();
      if (!data || data.role !== "Admin") {
        console.error("Unauthorized access: Admin role required.");
        return null;
      }

      const accessToken = data.accessToken;
      const response = await fetch(`${backEndURL}/getPayment?recordID=${recordID}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        console.error(`Error fetching record (status: ${response.status})`);
        return null;
      }

      const records = await response.json();
      return records;
    } catch (error) {
      console.error("Error fetching record:", error);
      return null;
    }
  },

  deletePayment: async function(recordID){
    try {
      const data = await authMethods.refreshToken();
      if (!data || data.role !== "Admin") {
        console.error("Unauthorized access: Admin role required.");
        return null;
      }

      const accessToken = data.accessToken;
      const response = await fetch(`${backEndURL}/deletePayment?recordID=${recordID}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        console.error(`Error deleting all record (status: ${response.status})`);
        return null;
      }

      const records = await response.json();
      return records;
    } catch (error) {
      console.error("Error fetching all records:", error);
      return null;
    }
  }
};
