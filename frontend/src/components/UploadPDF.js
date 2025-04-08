import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    Typography,
    CircularProgress,
    List,
    ListItem,
    Paper,
    Grid,
    TextField,
} from "@mui/material";
import { styled } from "@mui/system";

const Dropzone = styled(Paper)(({ isDragging }) => ({
    border: `2px dashed ${isDragging ? "#1976d2" : "#ccc"}`,
    padding: "20px",
    textAlign: "center",
    backgroundColor: isDragging ? "#f5f5f5" : "#fff",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
}));

const UploadPDF = () => {
    const [file, setFile] = useState(null);
    const [skills, setSkills] = useState([]);
    const [jobDescription, setJobDescription] = useState("");
    const [skillTestTime, setskillTestTime] = useState(5);
    const [atsScore, setAtsScore] = useState(null);
    const [predictedCategory, setPredictedCategory] = useState(null); // State for predicted category
    const [loading, setLoading] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setFile(e.dataTransfer.files[0]);
        setIsDragging(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };


    // const handleUpload = async () => {
    //     if (!file) {
    //         alert("Please upload a file.");
    //         return;
    //     }

    //     setLoading(true);
    //     const formData = new FormData();
    //     formData.append("file", file);

    //     try {
    //         const response = await axios.post("http://localhost:8000/skills/extract", formData, {
    //             headers: { "Content-Type": "multipart/form-data" },
    //         });
    //         setSkills(response.data.skills);
    //     } catch (error) {
    //         console.error("Error extracting skills:", error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const handleAtsScore = async () => {
        if (!file || !jobDescription.trim()) {
            alert("Please upload a file and enter a job description.");
            return;
        }

        setLoading(true);

        try {
            // Step 1: Extract skills from the uploaded file
            const skillsFormData = new FormData();
            skillsFormData.append("file", file);

            const skillsResponse = await axios.post("http://localhost:8000/skills/extract", skillsFormData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            // Update extracted skills in the state
            const extractedSkills = skillsResponse.data.skills;
            setSkills(extractedSkills);

            if (!extractedSkills || extractedSkills.length === 0) {
                alert("No skills were extracted from the resume.");
                return;
            }

            // Step 2: Calculate ATS score using the extracted skills
            const atsFormData = new FormData();
            atsFormData.append("file", file);

            const atsResponse = await axios.post("http://localhost:8000/ats/score", atsFormData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "job-description": jobDescription, // Pass job description as a header
                },
            });

            // Update ATS score in the state
            setAtsScore(atsResponse.data.ats_score);

            // Step 3: Call the prediction model API with extracted skills
            const predictionResponse = await axios.post("http://localhost:8000/predict", {
                skills: extractedSkills, // Send the extracted skills to the prediction API
            });

            // Set the predicted category state
            setPredictedCategory(predictionResponse.data.predicted_label);
        } catch (error) {
            console.error("Error during ATS score calculation:", error);
            alert("An error occurred while processing your request.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoToTestPage = () => {
        if (skills.length === 0) {
            alert("Please extract skills first.");
            return;
        }
        navigate("/test", { state: { skills, skillTestTime } });
    };

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>
                Upload PDF
            </Typography>
            <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={12} md={6}>
                    <Dropzone
                        isDragging={isDragging}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => document.getElementById("fileInput").click()}
                        sx={{
                            borderRadius: "12px"
                        }}
                    >
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            Drag and drop a PDF file here, or click to select a file
                        </Typography>
                        {file && <Typography variant="body2">Selected file: {file.name}</Typography>}
                        <input
                            id="fileInput"
                            type="file"
                            accept=".pdf"
                            onChange={handleFileChange}
                            style={{ display: "none" }}
                        />
                    </Dropzone>
                    <TextField
                        fullWidth
                        label="Job Description"
                        variant="outlined"
                        multiline
                        rows={4}
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        sx={{
                            mt: 3,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '12px'
                            }
                        }}
                    />
                    {/* Time For each Skills */}
                    <TextField
                        fullWidth
                        label="Time For Each Skill (in minutes)"
                        variant="outlined"
                        type="number" // 👈 this ensures only numbers can be typed
                        value={skillTestTime}
                        onChange={(e) => setskillTestTime(e.target.value)}
                        sx={{
                            mt: 3,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '12px'
                            }
                        }}
                    />



                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Button
                            variant="contained"
                            color="primary"
                            // fullWidth
                            sx={{
                                mt: 3,
                                backgroundColor: "#ff5834",
                                borderRadius: "12px",
                                '&:hover': {
                                    backgroundColor: "#e14c2d" // slightly darker shade for hover effect
                                },
                                paddingTop: "7px",
                                paddingBottom: "7px",
                            }}
                            onClick={handleAtsScore}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : "Analyze Resume"}
                        </Button>
                    </div>
                </Grid>
            </Grid>


            {/* three Box flex design --------------------------------------------------------------------------------- */}
            <Box sx={{
                display:"flex",
                justifyContent: "space-around"
            }}>
                {atsScore !== null && (
                    // <Box sx={{ position: 'relative', display: 'inline-flex', flexDirection: 'column', alignItems: 'center', mt: 2 ,backgroundColor:"red" , }}>
                    //     <Typography variant="h6" sx={{ mt: 1 }}>
                    //         ATS Score
                    //     </Typography>
                    //     <CircularProgress
                    //         variant="determinate"
                    //         value={atsScore}
                    //         size={150} // 👈 bigger size
                    //         thickness={5}
                    //         sx={{
                    //             color: '#BD94F0', // 👈 custom color
                    //         }}
                    //     />
                    //     <Box
                    //         sx={{
                    //             top: 0,
                    //             left: 0,
                    //             bottom: 0,
                    //             right: 0,
                    //             paddingTop: "40px",
                    //             position: 'absolute',
                    //             display: 'flex',
                    //             alignItems: 'center',
                    //             justifyContent: 'center',
                    //         }}
                    //     >
                    //         <Typography variant="h5" component="div" color="text.primary">
                    //             {`${atsScore}%`}
                    //         </Typography>
                    //     </Box>
                    // </Box>

                    <Box
                        sx={{
                            position: 'relative',
                            display: 'inline-flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            mt: 2,
                            // Box style 
                            border: "2px solid #808080",
                            padding: "20px",
                            borderRadius: "12px",
                        }}
                    >
                        <Typography variant="h6" sx={{ mt: 1 }}>
                            ATS Score
                        </Typography>

                        {/* Container for the Circular Progress */}
                        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                            {/* Background black circle */}
                            <CircularProgress
                                variant="determinate"
                                value={100}
                                size={150}
                                thickness={5}
                                sx={{
                                    color: '#808080',
                                    // color: '#000',
                                    position: 'absolute',
                                }}
                            />

                            {/* Foreground purple progress */}
                            <CircularProgress
                                variant="determinate"
                                value={atsScore}
                                size={150}
                                thickness={5}
                                sx={{
                                    color: '#BD94F0',
                                    '& .MuiCircularProgress-circle': {
                                        strokeLinecap: 'round', // 👈 this makes the end rounded
                                    }
                                }}
                            />

                            {/* Percentage text inside circle */}
                            <Box
                                sx={{
                                    top: 0,
                                    left: 0,
                                    bottom: 0,
                                    right: 0,
                                    position: 'absolute',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Typography variant="h5" component="div" color="text.primary">
                                    {`${atsScore}%`}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>


                    // <Box sx={{ mt: 4 }}>
                    //     <Typography variant="h5">
                    //         ATS Score: <strong>{atsScore}%</strong>
                    //         <CircularProgress variant="determinate" value={atsScore} />
                    //     </Typography>
                    // </Box>
                )}
                {skills.length > 0 && (
                    <Box sx={{
                        mt: 4,
                        // Box style 
                        border: "2px solid #808080",
                        padding: "20px",
                        borderRadius: "12px",
                    }}>
                        <Typography variant="h5" gutterBottom>
                            Extracted Skills:
                        </Typography>
                        <List>
                            {skills.map((skill, index) => (
                                <ListItem key={index} sx={{ p: 0, ml: 2 }}>
                                    - {skill}
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                )}
                {predictedCategory && (
                    <Box sx={{
                        mt: 4,
                        // Box style 
                        border: "2px solid #808080",
                        padding: "20px",
                        borderRadius: "12px",
                    }}>
                        <Typography variant="h5" gutterBottom>
                            Predicted Category:
                        </Typography>
                        <Typography variant="body1">{predictedCategory}</Typography>
                    </Box>
                )}
            </Box>
            <Button
                variant="outlined"
                color="secondary"
                sx={{
                    mt: 3,
                    borderRadius: "12px"
                }}
                onClick={handleGoToTestPage}
                disabled={skills.length === 0}
            >
                Go to Test Page
            </Button>
        </Box>
    );
};

export default UploadPDF;
