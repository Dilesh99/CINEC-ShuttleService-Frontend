import backEndURL from "./backEndApi";

export const DriverMethods = {
    getDriver: async function (driverID) {
        try {
            const response = await fetch(`${backEndURL}/getDriver?driverID=${driverID}`, {
                method: "GET"
            });
            const data = await response.json();
            const driver = {
                driverID: data.driverID,
                username: data.username,
                email: data.email,
                password: data.password,
                phone_number: data.phone_number
            }
            console.log(driver);
            return driver;
        }
        catch (err) {
            console.log("Driver not found");
            return null;
        }
    },

    getAllDriver: async function () {
        const response = await fetch(`${backEndURL}/getAllDriver`, { method: "GET" });
        const driver = await response.json();
        console.log(driver);

    },

    deleteDriver: async function (driverID) {
        const res = await this.getDriver(driverID);
        if(res != null){
            const response = await fetch(`${backEndURL}/deleteDriver?driverID=${driverID}`, {
                method: "PUT"
            });
            const data = await response.text();
            console.log(data);
        }
        else{
            return null;
        }
    },

    updateDriver: async function (driverID, username, email, phone_number, password) {
        const res = await this.getDriver(driverID);
        if (res == null) {
            const response = await fetch(`${backEndURL}/updateDriver`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ driverID, username, email, phone_number, password })
            });
            const data = await response.text();
            console.log(data);
        }
        else {
            console.log("Driver already exists");
        }
    }
}