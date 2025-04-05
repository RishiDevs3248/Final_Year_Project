import { useNavigate } from "react-router-dom";

export default function Landingpage() {
    const navigate = useNavigate();
    return (
        <div style={{ backgroundColor: "#fff" , height: "calc(100vh - 30px)", width: "calc(100vw - 30px)", padding: "15px"}}>
            <div style={{ backgroundColor: "#BD94F0", height: "calc(100% - 150px)", width: "calc(100% - 150px)", padding: "75px" ,borderRadius: "20px"}}>
                <div style={{ backgroundColor: "#fff", height: "100%", width: "100%", borderRadius: "20px" , position:"relative"}}>
                    <button style={{position:"absolute",bottom:"0px"}} onClick={() => navigate("/upload")}>Get Started</button>
                    <button style={{position:"absolute",bottom:"0px"}} onClick={() => navigate("/upload")}>Get Started</button>
                    <button style={{position:"absolute",bottom:"0px"}} onClick={() => navigate("/upload")}>Get Started</button>
                </div>
            </div>
        </div>
    )
}