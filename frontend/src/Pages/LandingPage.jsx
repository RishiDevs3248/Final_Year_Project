import { useNavigate } from "react-router-dom";

export default function Landingpage() {
    const navigate = useNavigate();
    return (
            <div style={{backgroundColor:"#BEB0D2", height:"100vh" , width : "100vw" , display:"flex", justifyContent:"center" , alignItems:"center" }}>
                <div style={{backgroundColor:"#fff" , height:"83vh" , width:"90vw", borderRadius:"20px" }}>
                    <button onClick={() => navigate("/upload")}>Get Started</button>
                </div>
            </div>
    )
}