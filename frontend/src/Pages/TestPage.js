import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation,useNavigate } from 'react-router-dom';
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
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const TestPage = () => {
    const location = useLocation();
    const { skills } = location.state || { skills: [] };
    const [questions, setQuestions] = useState(null);
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState(null);
    const navigate = useNavigate();

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
        setResult(categoryScores); // Store category-wise results
    };

    if (!questions) {
        return (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <CircularProgress />
                <Typography variant="h6" style={{ marginTop: '10px' }}>
                    Loading questions...
                </Typography>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <Typography variant="h4" gutterBottom>
                Skill Test
            </Typography>
            {Object.keys(questions).map((section) => (
                <Accordion key={section}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6">{section}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {questions[section].map((questionData, questionIndex) => (
                            <Card key={questionIndex} style={{ marginBottom: '15px' }}>
                                <CardContent>
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
                onClick={handleSubmit}
                style={{ marginTop: '20px' }}
            >
                Submit
            </Button>
            <Button
                variant="outlined"
                color="secondary"
                onClick={handleRedirectToResources}
                style={{ marginTop: '20px', marginLeft: '10px' }}
            >
                View Resources
            </Button>
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
                        onClick={handleRedirectToResources}
                        style={{ marginTop: '20px', marginLeft: '10px' }}
                    >
                        View Resources
                    </Button>
                </div>
                
            )}
        </div>
    );
};

export default TestPage;
