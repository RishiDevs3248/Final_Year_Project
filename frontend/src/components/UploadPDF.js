import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, CircularProgress, List, ListItem, Paper, Grid } from "@mui/material";
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

    const handleUpload = async () => {
        if (!file) {
            alert("Please upload a file.");
            return;
        }

        if (loading) return; // Prevent multiple calls during loading

        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("http://localhost:8000/skills/extract", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log(response.data);
            setSkills(response.data.skills);
        } catch (error) {
            console.error("Error uploading file:", error);
        } finally {
            setLoading(false);
        }
    };


    const handleGoToTestPage = () => {
        if (skills.length === 0) {
            alert("Please extract skills first.");
            return;
        }
        navigate("/test", { state: { skills } });
    };

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>
                Upload PDF to Extract Skills
            </Typography>
            <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={12} md={6}>
                    <Dropzone
                        isDragging={isDragging}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => document.getElementById("fileInput").click()}
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
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 3 }}
                        onClick={handleUpload}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : "Upload and Extract Skills"}
                    </Button>
                </Grid>
            </Grid>
            {skills.length > 0 && (
                <Box sx={{ mt: 4 }}>
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
            <Button
                variant="outlined"
                color="secondary"
                sx={{ mt: 3 }}
                onClick={handleGoToTestPage}
                disabled={skills.length === 0}
            >
                Go to Test Page
            </Button>
        </Box>
    );
};

export default UploadPDF;
