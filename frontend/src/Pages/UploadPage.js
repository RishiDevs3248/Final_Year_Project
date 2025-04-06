import React from 'react';
import UploadPDF from '../components/UploadPDF';

const UploadPage = () => {
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
                    <UploadPDF />
                </div>
            </div>
        </div>
        
    );
};

export default UploadPage;
