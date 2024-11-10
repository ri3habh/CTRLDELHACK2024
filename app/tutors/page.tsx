"use client";
import React, { useState } from "react";
import {
  Modal,
  Box,
  Button,
  IconButton,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack,
  Typography,
} from "@mui/material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import AddIcon from "@mui/icons-material/Add";
import Avatar from "@mui/material/Avatar";

interface PopupModalProps {
  open: boolean;
  onClose: (photo: string, name: string, description: string) => void;
}

const PopupModal: React.FC<PopupModalProps> = ({ open, onClose }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string>("");
  const [selectedName, setSelectedName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const names: string[] = [
    "John Doe",
    "Jane Smith",
    "Robert Leen",
    "Alice Johnson",
    "Emily Davis",
  ];
  const photos: string[] = [
    "/person1.png",
    "/person2.png",
    "/person3.png",
    "/person4.png",
    "/person5.png",
  ]; // Replace with actual paths

  return (
    <Modal
      open={open}
      onClose={() => onClose(selectedPhoto, selectedName, description)}
    >
      <Box
        sx={{
          width: 400,
          bgcolor: "#333",
          color: "white", // Set default text color to white
          p: 4,
          m: "auto",
          mt: "10%",
          borderRadius: 2,
        }}
      >
        <h3 style={{ color: "white" }}>Select Options</h3>

        <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
          {photos.map((photo, index) => (
            <Avatar
              key={index}
              src={photo}
              onClick={() => setSelectedPhoto(photo)}
              sx={{
                width: 60,
                height: 60,
                cursor: "pointer",
                border: selectedPhoto === photo ? "2px solid blue" : "none",
                transition: "transform 0.2s, border-color 0.2s",
                "&:hover": {
                  transform: "scale(1.1)",
                  border: "2px solid lightblue",
                },
              }}
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
            "& .MuiInputBase-root": { color: "white" }, // Input text color
            "& .MuiInputLabel-root": { color: "#bbb" }, // Label color
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

        <Button
          variant="contained"
          color="primary"
          onClick={() => onClose(selectedPhoto, selectedName, description)}
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
  const handleClose = (photo: string, name: string, description: string) => {
    setOpen(false);
    console.log("Selected Photo:", photo);
    console.log("Selected Name:", name);
    console.log("Description:", description);
    // Further data handling (e.g., saving to a database) can go here
  };

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
  return (
    <Stack direction="row" justifyContent={"space-between"} alignItems="center">
      <Stack direction="row" gap="2rem">
        <img
          src={image}
          alt={`${name}'s profile`}
          style={{ width: "120px", borderRadius: "40%" }}
        />
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

const Tutors = () => {
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
        {/* <Button>
          <AddIcon sx={{ fontSize: "2.5rem", color: "#1976d2" }} />
        </Button> */}
        <AddItemPopup />
      </Stack>

      <Stack spacing={2} padding="5rem">
        {people.map((person, index) => (
          <Tutor
            key={index}
            image={person.profileImage}
            name={person.name}
            description={person.description}
          />
        ))}
      </Stack>
    </>
  );
};

export default Tutors;
