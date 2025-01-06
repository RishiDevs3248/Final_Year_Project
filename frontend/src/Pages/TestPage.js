import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
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

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.post('http://127.0.0.1:8000/aptitude/generate',
                    { skills },
                    { headers: { 'Content-Type': 'application/json' } }
                );
                setQuestions(response.data.skill_questions); // Assuming API returns skill_questions
            } catch (error) {
                console.error("Error generating questions:", error);
            }
        };
        if (skills.length > 0) {
            fetchQuestions();
        }
    }, [skills]);

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
        let score = 0;
        Object.keys(answers).forEach((section) => {
            Object.keys(answers[section]).forEach((questionIndex) => {
                if (answers[section][questionIndex] === questions[section][questionIndex].answer) {
                    score++;
                }
            });
        });
        setResult(score);
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
            {Object.keys(questions).map((section, sectionIndex) => (
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
            {result !== null && (
                <Typography
                    variant="h5"
                    style={{ marginTop: '20px', textAlign: 'center', color: 'green' }}
                >
                    Your score: {result}
                </Typography>
            )}
        </div>
    );
};

export default TestPage;
