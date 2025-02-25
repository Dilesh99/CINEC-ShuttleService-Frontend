import backEndURL from "./backEndApi";
import { authMethods } from "./authMethods";

export const StuMethods = {
    getStudent: async function (studentID) {
        try {
            const retrievedData = await authMethods.refreshToken();
            const accessToken = retrievedData.accessToken;
            console.log("Fetching student data...");

            const response = await fetch(`${backEndURL}/getStudent?studentID=${studentID}&timestamp=${Date.now()}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (!response.ok) {
                console.error(`Error fetching student (status: ${response.status})`);
                return null;
            }

            const data = await response.json();
            const student = {
                studentID: data.studentsID,
                shuttleID: data.shuttleID,
                username: data.username,
                email: data.email,
                password: data.password,
                phone_number: data.phone_number,
                paymentStatus: data.paymentStatus,
                scannedStatus: data.scannedStatus
            };

            return student;
        } catch (error) {
            console.error("Error fetching student:", error);
            return null;
        }
    },

    getAllStudents: async function () {
        try {
            const data = await authMethods.refreshToken();
            console.log(data.role);
            if (!data || (data.role !== "Admin" && data.role !== "Cashier")) {
                console.error("Unauthorized access: Admin role required.");
                return null;
            }

            const accessToken = data.accessToken;
            const response = await fetch(`${backEndURL}/getAllStudents`, {
                method: "GET",
                credentials: "include",
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (!response.ok) {
                console.error(`Error fetching all students (status: ${response.status})`);
                return null;
            }

            const students = await response.json();
            return students;
        } catch (error) {
            console.error("Error fetching all students:", error);
            return null;
        }
    },

    deleteStudent: async function (studentID) {
        try {
            const retrievedData = await authMethods.refreshToken();
            const accessToken = retrievedData.accessToken;
            const student = await this.getStudent(studentID);
            if (!student) {
                console.warn("Student not found, cannot delete.");
                return null;
            }

            const response = await fetch(`${backEndURL}/deleteStudent?studentID=${studentID}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (!response.ok) {
                console.error(`Error deleting student (status: ${response.status})`);
                return null;
            }

            const data = await response.text();
            console.log("Student deleted:", data);
            return data;
        } catch (error) {
            console.error("Error deleting student:", error);
            return null;
        }
    },

    updateStudent: async function (studentsID, shuttleID, username, email, phone_number, password, paymentStatus, scannedStatus) {
        try {
            const retrievedData = await authMethods.refreshToken();
            const accessToken = retrievedData.accessToken;
            const response = await fetch(`${backEndURL}/updateStudent`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({ studentsID, shuttleID, username, email, phone_number, password, paymentStatus, scannedStatus })
            });

            if (!response.ok) {
                console.error(`Error updating student (status: ${response.status})`);
                return null;
            }

            const data = await response.text();
            console.log("Student updated:", data);
            return data;
        } catch (error) {
            console.error("Error updating student:", error);
            return null;
        }
    },

    makeStudentUnpaid: async function (studentsID) {
        try {
            const retrievedData = await authMethods.refreshToken();
            const accessToken = retrievedData.accessToken;
            const response = await fetch(`${backEndURL}/makeStudentUnpaid?studentID=${studentsID}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },

            });

            if (!response.ok) {
                console.error(`Error updating student (status: ${response.status})`);
                return null;
            }

            const data = await response.text();
            console.log("Student updated:", data);
            return data;
        } catch (error) {
            console.error("Error updating student:", error);
            return null;
        }
    },

    makeStudentPaid: async function (studentsID) {
        try {
            const retrievedData = await authMethods.refreshToken();
            const accessToken = retrievedData.accessToken;
            const response = await fetch(`${backEndURL}/makeStudentPaid?studentID=${studentsID}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },

            });

            if (!response.ok) {
                console.error(`Error updating student (status: ${response.status})`);
                return null;
            }

            const data = await response.text();
            console.log("Student updated:", data);
            return data;
        } catch (error) {
            console.error("Error updating student:", error);
            return null;
        }
    },

    makeStudentScanned: async function (studentsID) {
        try {
            const retrievedData = await authMethods.refreshToken();
            const accessToken = retrievedData.accessToken;
            const response = await fetch(`${backEndURL}/makeStudentScanned?studentID=${studentsID}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },

            });

            if (!response.ok) {
                console.error(`Error updating student (status: ${response.status})`);
                return null;
            }

            const data = await response.text();
            console.log("Student updated:", data);
            return data;
        } catch (error) {
            console.error("Error updating student:", error);
            return null;
        }
    },

    makeStudentUnScanned: async function (studentsID) {
        try {
            const retrievedData = await authMethods.refreshToken();
            const accessToken = retrievedData.accessToken;
            const response = await fetch(`${backEndURL}/makeStudentUnScanned?studentID=${studentsID}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },

            });

            if (!response.ok) {
                console.error(`Error updating student (status: ${response.status})`);
                return null;
            }

            const data = await response.text();
            console.log("Student updated:", data);
            return data;
        } catch (error) {
            console.error("Error updating student:", error);
            return null;
        }
    }
};
