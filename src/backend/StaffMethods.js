import backEndURL from "./backEndApi";

export const StaffMethods = {
    getStaff: async function (staffID) {
        try {
            const response = await fetch(`${backEndURL}/getStaff?staffID=${staffID}`, {
                method: "GET"
            });
            const data = await response.json();
            const staff = {
                staffID: data.staffID,
                username: data.username,
                email: data.email,
                password: data.password,
                phone_number: data.phone_number
            }
            //console.log(staff);
            return staff;
        }
        catch (err) {
            console.log("Staff not found");
            return null;
        }
    },

    getAllStaff: async function () {
        const response = await fetch(`${backEndURL}/getAllStaff`, { method: "GET" });
        const staff = await response.json();
        console.log(staff);

    },

    deleteStaff: async function (staffID) {
        const res = await this.getStaff(staffID);
        if(res != null){
            const response = await fetch(`${backEndURL}/deleteStaff?staffID=${staffID}`, {
                method: "PUT"
            });
            const data = await response.text();
            console.log(data);
        }
        else{
            return null;
        }
    },

    updateStaff: async function (staffID, username, email, phone_number, password) {
        const res = await this.getStaff(staffID);
        if (res == null) {
            const response = await fetch(`${backEndURL}/updateStaff`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ staffID, username, email, phone_number, password })
            });
            const data = await response.text();
            console.log(data);
        }
        else {
            console.log("Staff already exists");
        }
    }
}