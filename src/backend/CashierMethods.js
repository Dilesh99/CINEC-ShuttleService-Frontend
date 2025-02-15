import backEndURL from "./backEndApi";
import { authMethods } from "./authMethods";

export const CashierMethods = {
    getCashier: async function (cashierID) {
        try {
            const retrievedData = await authMethods.refreshToken();
            const accessToken = retrievedData.accessToken;
            console.log("Fetching cashier data...");

            const response = await fetch(`${backEndURL}/getCashier?cashierID=${cashierID}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (!response.ok) {
                console.error(`Error fetching cashier (status: ${response.status})`);
                return null;
            }

            const data = await response.json();
            const cashier = {
                cashierID: data.cashierID,
                username: data.username,
                email: data.email,
                password: data.password,
                phone_number: data.phone_number,
                paymentStatus: data.paymentStatus
            };

            return cashier;
        } catch (error) {
            console.error("Error fetching cashier:", error);
            return null;
        }
    },

    getAllCashier: async function () {
        try {
            const data = await authMethods.refreshToken();
            if (!data || data.role !== "Admin") {
                console.error("Unauthorized access: Admin role required.");
                return null;
            }

            const accessToken = data.accessToken;
            const response = await fetch(`${backEndURL}/getAllCashier`, {
                method: "GET",
                credentials: "include",
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (!response.ok) {
                console.error(`Error fetching all cashier (status: ${response.status})`);
                return null;
            }

            const cashier = await response.json();
            return cashier;
        } catch (error) {
            console.error("Error fetching all cashier:", error);
            return null;
        }
    },

    deleteCashier: async function (cashierID) {
        try {
            const retrievedData = await authMethods.refreshToken();
            const accessToken = retrievedData.accessToken;
            const cashier = await this.getCashier(cashierID);
            if (!cashier) {
                console.warn("Cashier not found, cannot delete.");
                return null;
            }

            const response = await fetch(`${backEndURL}/deleteCashier?cashierID=${cashierID}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (!response.ok) {
                console.error(`Error deleting cashier (status: ${response.status})`);
                return null;
            }

            const data = await response.text();
            console.log("Cashier deleted:", data);
            return data;
        } catch (error) {
            console.error("Error deleting cashier:", error);
            return null;
        }
    },

    updateCashier: async function (cashierID, username, email, phone_number, password) {
        try {
            const retrievedData = await authMethods.refreshToken();
            const accessToken = retrievedData.accessToken;
            const response = await fetch(`${backEndURL}/updateCashier`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({ cashierID, username, email, phone_number, password })
            });

            if (!response.ok) {
                console.error(`Error updating cashier (status: ${response.status})`);
                return null;
            }

            const data = await response.text();
            console.log("Cashier updated:", data);
            return data;
        } catch (error) {
            console.error("Error updating cashier:", error);
            return null;
        }
    },
};
