import { useRef } from "react";
import { Button, Box } from "@mui/material";
import CINEClogo from "./../assets/cinec.png"; // Adjust the path based on your project structure

export default function Payment() {
  const canvasRef = useRef(null);

  const drawPass = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Pass details
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString("default", { month: "long" });
    const year = currentDate.getFullYear();
    const passDetails = {
      userName: "John Doe",
      userId: "12345",
      passNumber: `${currentMonth}-${year}-${Math.floor(Math.random() * 1000)}`,
    };

    // Draw professional gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#1c92d2"); // Light Blue
    gradient.addColorStop(1, "#f2fcfe"); // Soft White
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw border with rounded corners
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 8;
    ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

    // Draw CINEC logo
    const logo = new Image();
    logo.src = CINEClogo;
    logo.onload = () => {
      ctx.drawImage(logo, canvas.width / 2 - 50, 20, 100, 50); // Centered logo

      // Add header text
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 26px 'Arial', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("CINEC MONTHLY PASS", canvas.width / 2, 100);

      // Add pass details
      ctx.fillStyle = "#ffffff";
      ctx.font = "18px 'Arial', sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(`Name: ${passDetails.userName}`, 20, 150);
      ctx.fillText(`ID: ${passDetails.userId}`, 20, 190);
      ctx.fillText(`Month: ${currentMonth} ${year}`, 20, 230);
      ctx.fillText(`Pass Number: ${passDetails.passNumber}`, 20, 270);

      // Add a subtle shadow under the text
      ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
      ctx.shadowBlur = 15;
      ctx.shadowOffsetX = 5;
      ctx.shadowOffsetY = 5;

      // Add decorative line below header
      ctx.shadowColor = "transparent"; // Remove shadow for decorations
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(50, 120);
      ctx.lineTo(canvas.width - 50, 120);
      ctx.stroke();
    };
  };

  return (
    <Box sx={{ textAlign: "center", marginTop: 4 }}>
      <canvas
        ref={canvasRef}
        width={400}
        height={300}
        style={{
          border: "1px solid #ccc",
          marginBottom: "20px",
          backgroundColor: "#fff",
          borderRadius: "10px",
        }}
      />
      <br />
      <Button variant="contained" color="primary" onClick={drawPass}>
        Generate Monthly Pass
      </Button>
    </Box>
  );
}
