import backEndURL from "./backEndApi";
import { authMethods } from "./authMethods";

export const StaffMethods = {
    getStaff: async function (staffID) {
        try {
            const retrievedData = await authMethods.refreshToken();
            const accessToken = retrievedData.accessToken;
            console.log("Fetching staff data...");

            const response = await fetch(`${backEndURL}/getStaff?staffID=${staffID}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (!response.ok) {
                console.error(`Error fetching staff (status: ${response.status})`);
                return null;
            }

            const data = await response.json();
            const staff = {
                staffID: data.staffID,
                username: data.username,
                email: data.email,
                password: data.password,
                phone_number: data.phone_number,
                paymentStatus: data.paymentStatus
            };

            return staff;
        } catch (error) {
            console.error("Error fetching staff:", error);
            return null;
        }
    },

    getAllStaff: async function () {
        try {
            const data = await authMethods.refreshToken();
            if (!data || data.role !== "Admin") {
                console.error("Unauthorized access: Admin role required.");
                return null;
            }

            const accessToken = data.accessToken;
            const response = await fetch(`${backEndURL}/getAllStaff`, {
                method: "GET",
                credentials: "include",
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (!response.ok) {
                console.error(`Error fetching all staff (status: ${response.status})`);
                return null;
            }

            const staff = await response.json();
            return staff;
        } catch (error) {
            console.error("Error fetching all staff:", error);
            return null;
        }
    },

    deleteStaff: async function (staffID) {
        try {
            const retrievedData = await authMethods.refreshToken();
            const accessToken = retrievedData.accessToken;
            const staff = await this.getStaff(staffID);
            if (!staff) {
                console.warn("Staff not found, cannot delete.");
                return null;
            }

            const response = await fetch(`${backEndURL}/deleteStaff?staffID=${staffID}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (!response.ok) {
                console.error(`Error deleting staff (status: ${response.status})`);
                return null;
            }

            const data = await response.text();
            console.log("Staff deleted:", data);
            return data;
        } catch (error) {
            console.error("Error deleting staff:", error);
            return null;
        }
    },

    updateStaff: async function (staffID, username, email, phone_number, password) {
        try {
            const retrievedData = await authMethods.refreshToken();
            const accessToken = retrievedData.accessToken;
            const response = await fetch(`${backEndURL}/updateStaff`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({ staffID, username, email, phone_number, password })
            });

            if (!response.ok) {
                console.error(`Error updating staff (status: ${response.status})`);
                return null;
            }

            const data = await response.text();
            console.log("Staff updated:", data);
            return data;
        } catch (error) {
            console.error("Error updating staff:", error);
            return null;
        }
    },

    makeStaffUnpaid: async function (staffID) {
        try {
            const retrievedData = await authMethods.refreshToken();
            const accessToken = retrievedData.accessToken;
            const response = await fetch(`${backEndURL}/makeStaffUnpaid?staffID=${staffID}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                
            });

            if (!response.ok) {
                console.error(`Error updating staff (status: ${response.status})`);
                return null;
            }

            const data = await response.text();
            console.log("Staff updated:", data);
            return data;
        } catch (error) {
            console.error("Error updating staff:", error);
            return null;
        }
    },

    makeStaffPaid: async function (staffID) {
        try {
            const retrievedData = await authMethods.refreshToken();
            const accessToken = retrievedData.accessToken;
            const response = await fetch(`${backEndURL}/makeStaffPaid?staffID=${staffID}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                
            });

            if (!response.ok) {
                console.error(`Error updating staff (status: ${response.status})`);
                return null;
            }

            const data = await response.text();
            console.log("Staff updated:", data);
            return data;
        } catch (error) {
            console.error("Error updating staff:", error);
            return null;
        }
    }
};
