import { useNavigate } from "react-router-dom";
import {
    Button,
} from "@mui/material";

export default function Landingpage() {
    const navigate = useNavigate();
    const handleGoToUploadPage = () => {
        navigate("/upload");
    };
    return (
        <div style={{ backgroundColor: "#fff", height: "calc(100vh - 30px)", width: "calc(100vw - 30px)", padding: "15px" }}>
            <div style={{ backgroundColor: "#BD94F0", height: "calc(100% - 150px)", width: "calc(100% - 150px)", padding: "75px", borderRadius: "20px" }}>
                <div style={{ backgroundColor: "#fff", height: "100%", width: "100%", borderRadius: "20px", position: "relative" }}>
                    <div style={{ padding: "52px" , display:"flex", flexDirection:"row"}}>
                        <div style={{ width: "59%" }}>
                            {/* <button style={{ position: "absolute", bottom: "0px" }} onClick={() => navigate("/upload")}>Get Started</button> */}
                            <div className="Montserrat" style={{ fontSize: "100px", display: "flex", flexDirection: "row", fontWeight: "bold" }}>
                                <div style={{ color: "#ff5834" }}>
                                    Smart
                                </div>
                                Hire
                            </div>
                            <div className="Montserrat" style={{ marginTop: "0px", color: "#808080", fontSize: "30px", paddingLeft: "10px" }}>
                                Smarter hiring, personalized assessment
                            </div>

                            <div>
                                <div className="Lato" style={{ marginTop: "50px", color: "#000", paddingLeft: "10px", fontSize: "20px" }}>
                                    Welcome to SmartHire,
                                </div>
                                <div className="Lato" style={{ color: "#000", paddingLeft: "10px", fontSize: "20px" }}>
                                    Our platform uses AI and machine learning to analyze resumes, identify key skills, and generate personalized assessments. By evaluating your responses and understanding your strengths, it recommends relevant courses for improvement and suggests suitable career paths. Whether you're a job seeker or a student planning your future, our intelligent system helps you take the next step with confidence.
                                </div>
                            </div>

                            <div style={{ display: "flex", justifyContent: "start", paddingLeft: "10px" }}>
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
                                        marginTop: "50px",
                                    }}
                                    onClick={handleGoToUploadPage}
                                    disabled={false}
                                >
                                    Get Started
                                </Button>
                            </div>
                        </div>
                        <div style={{width:"40%" , display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                            <video
                                src="/landingPageVid.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-auto"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}