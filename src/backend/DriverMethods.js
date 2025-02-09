import backEndURL from "./backEndApi";
import { authMethods } from "./authMethods";

export const DriverMethods = {
    getDriver: async function (driverID) {
        try {
            const retrievedData = await authMethods.refreshToken();
            const accessToken = retrievedData.accessToken;
            console.log("Fetching driver data...");

            const response = await fetch(`${backEndURL}/getDriver?driverID=${driverID}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (!response.ok) {
                console.error(`Error fetching driver (status: ${response.status})`);
                return null;
            }

            const data = await response.json();
            const driver = {
                driverID: data.driversID,
                username: data.username,
                email: data.email,
                password: data.password,
                phone_number: data.phone_number,
                paymentStatus: data.paymentStatus
            };

            return driver;
        } catch (error) {
            console.error("Error fetching driver:", error);
            return null;
        }
    },

    getAllDrivers: async function () {
        try {
            const data = await authMethods.refreshToken();
            if (!data || data.role !== "Admin") {
                console.error("Unauthorized access: Admin role required.");
                return null;
            }

            const accessToken = data.accessToken;
            const response = await fetch(`${backEndURL}/getAllDrivers`, {
                method: "GET",
                credentials: "include",
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (!response.ok) {
                console.error(`Error fetching all drivers (status: ${response.status})`);
                return null;
            }

            const drivers = await response.json();
            return drivers;
        } catch (error) {
            console.error("Error fetching all drivers:", error);
            return null;
        }
    },

    deleteDriver: async function (driverID) {
        try {
            const retrievedData = await authMethods.refreshToken();
            const accessToken = retrievedData.accessToken;
            const driver = await this.getDriver(driverID);
            if (!driver) {
                console.warn("Driver not found, cannot delete.");
                return null;
            }

            const response = await fetch(`${backEndURL}/deleteDriver?driverID=${driverID}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (!response.ok) {
                console.error(`Error deleting driver (status: ${response.status})`);
                return null;
            }

            const data = await response.text();
            console.log("Driver deleted:", data);
            return data;
        } catch (error) {
            console.error("Error deleting driver:", error);
            return null;
        }
    },

    updateDriver: async function (driverID, shuttleID, username, phone_number, password) {
        try {
            const retrievedData = await authMethods.refreshToken();
            if (!retrievedData || !retrievedData.accessToken) {
                console.error("Failed to retrieve access token.");
                return null;
            }

            const accessToken = retrievedData.accessToken;

            const requestBody = {
                "driverID": driverID,
                "password": password,
                "phone_number": phone_number,
                "shuttleID": shuttleID,
                "username": username
            };

            const response = await fetch(`${backEndURL}/updateDriver`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                console.error(`Error updating driver (status: ${response.status})`);
                const errorResponse = await response.text(); // Log the error response from the server
                console.error("Error Response:", errorResponse);
                return null;
            }

            const data = await response.text();
            return data;
        } catch (error) {
            console.error("Error updating driver:", error);
            return null;
        }
    }
};
