"use client";

import { error } from "console";
import React, { useState } from "react";
import pdfToText from "react-pdftotext";

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [courseName, setCourseName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0]);
  };

  // Extract text from the PDF file using react-pdftotext
  //   const extractTextFromPDF = async (file: File) => {
  //     try {
  //       pdfToText(file).then((text) => setRawText(text)).catch(error => console.error("Failed to extract text from PDF:", error));
  //     } catch (error) {
  //       console.error('Failed to extract text from PDF:', error);
  //       setRawText('');
  //     }
  //   };

  const handleUpload = async () => {
    try {
      if (!file) return;
      const text = await pdfToText(file);
      const response = await fetch("/api/course/insert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: courseName,
          description: description,
          rawText: text,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setUploadStatus(`Upload successful: ${data.id}`);
      } else {
        const errorData = await response.json();
        setUploadStatus(`Upload failed: ${errorData.error}`);
      }
    } catch (error) {
      setUploadStatus(`Upload failed!!!!`);
    }
  };

  // Upload file content to the backend

  return (
    <div>
      <h1>Upload Course</h1>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <input
        type="text"
        placeholder="Course Name"
        value={courseName}
        onChange={(e) => setCourseName(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleUpload}>Upload</button>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
}
