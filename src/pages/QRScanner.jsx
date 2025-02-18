import { useEffect, useRef, useState, useCallback } from 'react';
import { BrowserQRCodeReader } from '@zxing/browser';
import { Box, Button, CssBaseline, Typography, Modal, CircularProgress } from '@mui/material';
import BackgroundImage from "/src/assets/bg5.jpg";
import { authMethods } from '../backend/authMethods';
import backEndURL from '../backend/backEndApi';
import { StuMethods } from '../backend/StuMethods';
import { StaffMethods } from '../backend/StaffMethods';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { AttendanceMethods } from '../backend/AttendanceMethods';

export default function QRScanner() {

  let i = 0;

  const videoRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [ID, setID] = useState(null);
  const [role, setRole] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ icon: null, message: '' });
  const [isScanning, setIsScanning] = useState(true); // Control whether to continue scanning

  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  }, []);

  const handleOk = useCallback(() => {
    i=0;
    stopCamera();
    setModalOpen(false);
    setIsScanning(false); // Prevent further scans until the user navigates back
    window.location.href = '/payment';
  }, [stopCamera]);

  const handleAuth = useCallback(async () => {
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
  }, []);

  const handleScanResult = useCallback(
    async (url) => {
      if (!isScanning) return;
      setIsScanning(false);

      try {
        let user = null;
        if (role === 'Student') {
          user = await StuMethods.getStudent(ID);
        } else if (role === 'Staff') {
          user = await StaffMethods.getStaff(ID);
        }

        if (!user) {
          throw new Error('User not found.');
        }

        if (!user.paymentStatus) {
          setModalContent({
            icon: <CancelIcon sx={{ fontSize: 60, color: 'white' }} />,
            message: 'Shuttle Pass Expired.',
          });
          setModalOpen(true);
          stopCamera();
          return;
        }

        if (user.scannedStatus) {
          setModalContent({
            icon: <CancelIcon sx={{ fontSize: 60, color: 'white' }} />,
            message: 'User already scanned.',
          });
          setModalOpen(true);
          stopCamera();
          return;
        }

        const currentDate = new Date().toLocaleString();
        setModalContent({
          icon: <CheckCircleIcon sx={{ fontSize: 60, color: 'white' }} />,
          message: (
            <>
              Shuttle pass verified.
              <br />
              {currentDate}
            </>
          ),
        });
        setModalOpen(true);
        await AttendanceMethods.updateAttendance(ID, user.shuttleID);

        if (role === 'Student') {
          await StuMethods.makeStudentScanned(ID);
        } else if (role === 'Staff') {
          await StaffMethods.makeStaffScanned(ID);
        }
      } catch (error) {
        setModalContent({
          icon: <CancelIcon sx={{ fontSize: 60, color: 'white' }} />,
          message: 'Failed to retrieve or update user data.',
        });
        setModalOpen(true);
        console.error("Error handling scan result:", error);
      } finally {
        stopCamera();
      }
    },
    [ID, role, stopCamera, isScanning]
  );

  useEffect(() => {
    handleAuth();

    const codeReader = new BrowserQRCodeReader();
    let stream = null;

    const setupScanner = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
        });

        const videoElement = videoRef.current;
        if (!videoElement) {
          setErrorMessage('Video element not found.');
          return;
        }

        videoElement.srcObject = stream;
        await videoElement.play();

        codeReader.decodeFromVideoElement(videoElement, (result, error) => {
          if (result && isScanning && !isRedirecting && i == 0) {
            i++;
            setIsScanning(false); // Stop scanning
            setIsRedirecting(true);
            if(result.getText() !== backEndURL){
              setErrorMessage("Please scan the CINEC shuttle QR code");
              i = 0;
              setIsScanning(true);
              setIsRedirecting(false);
            }
            else{
              stopCamera();
              handleScanResult(result.getText());
            }
            
          }
          if (error) {
            setErrorMessage('Please ensure the QR code is clear and properly framed.');
          }
        });
      } catch (error) {
        setErrorMessage('Please ensure you have granted camera permissions.');
      }
    };

    if (isScanning) {
      setupScanner();
    }

    const handleVisibilityChange = () => {
      if (document.hidden) stopCamera();
    };

    const handleWindowBlur = () => {
      stopCamera();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);

    return () => {
      stopCamera();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, [handleAuth, handleScanResult, isRedirecting, stopCamera, isScanning]);

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
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {isRedirecting ? (
            <CircularProgress
              size={80} // Bigger size
              sx={{ color: 'white' }} // White color
            />
          ) : (
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
          )}
        </Box>
        <Button
          variant="contained"
          onClick={() => (window.location.href = "/payment")}
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
              bgcolor: modalContent.icon
                ? modalContent.icon.type === CheckCircleIcon
                  ? 'green'
                  : 'red'
                : 'transparent',
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
            <Button
              variant="contained"
              onClick={handleOk}
              sx={{
                mt: 2,
                backgroundColor: 'white',
                color: modalContent.icon
                  ? modalContent.icon.type === CheckCircleIcon
                    ? 'green'
                    : 'red'
                  : 'transparent',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
              }}
            >
              OK
            </Button>
          </Box>
        </Modal>
      </Box>
    </>
  );
}