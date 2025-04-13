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
                    {/* <button style={{ position: "absolute", bottom: "0px" }} onClick={() => navigate("/upload")}>Get Started</button> */}
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
                        onClick={handleGoToUploadPage}
                        disabled={false}
                    >
                        Get Started
                    </Button>
                </div>
            </div>
        </div>
    )
}