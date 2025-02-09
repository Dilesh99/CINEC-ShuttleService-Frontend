import { useRef, useState, useEffect } from "react";
import { Box, CssBaseline } from "@mui/material";
import CINEClogo from "./../assets/cinec.png";
import BackgroundImage from "/src/assets/bg5.jpg";
import { useNavigate } from "react-router-dom";
import { authMethods } from "../backend/authMethods";
import { StuMethods } from "../backend/StuMethods";
import { StaffMethods } from "../backend/StaffMethods";
import Layout from "../components/Layout";

export default function Payment() {
  const navigate = useNavigate();
  const [ID, setID] = useState(null);
  const [role, setRole] = useState("");
  const [paid, setPaid] = useState(false);
  const [userName, setUserName] = useState("");
  const [firstDay, setFirstDay] = useState("");
  const [lastDay, setLastDay] = useState("");
  const hasRun = useRef(false);

  // Get current month's first and last day
  const getMonthDates = () => {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    
    return {
      firstDay: firstDay.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      lastDay: lastDay.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };
  };

  useEffect(() => {
    if (!hasRun.current) {
      hasRun.current = true;
      const initialize = async () => {
        try {
          const {authId, role} = await handleAuth(); // Get ID from handleAuth
          if (!authId) return;
      
          const person = await getPerson(authId, role); // Pass authId directly
          if (person?.paymentStatus) {
            const { firstDay, lastDay } = getMonthDates();

            setUserName(person.username);
            setFirstDay(firstDay);
            setLastDay(lastDay);
            setPaid(true);
            drawPass(person.username, firstDay, lastDay);
          } else {
            navigate("/home");
          }
        } catch (error) {
          console.error("Initialization error:", error);
        }
      };
      initialize();
    }
  }, [paid]);

  const handleAuth = async () => {
    const res = await authMethods.refreshToken();

    console.log(res.accessToken);
    console.log(res.ID);
    console.log(res.role);

    if (res?.accessToken && res.ID && res.role) {
      setID(res.ID);
      setRole(res.role);
      return {authId: res.ID, role: res.role}; // Return the ID
    } else {
      navigate("/");
      return null;
    }
  };

  const getPerson = async (id, role) => {
    let res = null;
    if(role == "Student"){
      res = await StuMethods.getStudent(id);
    }
    else if(role == "Staff"){
      res = await StaffMethods.getStaff(id);
    }
    if (res) {
      setUserName(res.username || "");
      return res;
    }
    return null;
  };

  const canvasRef = useRef(null);

  const drawPass = (username, firstDay, lastDay) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear and redraw canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw black header
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, 80);

    // Draw logo and text
    const logo = new Image();
    logo.src = CINEClogo;
    logo.onload = () => {
      ctx.drawImage(logo, 20, 15, 50, 50);
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 20px Arial";
      ctx.textAlign = "right";
      ctx.fillText("Shuttle Pass", canvas.width - 20, 50);

      // Passenger info
      ctx.textAlign = "center";
      ctx.fillStyle = "#666666";
      ctx.font = "14px Arial";
      ctx.fillText("Passenger Name", canvas.width / 2, 120);
      ctx.fillStyle = "#000000";
      ctx.font = "bold 18px Arial";
      ctx.fillText(username, canvas.width / 2, 150);

      // Validity dates
      ctx.textAlign = "left";
      ctx.fillStyle = "#666666";
      ctx.fillText("Valid From", 20, 240);
      ctx.fillStyle = "#000000";
      ctx.fillText(firstDay, 20, 270);

      ctx.textAlign = "right";
      ctx.fillStyle = "#666666";
      ctx.fillText("Valid Until", canvas.width - 20, 240);
      ctx.fillStyle = "#000000";
      ctx.fillText(lastDay, canvas.width - 20, 270);
    };
  };

  return (
    <Layout>
      <CssBaseline />
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
        <Box sx={{
          width: "90%",
          maxWidth: 400,
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: 3,
          p: 2
        }}>
          <canvas
            ref={canvasRef}
            width={400}
            height={300}
            style={{ width: "100%", height: "auto" }}
          />
        </Box>
      </Box>
    </Layout>
  );
}