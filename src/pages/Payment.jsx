import { useRef, useState, useEffect } from "react";
import { Button, Box } from "@mui/material";

import CINEClogo from "./../assets/cinec.png"; // Adjust the path based on your project structure

import { useNavigate } from "react-router-dom";
import { authMethods } from "../backend/authMethods";

export default function Payment() {
  const navigate = useNavigate();
  let ID = null;
  const hasRun = useRef(false);
  useEffect(() => {
    if (!hasRun.current) {
      hasRun.current = true;
      try {
        handleAuth();
      } catch {
        return null;
      }
    }

    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleAuth = async () => {
    const res = await authMethods.refreshToken();
    if (res && res.accessToken && res.ID) {
      ID = res.ID;
    }
    else {
      navigate("/");
    }
  }


  const canvasRef = useRef(null);
  const [passDetails] = useState({
    userName: "John Anderson",
    passId: "SP-2024-0123-4567",
    validFrom: "01/01/2024",
    validUntil: "31/12/2024",
  });

  const drawPass = async () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set canvas background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Rounded rectangle helper function
    const drawRoundedRect = (x, y, w, h, r) => {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
    };

    // Draw outer rounded border
    ctx.fillStyle = "#ffffff";
    drawRoundedRect(0, 0, canvas.width, canvas.height, 10);
    ctx.fill();

    // Watermark Drawing: create two logos - one normal, one rotated
    const drawWatermark = (logo) => {
      ctx.save(); // Save the current state of the canvas
      ctx.globalAlpha = 0.15; // Set opacity for the watermark

      // Normal Logo (Positioned normally and rotated clockwise)
      const logoSize = 100; // Size of the logo for the watermark
      const normalLogoX = 10; // X position of the normal logo
      const normalLogoY = 98; // Y position of the normal logo
      ctx.save(); // Save the canvas state again for the normal logo
      ctx.translate(normalLogoX + logoSize / 2, normalLogoY + logoSize / 2); // Move the origin to the center of the logo
      ctx.rotate(Math.PI / 4); // Rotate 45 degrees clockwise
      ctx.drawImage(logo, -logoSize / 2, -logoSize / 2, logoSize, logoSize); // Draw the logo centered around the origin
      ctx.restore(); // Restore the canvas state for the normal logo

      // Rotated Logo (Positioned rotated)
      ctx.translate(canvas.width / 2, canvas.height / 2); // Move the origin to the center
      ctx.rotate(-Math.PI / 4); // Rotate 45 degrees (diagonal)

      const rotatedLogoX = 50; // X position of the rotated logo
      const rotatedLogoY = 40; // Y position of the rotated logo
      ctx.drawImage(logo, rotatedLogoX, rotatedLogoY, logoSize, logoSize);
      ctx.restore(); // Restore the canvas state
    };

    // Draw black header with logo
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, 80);

    // Draw logo
    const logo = new Image();
    logo.src = CINEClogo;
    logo.onload = () => {
      // Add watermark logos before the main content
      drawWatermark(logo);

      // Draw the logo in the header
      ctx.drawImage(logo, 20, 15, 50, 50);

      // Add "Shuttle Pass" text in header
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 20px Arial";
      ctx.textAlign = "right";
      ctx.fillText("Shuttle Pass", canvas.width - 20, 50);

      // Add passenger name and ID centered
      ctx.textAlign = "center";
      ctx.fillStyle = "#666666";
      ctx.font = "14px Arial";
      ctx.fillText("Passenger Name", canvas.width / 2, 120);

      ctx.fillStyle = "#000000";
      ctx.font = "bold 18px Arial";
      ctx.fillText(passDetails.userName, canvas.width / 2, 150);

      ctx.fillStyle = "#666666";
      ctx.font = "14px Arial";
      ctx.fillText("Pass ID", canvas.width / 2, 180);

      ctx.fillStyle = "#000000";
      ctx.font = "16px Arial";
      ctx.fillText(passDetails.passId, canvas.width / 2, 210);

      // Add validity period
      ctx.textAlign = "left";
      ctx.fillStyle = "#666666";
      ctx.font = "14px Arial";
      ctx.fillText("Valid From", 20, 240);

      ctx.fillStyle = "#000000";
      ctx.font = "16px Arial";
      ctx.fillText(passDetails.validFrom, 20, 270);

      ctx.textAlign = "right";
      ctx.fillStyle = "#666666";
      ctx.font = "14px Arial";
      ctx.fillText("Valid Until", canvas.width - 20, 240);

      ctx.fillStyle = "#000000";
      ctx.font = "16px Arial";
      ctx.fillText(passDetails.validUntil, canvas.width - 20, 270);
    };
  };

  return (
    <Box
      sx={{
        textAlign: "center",
        marginTop: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "90%",
          maxWidth: 400,
          overflow: "hidden",
          border: "1px solid #ccc",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          marginBottom: 2,
          backgroundColor: "#fff",
        }}
      >
        <canvas
          ref={canvasRef}
          width={400}
          height={300}
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={drawPass}
        sx={{ maxWidth: "300px", width: "90%" }}
      >
        Generate Monthly Pass
      </Button>
    </Box>
  );
}
