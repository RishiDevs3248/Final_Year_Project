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
                    <div style={{ padding: "52px" }}>
                        {/* <button style={{ position: "absolute", bottom: "0px" }} onClick={() => navigate("/upload")}>Get Started</button> */}
                        <div className="Montserrat" style={{fontSize:"50px"}}> 
                            HeadingW
                        </div>
                        <div className="Lato" style={{ marginTop: "20px" , color:"#808080"}}>
                            Description Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis iusto voluptatibus nulla optio officiis magni eius quidem cumque id! Illum delectus sequi sit doloribus consequatur quidem autem modi adipisci veniam.
                        </div>
                        <div style={{display:"flex",justifyContent:"center"}}>
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
                                    marginTop: "20px",
                                }}
                                onClick={handleGoToUploadPage}
                                disabled={false}
                            >
                                Get Started
                            </Button>
                        </div>
                        <div className="Lato" style={{ marginTop: "20px", color:"#808080" }}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora obcaecati quam doloremque consectetur reprehenderit error modi exercitationem ratione alias laboriosam eius consequatur eveniet non aspernatur deserunt, quis ducimus cumque incidunt, vitae libero laudantium minus nihil, totam amet. Ex obcaecati dolores amet nesciunt temporibus fugiat quibusdam laborum, quas eaque totam assumenda voluptas odio libero saepe ad sint placeat vero nulla in. Temporibus quaerat cum tempore vitae provident. Aut odit repellat molestiae perferendis ullam, temporibus cum et. Sed, natus necessitatibus labore quaerat itaque neque sapiente sit placeat doloremque ratione nemo. Exercitationem perferendis ut officia sunt quas pariatur dolores animi libero placeat corrupti?
                        </div>
                        <div className="Lato" style={{ marginTop: "20px", color:"#808080" }}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat iste quasi placeat sed, at animi neque tempore eveniet natus officiis pariatur libero fugit voluptatibus similique voluptate saepe culpa vero ea illum eligendi veniam consectetur minus dolor. Possimus alias ipsam consequuntur officia animi, quibusdam nulla. Doloribus neque voluptatum expedita ratione eius, vel assumenda fuga autem repellendus nulla amet, ab dolores aliquid? Accusamus, odit quibusdam perferendis voluptatibus qui repellendus beatae mollitia sint totam, dolorem cumque temporibus at obcaecati placeat sed delectus architecto vero! Nemo a sit assumenda ipsam aliquid debitis, blanditiis veniam ipsa quas necessitatibus velit, recusandae iure illo at praesentium quaerat delectus! Dolore, quos repudiandae adipisci sapiente nostrum qui libero impedit cum? Pariatur deserunt voluptates nam delectus molestiae quibusdam aspernatur dignissimos temporibus officiis repudiandae molestias ad, minus hic odit minima autem rerum laborum dolore placeat ea totam odio distinctio quidem qui. Incidunt a sapiente tempore dolorum molestias, possimus cumque perspiciatis dicta?
                        </div>
                        <div className="Lato" style={{ marginTop: "20px" , color:"#808080"}}>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem laboriosam at ea illo minima consequatur doloremque ad eveniet placeat ducimus in pariatur voluptatem earum, sed cumque quisquam! Ducimus debitis voluptatem expedita consequatur laboriosam suscipit? Magni accusantium non blanditiis. Asperiores vitae iusto dolorum veniam architecto eum sequi illo quaerat modi necessitatibus.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}