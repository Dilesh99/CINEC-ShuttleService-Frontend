import Tesseract from "tesseract.js";

export const imageProcessMethods = {
    processStudentImage: async function (setImageVerified, uploadedFile, setSuccessMessage, setImageStatus, studentNum) {
        const file = uploadedFile;

        if (!file) {
            console.error("No file selected");
            return;
        }

        setSuccessMessage("Processing Campus ID");

        const reader = new FileReader();

        reader.onload = function (e) {
            const imgSrc = e.target.result;

            Tesseract.recognize(
                imgSrc,
                'eng',
                {
                    
                }
            ).then(({ data: { text } }) => {
                // Regular expression to find the 12-character sequence starting with M
                const idRegex = /\b[MF]\d{11}\b/g;
                const match = text.match(idRegex);

                if (match) {
                    const studentID = match[0]; // Extract the matched ID
                    if(studentID == studentNum){
                        setImageVerified(true); // Set image as verified
                        setSuccessMessage("Student verified.");
                    }
                    else{
                        setImageVerified(false); // Set image as verified
                        setSuccessMessage("Verification failed.");
                    }
                } else {
                    setSuccessMessage("Please upload a clear image.");
                    setImageVerified(false); // Set image as not verified
                }

                setImageStatus(false); // Mark processing as complete
            }).catch(err => {
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
    
        setSuccessMessage("Processing ID");
    
        const reader = new FileReader();
    
        reader.onload = function (e) {
            const imgSrc = e.target.result;
    
            Tesseract.recognize(
                imgSrc,
                'eng',
                {
                    // Additional Tesseract options if needed
                }
            ).then(({ data: { text } }) => {
                const idRegex = /\b\d{12}\b/g;
                const matches = text.match(idRegex);
    
                if (matches && matches.length > 0) {
                    const isVerified = matches.some(id => id === staffNum);
    
                    if (isVerified) {
                        setImageVerified(true); // Set image as verified
                        setSuccessMessage("Verified.");
                    } else {
                        setImageVerified(false); // Set image as not verified
                        setSuccessMessage("Verification failed.");
                    }
                } else {
                    setSuccessMessage("Please upload a clear image.");
                    setImageVerified(false); // Set image as not verified
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
