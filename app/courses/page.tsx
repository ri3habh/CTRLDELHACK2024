"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Modal,
  Box,
  TextField,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import pdfToText from "react-pdftotext";
interface Course {
  name: string;
  description: string;
  rawText: string;
  embedding: string;
  created_at: string;
}

const Courses = () => {
  const [data, setData] = useState<Course[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRawText, setSelectedRawText] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      if (!file) return;
      const text = await pdfToText(file);
      const response = await fetch("/api/course/insert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newName,
          description: newDescription,
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

  const fetchData = async () => {
    try {
      const response = await fetch("/api/course/get", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const dataEntry = await response.json();
      setData(dataEntry.courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handlePreviewClick = (rawText: string) => {
    setSelectedRawText(rawText);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedRawText(null);
  };

  const handleAddClick = () => setModalOpen(true);

  const handleModalClose = () => {
    console.log("New Course Name:", newName);
    console.log("New Course Description:", newDescription);
    setModalOpen(false);
    setNewName("");
    setNewDescription("");
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Typography
        variant="h2"
        fontWeight="400"
        paddingLeft="7rem"
        paddingTop="3rem"
        paddingBottom="2rem"
      >
        <div className="bg-gradient-to-br from-sky-300 to-indigo-500 bg-clip-text">
          <p className=" font-semibold text-transparent"> Upload Your Notes</p>
        </div>
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: "black",
          paddingLeft: "7rem",
          paddingRight: "7rem",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          borderRadius: "8px",
        }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  color: "white",
                  fontSize: "1.2rem",
                  backgroundColor: "#333",
                  borderBottom: "0.1px solid black", // Black border below header
                  fontWeight: "bold",
                }}
              >
                Name
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontSize: "1.2rem",
                  backgroundColor: "#333",
                  borderBottom: "0.1px solid black", // Black border below header
                  fontWeight: "bold",
                }}
              >
                Description
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontSize: "1.2rem",
                  backgroundColor: "#333",
                  borderBottom: "0.1px solid black", // Black border below header
                  fontWeight: "bold",
                }}
              >
                Upload File
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((course, index) => (
              <TableRow
                key={index}
                sx={{
                  backgroundColor: "#242838",
                  borderRadius: "8px",

                  borderBottom: "1px solid black", // Black border between rows
                  "& > *": {
                    color: "white",
                  },
                }}
              >
                <TableCell
                  sx={{
                    color: "white",
                    fontSize: "1.2rem",
                    // Distinct background for the first column
                    borderBottom: "1px solid black", // Black border for cells in this column
                  }}
                >
                  {course.name}
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    fontSize: "1.1rem",
                    borderBottom: "1px solid black", // Black border between rows
                  }}
                >
                  {course.description}
                </TableCell>
                <TableCell
                  sx={{
                    borderBottom: "1px solid black", // Black border between rows
                  }}
                >
                  <Button
                    variant="contained"
                    component="label"
                    sx={{
                      fontSize: "1.2rem",
                      textTransform: "none",
                      backgroundColor: "#3a4b6b",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#1565c0",
                      },
                    }}
                    onClick={() => handlePreviewClick(course.rawText)}
                  >
                    Preview
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={handleCloseDialog} fullScreen>
        <DialogTitle sx={{ backgroundColor: "#1976d2", color: "white" }}>
          Course Raw Text
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleCloseDialog}
            aria-label="close"
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{ padding: "2rem", backgroundColor: "#333", color: "white" }}
        >
          <pre>{selectedRawText}</pre>
        </DialogContent>
      </Dialog>

      <IconButton
        color="primary"
        onClick={handleAddClick}
        sx={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#1976d2",
          "&:hover": {
            backgroundColor: "#1565c0",
          },
        }}
      >
        <AddIcon sx={{ fontSize: "2.5rem", color: "white" }} />
      </IconButton>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            width: 400,
            bgcolor: "#333",
            color: "white",
            p: 4,
            m: "auto",
            mt: "10%",
            borderRadius: 2,
          }}
        >
          <h3 style={{ color: "white" }}>Add New Course</h3>
          <Stack spacing={2}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              sx={{
                "& .MuiInputBase-root": { color: "white" },
                "& .MuiInputLabel-root": { color: "#bbb" },
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#bbb",
                },
                "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "white",
                  },
              }}
            />
            <TextField
              label="Description"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              sx={{
                "& .MuiInputBase-root": { color: "white" },
                "& .MuiInputLabel-root": { color: "#bbb" },
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#bbb",
                },
                "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "white",
                  },
              }}
            />
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpload}
              sx={{ mt: 2 }}
            >
              Submit
            </Button>
            {uploadStatus && <p>{uploadStatus}</p>}
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

export default Courses;
