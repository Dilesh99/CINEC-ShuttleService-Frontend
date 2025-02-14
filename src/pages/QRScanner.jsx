import { useEffect, useRef, useState } from 'react';
import { BrowserQRCodeReader } from '@zxing/browser';
import { Box, Button, CssBaseline, Typography } from '@mui/material';
import BackgroundImage from "/src/assets/bg5.jpg";
import Layout from '../components/Layout';


export default function QRScanner() {
  const videoRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState('');

  /*useEffect(() => {
    const codeReader = new BrowserQRCodeReader();

    const setupScanner = async () => {
      try {
        // Request access to the rear-facing camera
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        });

        const videoElement = videoRef.current;
        if (!videoElement) {
          setErrorMessage('Video element not found.');
          return;
        }

        // Set video source and play
        videoElement.srcObject = stream;
        await videoElement.play();

        // Start decoding from the video stream
        codeReader.decodeFromStream(stream, videoElement, (result, error) => {
          if (result) {
            console.log('Decoded URL:', result.getText());
            window.location.href = result.getText();
            setErrorMessage('');
            return () => {
              codeReader.reset();
              if (videoRef.current?.srcObject) {
                const tracks = videoRef.current.srcObject.getTracks();
                tracks.forEach(track => track.stop());
              }
            };
          }
          if (error) {
            console.error('Decoding error:', error);
            setErrorMessage('Please ensure the QR code is clear and properly framed.');
          }
        });
      } catch (error) {
        console.error('Camera access error:', error);
        setErrorMessage('Please ensure you have granted camera permissions.');
      }
    };

    setupScanner();

    // Cleanup function
    return () => {
      codeReader.reset();
      if (videoRef.current?.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);*/

  return (
    <>
    <Layout>
    <CssBaseline />
    <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                minHeight: "100vh",
                width: "100vw", // Ensures full viewport width
                backgroundImage: `url(${BackgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                margin: 0,
                padding: 4,
                overflow: "hidden", // Prevent scrollbars if content overflows
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
          sx={{
          // onClick: () => {  window.location.href = "/payment"; },
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
            color: 'red',
            marginTop: '10px',
            textAlign: 'center',
          }}
        >
          {errorMessage}
        </Typography>
      )}
    </Box>
    </Layout>
    </>
  );
}