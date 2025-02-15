import { useEffect, useRef, useState } from 'react';
import { BrowserQRCodeReader } from '@zxing/browser';
import { Box, Button, CssBaseline, Typography, Modal, CircularProgress } from '@mui/material';
import BackgroundImage from "/src/assets/bg5.jpg";
import { authMethods } from '../backend/authMethods';
import backEndURL from '../backend/backEndApi';
import { StuMethods } from '../backend/StuMethods';
import { StaffMethods } from '../backend/StaffMethods';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

export default function QRScanner() {
  const videoRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [ID, setID] = useState(null);
  const [role, setRole] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ icon: null, message: '' });

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const handleAuth = async () => {
    try {
      const res = await authMethods.refreshToken();
      if (res?.accessToken && res.ID && (res.role === 'Student' || res.role === 'Staff')) {
        setID(res.ID);
        setRole(res.role);
      } else {
        window.location.href = '/';
      }
    } catch (error) {
      console.error("Authentication error:", error);
      window.location.href = '/';
    }
  };

  const handleScanResult = async (url) => {
    if (url === backEndURL) {
      console.log('Decoded URL:', url);

      let user = null;
      try {
        if (role === 'Student') {
          user = await StuMethods.getStudent(ID);
        } else if (role === 'Staff') {
          user = await StaffMethods.getStaff(ID);
        }

        if (user) {
          if (!user.paymentStatus) {
            setModalContent({
              icon: <CancelIcon sx={{ fontSize: 60, color: 'white' }} />,
              message: 'Shuttle Pass Expired.'
            });
            setModalOpen(true);
            stopCamera();
            return;
          } else {
            const currentDate = new Date().toLocaleString();
            setModalContent({
              icon: <CheckCircleIcon sx={{ fontSize: 60, color: 'white' }} />,
              message: `Shuttle Pass Verified. ${currentDate}`
            });
            setModalOpen(true);
            stopCamera();
            return;
          }

        }
      } catch (error) {
        setModalContent({
          icon: <CancelIcon sx={{ fontSize: 60, color: 'white' }} />,
          message: 'Failed to retrieve user data.'
        });
        setModalOpen(true);
        console.error("Error fetching user:", error);
        stopCamera();
        return;
      }
    } else {
      setErrorMessage('Please scan the CINEC shuttle QR code.');
      return;
    }

    stopCamera();
    window.location.href = url;
  };

  useEffect(() => {
    handleAuth();
    setIsRedirecting(false);
    const codeReader = new BrowserQRCodeReader();
    let stream = null;

    const handleVisibilityChange = () => {
      if (document.hidden) stopCamera();
    };

    const handleWindowBlur = () => {
      stopCamera();
    };

    const setupScanner = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        });

        const videoElement = videoRef.current;
        if (!videoElement) {
          setErrorMessage('Video element not found.');
          return;
        }

        videoElement.srcObject = stream;
        await videoElement.play();

        codeReader.decodeFromVideoElement(videoElement, (result, error) => {
          if (result && !isRedirecting) {
            setIsRedirecting(true);
            handleScanResult(result.getText());
          }
          if (error) {
            setErrorMessage('Please ensure the QR code is clear and properly framed.');
          }
        });
      } catch (error) {
        setErrorMessage('Please ensure you have granted camera permissions.');
      }
    };

    setupScanner();

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);

    return () => {
      stopCamera();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, [ID, role]);

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          minHeight: "100vh",
          width: "100vw",
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          margin: 0,
          padding: 4,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            bgcolor: 'rgba(255, 255, 255, 0.3)',
            position: 'relative',
            width: '100%',
            maxWidth: '400px',
            aspectRatio: '1',
            border: '10px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
            borderRadius: '20px',
            overflow: 'hidden',
          }}
        >
          <video
            ref={videoRef}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            playsInline
            autoPlay
          />
        </Box>
        <Button
          variant="contained"
          onClick={() => window.location.href = "/payment"}
          sx={{
            mt: 2,
            backgroundColor: "#05183A",
            color: "#fff",
            fontWeight: "bold",
            borderRadius: "8px",
            px: 3,
            py: 1,
            "&:hover": {
              backgroundColor: "#193D61",
            },
          }}
        >
          Back
        </Button>

        {errorMessage && (
          <Typography
            sx={{
              color: 'white',
              marginTop: '10px',
              textAlign: 'center',
            }}
          >
            {errorMessage}
          </Typography>
        )}

        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              bgcolor: modalContent.icon ? (modalContent.icon.type === CheckCircleIcon ? 'green' : 'red') : 'transparent',
              color: 'white',
              padding: 4,
              borderRadius: '10px',
              textAlign: 'center',
            }}
          >
            {modalContent.icon}
            <Typography variant="h6" sx={{ mt: 2 }}>
              {modalContent.message}
            </Typography>
          </Box>
        </Modal>
      </Box>
    </>
  );
}