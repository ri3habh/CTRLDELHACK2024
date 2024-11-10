"use client";
import React, { useEffect, useState } from "react";
import {
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
        <h3 style={{ color: "white" }}>Add New Tutor</h3>

        <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
          <Avatar src={selectedPhoto} sx={{ width: 60, height: 60 }} />
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
          {data.map((course) => (
            <FormControlLabel
              key={course.id}
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
          ))}
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
    <div>
      <IconButton color="primary" onClick={handleOpen}>
        <AddIcon />
      </IconButton>

      <PopupModal open={open} onClose={handleClose} />
    </div>
  );
};

const people = [
  {
    name: "John Doe",
    profileImage: "/person1.png",
    description:
      "A passionate tutor with expertise in Mathematics and Physics.",
  },
  {
    name: "Jane Smith",
    profileImage: "/person2.png",
    description:
      "Experienced in Computer Science and Programming with a focus on problem-solving.",
  },
  {
    name: "Robert Leen",
    profileImage: "/person3.png",
    description:
      "A skilled tutor specializing in Chemistry and Biology, with a love for teaching students in a hands-on way.",
  },
  {
    name: "Alice Johnson",
    profileImage: "/person4.png",
    description:
      "Expert in Artificial Intelligence and Machine Learning, with years of experience in coding and research.",
  },
  {
    name: "Emily Davis",
    profileImage: "/person5.png",
    description:
      "A passionate educator with a background in Software Engineering and a focus on teaching practical coding skills.",
  },
];

const Tutor = ({
  image,
  name,
  description,
}: {
  image: string;
  name: string;
  description: string;
}) => {
  const backgroundColor = generateDistinctColorFromName(name);
  return (
    <Stack direction="row" justifyContent={"space-between"} alignItems="center">
      <Stack direction="row" gap="2rem">
        <Avatar
          sx={{
            width: 120,
            height: 120,
            backgroundColor: backgroundColor, // Set background color
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {!image && name.charAt(0).toUpperCase()}{" "}
          {/* Show first letter if no image */}
        </Avatar>
        <Stack>
          <Typography variant="h6">{name}</Typography>
          <Typography>{description}</Typography>
        </Stack>
      </Stack>
      <Button>
        <LocalPhoneIcon sx={{ fontSize: "3rem" }} />
      </Button>
    </Stack>
  );
};

// Function to generate more distinct colors based on the first letter of the name
const generateDistinctColorFromName = (name: string) => {
  const firstLetter = name.charAt(0).toUpperCase();
  const charCode = firstLetter.charCodeAt(0);
  const hue = (charCode * 30) % 360; // Spread hue values across the color wheel more distinctly
  return `hsl(${hue}, 80%, 50%)`; // Vibrant colors with increased saturation
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
      <div className="bg-gradient-to-br from-sky-300 to-indigo-500 bg-clip-text ml-4">
        <p className="text-5xl font-semibold text-transparent text-center pt-10">
          Tutors
        </p>
      </div>
      <Stack
        direction="row"
        justifyContent="flex-end"
        position="absolute"
        bottom="20px"
        right="20px"
        width="100%"
      >
        <AddItemPopup />
      </Stack>

      <Stack spacing={2} padding="5rem">
        {tutors.map((tutor, index) => (
          <Tutor
            key={index}
            image={tutor.profileImage}
            name={tutor.name}
            description={tutor.description}
          />
        ))}
      </Stack>
    </>
  );
};

export default Tutors;
