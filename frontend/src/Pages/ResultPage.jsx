import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export default function ResultPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { skills } = location.state || { skills: [] };
    const { result } = location.state;
    const { questions } = location.state;
    console.log(result)
    console.log("---------------------------------------------------------------------------------------------------------")
    const handleRedirectToResources = () => {
        navigate('/resources', { state: { skills } });
    };
    return (
        <>
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
                        {/* Every content here */}


                        <div style={{ padding: "52px" }}>
                            <Typography variant="h5" gutterBottom sx={{ marginBottom: "40px" }}>
                                Your Results:
                            </Typography>
                            <Box sx={{
                                gap: "52px", display: "flex", flexWrap: "wrap"
                            }}>
                                {Object.keys(result).map((section) => (
                                    <Box sx={{
                                        position: 'relative',
                                        display: 'inline-flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        // Box style 
                                        border: "2px solid #808080",
                                        padding: "20px",
                                        borderRadius: "12px",
                                        width:"18.2%",
                                        paddingTop:"30px",
                                        paddingBottom:"30px"
                                    }}>
                                        <Typography key={section} variant="h6" style={{ marginBottom: '10px' }}>
                                            {`${section}: ${result[section]} / ${questions[section].length}`}
                                        </Typography>
                                        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                                            {/* Background black circle */}
                                            <CircularProgress
                                                variant="determinate"
                                                value={100}
                                                size={150}
                                                thickness={5}
                                                sx={{
                                                    color: '#8080802e',
                                                    // color: '#000',
                                                    position: 'absolute',
                                                }}
                                            />

                                            <CircularProgress
                                                variant="determinate"
                                                value={(result[section] / questions[section].length) * 100}
                                                size={150}
                                                thickness={5}
                                                sx={{
                                                    color: '#BD94F0',
                                                    '& .MuiCircularProgress-circle': {
                                                        strokeLinecap: 'round', // 👈 this makes the end rounded
                                                    }
                                                }}
                                            />

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
                                                    {`${result[section]} / ${questions[section].length}`}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>

                                ))}
                            </Box>
                            <div style={{display:"flex", justifyContent:'end'}}>
                                {/* resources button */}
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    sx={{
                                        marginTop: "40px",
                                        borderRadius: "12px",
                                        color: "#ff5834",
                                        borderColor: "#ff5834",
                                        '&:hover': {
                                            backgroundColor: '#ff5834',
                                            color: '#fff',
                                            borderColor: '#ff5834',
                                        },
                                    }}
                                    onClick={handleRedirectToResources}
                                >
                                    View Resources
                                </Button>
                            </div>
                        </div>



                    </div>
                </div>
            </div >
        </>
    )
}