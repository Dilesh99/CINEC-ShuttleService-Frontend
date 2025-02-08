import backEndURL from "./backEndApi";
import { authMethods } from "./authMethods";

export const DriverMethods = {
    getDriver: async function (driverID) {
        try {
            const response = await fetch(`${backEndURL}/getDriver?driverID=${driverID}`, {
                method: "GET"
            });

            if (!response.ok) {
                console.error(`Error fetching driver (status: ${response.status})`);
                return null;
            }

            const data = await response.json();
            const driver = {
                driverID: data.driverID,
                username: data.username,
                email: data.email,
                password: data.password,
                phone_number: data.phone_number
            };

            console.log(driver);
            return driver;
        } catch (error) {
            console.error("Error fetching driver:", error);
            return null;
        }
    },

    getAllDriver: async function () {
        try {
            const data = await authMethods.refreshToken();
            if (!data || data.role !== "Admin") {
                console.error("Unauthorized access: Admin role required.");
                return null;
            }

            const accessToken = data.accessToken;
            const response = await fetch(`${backEndURL}/getAllDrivers`, {
                method: "GET",
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
            const driver = await this.getDriver(driverID);
            if (!driver) {
                console.warn("Driver not found, cannot delete.");
                return null;
            }

            const response = await fetch(`${backEndURL}/deleteDriver?driverID=${driverID}`, {
                method: "PUT"
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

    updateDriver: async function (driverID, username, email, phone_number, password) {
        try {
            const driver = await this.getDriver(driverID);
            if (driver) {
                console.warn("Driver already exists, update skipped.");
                return null;
            }

            const response = await fetch(`${backEndURL}/updateDriver`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ driverID, username, email, phone_number, password })
            });

            if (!response.ok) {
                console.error(`Error updating driver (status: ${response.status})`);
                return null;
            }

            const data = await response.text();
            console.log("Driver updated:", data);
            return data;
        } catch (error) {
            console.error("Error updating driver:", error);
            return null;
        }
    }
};
