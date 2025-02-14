import { useEffect, useRef, useState } from 'react';
import { BrowserQRCodeReader } from '@zxing/browser';

export default function QRScanner() {
  const videoRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
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
  }, []);

  return (
    <div>
      <video
        ref={videoRef}
        style={{ width: '100%', maxWidth: '600px' }}
        playsInline
        autoPlay
      />
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}