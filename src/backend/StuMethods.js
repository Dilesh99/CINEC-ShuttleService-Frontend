import backEndURL from "./backEndApi";

export const StuMethods = {
    getStudent: async function (studentID) {
        try {
            console.log("Accessed the method");
            const response = await fetch(`${backEndURL}/getStudent?studentID=${studentID}`, {
                method: "GET"
            });
            const data = await response.json();
            const student = {
                studentID: data.studentsID,
                username: data.username,
                email: data.email,
                password: data.password,
                phone_number: data.phone_number
            }
            //console.log(student);
            return student;
        }
        catch (err) {
            console.log("Student not found");
            return null;
        }
    },

    getAllStudents: async function () {
        const response = await fetch(`${backEndURL}/getAllStudents`, { method: "GET" });
        const students = await response.json();
        console.log(students);

    },

    deleteStudent: async function (studentID) {
        const res = await this.getStudent(studentID);
        if(res != null){
            const response = await fetch(`${backEndURL}/deleteStudent?studentID=${studentID}`, {
                method: "PUT"
            });
            const data = await response.text();
            console.log(data);
        }
        else{
            return null;
        }
    },

    updateStudent: async function (studentsID, username, email, phone_number, password) {
        const res = await this.getStudent(studentsID);
        if (res == null) {
            const response = await fetch(`${backEndURL}/updateStudent`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ studentsID, username, email, phone_number, password })
            });
            const data = await response.text();
            console.log(data);
        }
        else {
            console.log("Student already exists");
        }
    }
}