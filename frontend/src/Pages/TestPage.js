import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Card,
    CardContent,
    Typography,
    Radio,
    RadioGroup,
    FormControlLabel,
    Button,
    CircularProgress,
    Skeleton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const TestPage = () => {
    const location = useLocation();
    const { skills } = location.state || { skills: [] };
    const [questions, setQuestions] = useState(null);
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState(null);
    const navigate = useNavigate();

    // console.log("-------------------------------------------------------------------------------------------")
    // console.log(skills)
    // console.log("-------------------------------------------------------------------------------------------")
    // console.log(skills.length)
    // console.log("-------------------------------------------------------------------------------------------")
    // Helper function to sanitize options
    const sanitizeOptions = (options) => {
        return options
            .map((option) => option.trim().replace(/\s+/g, ' ')) // Trim and replace extra spaces
            .filter((option) => option !== ''); // Remove empty options
    };


    useEffect(() => {
        const fetchQuestions = async () => {
            if (skills.length === 0) return; // Ensure skills array is not empty

            try {
                const response = await axios.post(
                    'http://127.0.0.1:8000/aptitude/generate',
                    { skills },
                    { headers: { 'Content-Type': 'application/json' } }
                );

                // Sanitize the options for each question
                const sanitizedQuestions = {};
                Object.keys(response.data.skill_questions).forEach((section) => {
                    sanitizedQuestions[section] = response.data.skill_questions[section].map(
                        (questionData) => ({
                            ...questionData,
                            options: sanitizeOptions(questionData.options), // Sanitize options
                        })
                    );
                });

                setQuestions(sanitizedQuestions); // Update state with sanitized questions
            } catch (error) {
                console.error('Error generating questions:', error);
            }
        };

        if (skills.length > 0 && !questions) {
            fetchQuestions();
        }
    }, [skills, questions]);

    // Handle redirection to the Resources page
    const handleRedirectToResources = () => {
        navigate('/resources', { state: { skills } });
    };

    const handleAnswerChange = (section, questionIndex, answer) => {
        setAnswers((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [questionIndex]: answer,
            },
        }));
    };

    const handleSubmit = () => {
        console.log("called inside handle submit")
        const categoryScores = {};
        Object.keys(questions).forEach((section) => {
            let score = 0;
            questions[section].forEach((questionData, questionIndex) => {
                if (answers[section]?.[questionIndex] === questionData.answer) {
                    score++;
                }
            });
            categoryScores[section] = score; // Store score for each section
        });
        setResult(categoryScores);  // Store category-wise results
        return 0 ;
    };



    if (!questions) {   // Loading on hold 
        return (
            <div style={{
                backgroundColor: "#fff", // 1st white 
                minHeight: "100vh",
                minWidth: "100vw",
                height: "100%",
                padding: "15px",
                boxSizing: "border-box"
            }}>
                <div style={{
                    backgroundColor: "#BD94F0",  //2nd purple 
                    minHeight: "calc(100vh - 30px)",
                    minWidth: "calc(100vw - 30px)",
                    padding: "75px",
                    borderRadius: "20px",
                    boxSizing: "border-box"
                }}>
                    <div style={{
                        backgroundColor: "#fff",
                        width: "100%",
                        minHeight: "calc(100vh - 185px)",
                        borderRadius: "20px",
                        position: "relative",
                        overflow: "auto",
                        boxSizing: "border-box",
                        display: "flex",
                        flexDirection: "column"
                    }}>
                        <div
                            style={{
                                textAlign: 'center',
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                flex: 1, // This is key to fill remaining height!
                            }}
                        >
                            <div style={{ backgroundColor: "gray", padding: "20px", borderRadius: "12px", width: "80%" }}>
                                <Skeleton variant="text" width={200} height={70} />
                                <Skeleton variant="rectangular" height={100} />
                                <Skeleton variant="circular" width={40} height={40} />
                                <Typography variant="h6" style={{ marginTop: '10px' }}>
                                    Loading questions...
                                </Typography>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }

    function DelayedSubmit({ skills, handleSubmit }) {
        const initialTime = useRef(skills.length * 1); // total seconds once
        const [timeLeft, setTimeLeft] = useState(initialTime.current);
    
        useEffect(() => {
            const timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev == 0) {
                        clearInterval(timer);
                        handleSubmit()
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
    
            return () => clearInterval(timer);
        }, [handleSubmit]);
    
        const formatTime = (seconds) => {
            const mins = Math.floor(seconds / 60);
            const secs = seconds % 60;
            return `${mins.toString().padStart(2, "0")}:${secs
                .toString()
                .padStart(2, "0")}`;
        };
    
        return (
            <div>
                <h3>Auto-submitting in: {formatTime(timeLeft)}</h3>
            </div>
        );
    }



    // if (questions) {
    //     console.log(2 * skills.length + " minutes for test")
    //     // setTimeout(handleSubmit, 120000 * skills.length);
    //     setTimeout(handleSubmit, 10000 * skills.length);
    // }
    return (

        <div style={{
            backgroundColor: "#fff", // 1st white 
            minHeight: "100vh",
            minWidth: "100vw",
            padding: "15px",
            boxSizing: "border-box"
        }}>
            <div style={{
                backgroundColor: "#BD94F0",  //2nd purple 
                minHeight: "calc(100vh - 30px)",
                minWidth: "calc(100vw - 30px)",
                padding: "75px",
                borderRadius: "20px",
                boxSizing: "border-box"
            }}>
                <div style={{
                    backgroundColor: "#fff", // 3rd white 
                    width: "100%",
                    minHeight: "calc(100vh - 185px)",
                    borderRadius: "20px",
                    position: "relative",
                    overflow: "auto",
                    boxSizing: "border-box"
                }}>
                    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
                        <div>
                            <DelayedSubmit skills={skills} handleSubmit={handleSubmit} />
                        </div>
                        <Typography variant="h4" gutterBottom>
                            Skill Test
                        </Typography>
                        {Object.keys(questions).map((section) => (
                            // Whole body Ç
                            <Accordion key={section} style={{
                                border: "1px solid black",
                                borderRadius: "12px",
                                marginBottom: "12px",
                                boxShadow: "none",
                                '&::before': {
                                    display: 'none', // or backgroundColor: '#ff5834' if you still want to show it
                                    backgroundColor: '#ff5834',
                                }
                            }}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    {/* Your main topic name */}
                                    <Typography variant="h6" style={{ color: "#000" }} >{section}</Typography>
                                </AccordionSummary>
                                <AccordionDetails >
                                    {questions[section].map((questionData, questionIndex) => (
                                        <Card key={questionIndex} style={{
                                            marginBottom: '15px',
                                            boxShadow: "none",
                                            border: "0.8px solid black",
                                            borderRadius: "12px",
                                        }}>
                                            {/* Each Que Card */}
                                            <CardContent >
                                                <Typography variant="body1" gutterBottom>
                                                    {`${questionIndex + 1}. ${questionData.question}`}
                                                </Typography>
                                                <RadioGroup
                                                    value={answers[section]?.[questionIndex] || ''}
                                                    onChange={(e) =>
                                                        handleAnswerChange(section, questionIndex, e.target.value)
                                                    }
                                                >
                                                    {questionData.options.map((option, optionIndex) => (
                                                        <FormControlLabel
                                                            key={optionIndex}
                                                            value={option}
                                                            control={<Radio />}
                                                            label={option}
                                                        />
                                                    ))}
                                                </RadioGroup>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </AccordionDetails>
                            </Accordion>
                        ))}
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
                                }
                            }}
                            disabled={false}
                            onClick={handleSubmit}
                            style={{ marginTop: '20px' }}
                        >
                            Submit
                        </Button>
                        {/* <Button
                            variant="outlined"
                            color="secondary"
                            sx={{
                                mt: 3,
                                borderRadius: "12px"
                            }}
                            onClick={handleRedirectToResources}
                            style={{ marginTop: '20px', marginLeft: '10px' }}
                        >
                            View Resources
                        </Button> */}
                        {result && (
                            <div style={{ marginTop: '20px' }}>
                                <Typography variant="h5" gutterBottom>
                                    Your Results:
                                </Typography>
                                {Object.keys(result).map((section) => (
                                    <Typography key={section} variant="h6" style={{ marginBottom: '10px' }}>
                                        {`${section}: ${result[section]} / ${questions[section].length}`}
                                    </Typography>
                                ))}
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    sx={{
                                        mt: 3,
                                        borderRadius: "12px",
                                    }}
                                    onClick={handleRedirectToResources}
                                    style={{ marginTop: '20px' }}
                                >
                                    View Resources
                                </Button>
                            </div>

                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestPage;
