"use client";
import React from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

interface Course {
  name: string;
  description: string;
}

const Courses = () => {
  const courses: Course[] = [
    { name: "Math 101", description: "Introduction to Mathematics" },
    { name: "CS 101", description: "Introduction to Computer Science" },
    { name: "History 101", description: "World History Overview" },
    {
      name: "CS 241",
      description:
        "Fundamentals of Computer Science, focusing on data structures and algorithms",
    },
    {
      name: "Math 135",
      description:
        "Calculus for Engineers, covering multi-variable calculus and vector analysis",
    },
    {
      name: "CO 250",
      description:
        "Discrete Structures, focusing on discrete math concepts like logic and set theory",
    },
    {
      name: "CS 375",
      description:
        "Algorithms and Complexity, with a focus on algorithm design and complexity theory",
    },
    {
      name: "Math 237",
      description:
        "Linear Algebra, covering matrix operations, vector spaces, and eigenvalues",
    },
    {
      name: "PHYS 101",
      description:
        "Fundamentals of Physics, covering mechanics, thermodynamics, and waves",
    },
  ];

  return (
    <div>
      <div className="bg-gradient-to-br from-sky-300 to-indigo-500 bg-clip-text ml-4">
        <p className="text-5xl font-semibold text-transparent text-center pt-10">
          Courses
        </p>
      </div>
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: "black",
          paddingLeft: "10rem",
          paddingRight: "10rem",
          paddingTop: "5rem",
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
                  borderBottom: "2px solid white",
                  fontWeight: "bold",
                }}
              >
                Name
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontSize: "1.2rem",
                  borderBottom: "2px solid white",
                  fontWeight: "bold",
                }}
              >
                Description
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontSize: "1.2rem",
                  borderBottom: "2px solid white",
                  fontWeight: "bold",
                }}
              >
                Upload File
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:hover": {
                    backgroundColor: "#333",
                    cursor: "pointer",
                  },
                }}
              >
                <TableCell
                  sx={{ color: "white", borderBottom: "1px solid white" }}
                >
                  {course.name}
                </TableCell>
                <TableCell
                  sx={{ color: "white", borderBottom: "1px solid white" }}
                >
                  {course.description}
                </TableCell>
                <TableCell sx={{ borderBottom: "1px solid white" }}>
                  <Button
                    variant="contained"
                    component="label"
                    sx={{
                      backgroundColor: "#1976d2",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#1565c0",
                      },
                    }}
                  >
                    Preview
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Courses;
