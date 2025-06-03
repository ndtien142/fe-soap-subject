// src/components/Html5QrcodePlugin.jsx
import React, { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const Html5QrcodePlugin = ({ onScan }) => {
  useEffect(() => {
    // Khởi tạo scanner
    const scanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: 250,
    });

    // Hàm xử lý khi quét thành công
    const onScanSuccess = (decodedText) => {
      onScan(decodedText); // Gửi mã serial về component cha
      scanner.clear(); // Dừng scanner sau khi quét thành công
    };

    // Hàm xử lý lỗi
    const onScanFailure = (error) => {
      console.warn(`QR Code scan error: ${error}`);
    };

    // Bắt đầu quét
    scanner.render(onScanSuccess, onScanFailure);

    // Cleanup khi component unmount
    return () => {
      scanner.clear();
    };
  }, [onScan]);

  return <div id="reader" style={{ width: "100%", maxWidth: "500px", margin: "0 auto" }} />;
};

export default Html5QrcodePlugin;