import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Box, Button, TextField, Typography } from "@mui/material";

export default function testPage() {
  const [url, setUrl] = useState("");
  const [generated, setGenerated] = useState(false);

  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h5">Generate QR Code</Typography>
      <TextField
        label="Enter URL"
        variant="outlined"
        fullWidth
        sx={{ mt: 2, maxWidth: 400 }}
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <Button
        variant="contained"
        sx={{ mt: 2 }}
        onClick={() => setGenerated(true)}
        disabled={!url}
      >
        Generate QR Code
      </Button>

      {generated && (
        <Box sx={{ mt: 3, p: 2, border: "1px solid #ccc", display: "inline-block" }}>
          <QRCodeCanvas value={url} size={200} />
        </Box>
      )}
    </Box>
  );
}
