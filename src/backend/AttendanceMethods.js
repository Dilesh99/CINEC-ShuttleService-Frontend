import backEndURL from "./backEndApi";
import { authMethods } from "./authMethods";

export const AttendanceMethods = {
  updateAttendance: async function (recordID, userID, shuttleID, date) {
    try {
      const response = await fetch(`${backEndURL}/updateAttendance`, {
        method: "PUT",
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recordID: recordID, userID: userID, shuttleID: shuttleID, date: date })
      });

      if (!response.ok) {
        console.error(`Error updating record (status: ${response.status})`);
        return null;
      }

      const data = await response.text();
      console.log("Attendance updated:", data);
      return data;
    } catch (error) {
      console.error("Error updating record:", error);
      return null;
    }
  },

  getAllAttendances: async function () {
    try {
      const data = await authMethods.refreshToken();
      if (!data || (data.role !== "Admin" && data.role !== "Cashier")) {
        console.error("Unauthorized access: Admin role required.");
        return null;
      }

      const accessToken = data.accessToken;
      const response = await fetch(`${backEndURL}/getAllAttendances`, {
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

  getAttendance: async function(recordID){
    try {
      const data = await authMethods.refreshToken();
      if (!data || data.role !== "Admin") {
        console.error("Unauthorized access: Admin role required.");
        return null;
      }

      const accessToken = data.accessToken;
      const response = await fetch(`${backEndURL}/getAttendance?recordID=${recordID}`, {
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

  deleteAttendance: async function(recordID){
    try {
      const data = await authMethods.refreshToken();
      if (!data || data.role !== "Admin") {
        console.error("Unauthorized access: Admin role required.");
        return null;
      }

      const accessToken = data.accessToken;
      const response = await fetch(`${backEndURL}/deleteAttendance?recordID=${recordID}`, {
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
