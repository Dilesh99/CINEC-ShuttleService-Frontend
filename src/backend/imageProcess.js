import Tesseract from "tesseract.js";

export const imageProcessMethods = {
    processStudentImage: async function (setImageVerified, uploadedFile, setSuccessMessage, setImageStatus, studentNum) {
        const file = uploadedFile;

        if (!file) {
            console.error("No file selected");
            setImageStatus(false);
            return;
        }

        console.log("Starting student image processing...");
        setSuccessMessage("Processing Campus ID");

        const reader = new FileReader();

        reader.onload = function (e) {
            const imgSrc = e.target.result;

            console.log("Image loaded, starting OCR...");
            Tesseract.recognize(
                imgSrc,
                'eng',
                {
                    // Additional Tesseract options if needed
                }
            ).then(({ data: { text } }) => {
                console.log("OCR completed. Extracted text:", text);

                // Regular expression to find the 12-character sequence starting with M or F
                const idRegex = /\b[MF]\d{11}\b/g;
                const matches = text.match(idRegex);

                console.log("Candidate IDs:", matches);

                if (matches && matches.length > 0) {
                    const studentID = matches[0]; // Extract the matched ID
                    console.log("Matched student ID:", studentID);

                    if (studentID === studentNum) {
                        console.log("Student ID verified successfully.");
                        setImageVerified(true);
                        setSuccessMessage("Student verified.");
                    } else {
                        console.log("Student ID verification failed.");
                        setImageVerified(false);
                        setSuccessMessage("Verification failed.");
                    }
                } else {
                    console.log("No valid student ID found.");
                    setSuccessMessage("Please upload a clear image.");
                    setImageVerified(false);
                }

                setImageStatus(false); // Mark processing as complete
            }).catch(err => {
                console.error("Error processing image:", err);
                setImageStatus(false);
            });
        };

        reader.readAsDataURL(file);
    },

    processStaffImage: async function (setImageVerified, uploadedFile, setSuccessMessage, setImageStatus, staffNum) {
        const file = uploadedFile;

        if (!file) {
            console.error("No file selected");
            setImageStatus(false);
            return;
        }

        console.log("Starting staff image processing...");
        setSuccessMessage("Processing ID");

        const reader = new FileReader();

        reader.onload = function (e) {
            const imgSrc = e.target.result;

            console.log("Image loaded, starting OCR...");
            Tesseract.recognize(
                imgSrc,
                'eng',
                {
                    // Additional Tesseract options if needed
                }
            ).then(({ data: { text } }) => {
                console.log("OCR completed. Extracted text:", text);

                // Regular expression to find 12-digit numbers
                const idRegex = /\b\d{12}\b/g;
                const matches = text.match(idRegex);

                console.log("Candidate IDs:", matches);

                if (matches && matches.length > 0) {
                    const isVerified = matches.some(id => id === staffNum);
                    console.log("Verification result:", isVerified);

                    if (isVerified) {
                        console.log("Staff ID verified successfully.");
                        setImageVerified(true);
                        setSuccessMessage("Verified.");
                    } else {
                        console.log("Staff ID verification failed.");
                        setImageVerified(false);
                        setSuccessMessage("Verification failed.");
                    }
                } else {
                    console.log("No valid staff ID found.");
                    setSuccessMessage("Please upload a clear image.");
                    setImageVerified(false);
                }

                setImageStatus(false); // Mark processing as complete
            }).catch(err => {
                console.error("Error processing image:", err);
                setImageStatus(false);
            });
        };

        reader.readAsDataURL(file);
    }
};
