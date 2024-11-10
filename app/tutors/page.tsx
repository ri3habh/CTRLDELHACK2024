"use client";
import React, { useEffect, useState } from "react";
import {
  Grid,
  Modal,
  Box,
  Button,
  IconButton,
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
  Stack,
  Typography,
  Link,
} from "@mui/material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import AddIcon from "@mui/icons-material/Add";
import Avatar from "@mui/material/Avatar";

interface Course {
  id: string;
  name: string;
  description: string;
  rawText: string;
  embedding: string;
  created_at: string;
}

interface PopupModalProps {
  open: boolean;
  onClose: () => void;
}

const PopupModal: React.FC<PopupModalProps> = ({ open, onClose }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string>("");
  const [selectedName, setSelectedName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [data, setData] = useState<Course[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
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

    fetchData();
  }, []);

  const handleCourseChange = (courseId: string) => {
    setSelectedCourses((prev) => {
      const updatedCourses = prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId];

      console.log("Selected Courses:", updatedCourses);
      return updatedCourses;
    });
  };

  const handleSubmit = async () => {
    const tutorData = {
      photo: selectedPhoto,
      name: selectedName,
      description,
      kbList: selectedCourses, // renamed for clarity as per your request
    };

    try {
      const response = await fetch("/api/tutor/insert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tutorData),
      });

      if (response.ok) {
        console.log("Tutor inserted successfully:", tutorData);
        onClose();
      } else {
        console.error("Failed to insert tutor");
      }
    } catch (error) {
      console.error("Error inserting tutor:", error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
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
        <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
          {people.map((person, idx) => (
            <img
              key={idx}
              src={`/person${idx + 1}.png`}
              alt={`Profile of ${person.name}`}
              style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                cursor: "pointer",
                border:
                  selectedIndex === idx
                    ? "3px solid white"
                    : "3px solid transparent", // White border on select
                transition: "border 0.5s ease, transform 0.5s ease", // Smooth transition for border and scaling
                transform: selectedIndex === idx ? "scale(1.1)" : "scale(1)", // Slight scale effect on click
                boxShadow:
                  selectedIndex === idx
                    ? "0px 0px 12px rgba(255, 255, 255, 0.7)"
                    : "none", // Optional shadow for effect
              }}
              onClick={() => setSelectedIndex(idx)} // Set selected image index on click
            />
          ))}
        </Stack>

        <FormControl component="fieldset" sx={{ mt: 3, width: "100%" }}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={selectedName}
            onChange={(e) => setSelectedName(e.target.value)}
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
        </FormControl>

        <TextField
          label="Description"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          sx={{
            mt: 3,
            "& .MuiInputBase-root": { color: "white" },
            "& .MuiInputLabel-root": { color: "#bbb" },
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "#bbb",
            },
            "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
          }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Typography variant="h6" sx={{ color: "white", mt: 3 }}>
          Select Courses
        </Typography>
        <FormControl sx={{ width: "100%", mt: 2 }}>
          <Grid container spacing={2}>
            {data.map((course) => (
              <Grid item xs={12} sm={6} md={4} key={course.id}>
                {" "}
                {/* Responsive grid for 1 column on xs, 2 on sm, 3 on md */}
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedCourses.includes(course.id)}
                      onChange={() => handleCourseChange(course.id)}
                      sx={{
                        color: "white",
                        "&.Mui-checked": { color: "#1976d2" },
                      }}
                    />
                  }
                  label={course.name}
                  sx={{ color: "white" }}
                />
              </Grid>
            ))}
          </Grid>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit} // Call handleSubmit on click
          sx={{ mt: 3 }}
        >
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

const AddItemPopup: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <IconButton onClick={handleOpen}>
        <AddIcon sx={{ color: "white", fontSize: "2.5rem" }} />
      </IconButton>

      <PopupModal open={open} onClose={handleClose} />
    </>
  );
};

const people = [
  {
    name: "John Doe",
    profileImage: "/person13.png",
    description:
      "A passionate tutor with expertise in Mathematics and Physics.",
  },
  {
    name: "Jane Smith",
    profileImage: "/person12.png",
    description:
      "Experienced in Computer Science and Programming with a focus on problem-solving.",
  },
  {
    name: "Robert Leen",
    profileImage: "/person10.png",
    description:
      "A skilled tutor specializing in Chemistry and Biology, with a love for teaching students in a hands-on way.",
  },
  {
    name: "Alice Johnson",
    profileImage: "/person9.png",
    description:
      "Expert in Artificial Intelligence and Machine Learning, with years of experience in coding and research.",
  },
  {
    name: "Emily Davis",
    profileImage: "/person8.png",
    description:
      "A passionate educator with a background in Software Engineering and a focus on teaching practical coding skills.",
  },
];

const Tutor = ({
  id,
  image,
  tags,
  name,
  description,
}: {
  image: string;
  id: string;
  tags: string[];
  name: string;
  description: string;
}) => {
  const [data, setData] = useState<Course[]>([]);
  useEffect(() => {
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

    fetchData();
  }, []);

  const getCourseNames = () => {
    return tags
      .map((tag) => {
        const course = data.find((course) => course.id === tag);
        return course ? course.name : tag; // Default to ID if name not found
      })
      .filter((name) => name); // Filter out any undefined values
  };
  return (
    <Link href={`/tutor/${id}`} sx={{ textDecoration: "none" }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          padding: "1rem",
          borderRadius: "8px",
          background: "#242838", // Add repeated colors for smooth looping
          "&:hover": {
            transform: "scale(1.02)", // Slight scale effect on hover
          },
        }}
      >
        <Stack
          direction="row"
          gap="2rem"
          alignItems={"center"}
          marginLeft="1rem"
        >
          <img
            src={image} // Use the `image` prop here instead of `people[key].profileImage`
            alt={`${name}'s profile`}
            style={{ width: "120px", height: "120px", borderRadius: "50%" }}
          />
          <Stack>
            <Typography variant="h6" color="white">
              {name}
            </Typography>
            <Typography color="white">{description}</Typography>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={1} alignItems={"center"}>
          {getCourseNames().map((courseName, index) => (
            <Box
              key={index}
              sx={{
                background: "rgba(251, 194, 135, 0.16)",
                color: "#fcb232",
                textTransform: "uppercase",
                borderRadius: "10rem",
                paddingLeft: "1rem",
                paddingRight: "1rem",
                paddingTop: "0.5rem",
                paddingBottom: "0.5rem",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <Typography fontSize={{}}>{courseName}</Typography>
            </Box>
          ))}
        </Stack>

        <LocalPhoneIcon sx={{ fontSize: "3rem", marginRight: "2rem" }} />
      </Stack>
    </Link>
  );
};

const Tutors = () => {
  const [tutors, setTutors] = useState<any[]>([]);
  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await fetch("/api/tutor/get");
        const data = await response.json();
        setTutors(data.tutors); // Assume API returns { tutors: TutorData[] }
      } catch (error) {
        console.error("Error fetching tutors:", error);
      }
    };

    fetchTutors();
  }, []);
  return (
    <>
      <Typography
        variant="h2"
        fontWeight="400"
        paddingLeft="7rem"
        paddingTop="3rem"
        paddingBottom="2rem"
      >
        <div className="bg-gradient-to-br from-sky-300 to-indigo-500 bg-clip-text">
          <p className=" font-semibold text-transparent"> Select Your Tutor</p>
        </div>
      </Typography>

      {/* <Stack
        direction="row"
        justifyContent="flex-end"
        position="absolute"
        bottom="20px"
        right="20px"
        width="100%"
      >
        <AddItemPopup />
      </Stack> */}
      <IconButton
        color="primary"
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
        <AddItemPopup />
        {/* <AddIcon sx={{ fontSize: "2.5rem", color: "white" }} /> */}
      </IconButton>

      <Stack
        spacing={2}
        paddingLeft="7rem"
        paddingRight="7rem"
        paddingBottom="7rem"
      >
        {tutors.map((tutor, index) => (
          <Tutor
            key={index}
            id={tutor.id}
            tags={tutor.kbList}
            image={people[index].profileImage}
            name={tutor.name}
            description={tutor.description}
          />
        ))}
      </Stack>
    </>
  );
};

export default Tutors;
