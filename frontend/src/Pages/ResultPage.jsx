import { Button, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
export default function ResultPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { skills } = location.state || { skills: [] };
    const { result } = location.state;
    const { questions } = location.state;
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


                            <div style={{ marginTop: '20px' }}>
                                <Typography variant="h5" gutterBottom>
                                    Your Results:
                                </Typography>
                                {Object.keys(result).map((section) => (
                                    <Typography key={section} variant="h6" style={{ marginBottom: '10px' }}>
                                        {`${section}: ${result[section]} / ${questions[section].length}`}
                                    </Typography>
                                ))}


                                {/* resources button */}
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



                    </div>
                </div>
            </div>
        </>
    )
}