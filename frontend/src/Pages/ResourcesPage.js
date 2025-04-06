import React from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, List, ListItem, Button, AccordionDetails, Card } from '@mui/material';

const ResourcesPage = () => {
    const location = useLocation();
    const { skills } = location.state || { skills: [] };

    const resources = require('../helper_json/recommandation_urls.json'); // Import your JSON file

    const renderResources = (skill) => {
        const skillResources = resources[skill];
        if (!skillResources) return null;

        return (
            <div key={skill}>

                <Typography variant="h5">{skill}</Typography>

                <List>
                    <Card style={{
                        marginBottom: '15px',
                        boxShadow: "none",
                        border: "0.8px solid black",
                        borderRadius: "12px",
                        padding:"12px"
                    }}>
                        {skillResources.Platforms && (
                            <>
                                <Typography variant="h6">Platforms:</Typography>
                                {skillResources.Platforms.map((platform, index) => (
                                    <ListItem key={index}>
                                        <Button href={platform} target="_blank" color="primary">
                                            {platform}
                                        </Button>
                                    </ListItem>
                                ))}
                            </>
                        )}
                    </Card>

                    <Card style={{
                        marginBottom: '15px',
                        boxShadow: "none",
                        border: "0.8px solid black",
                        borderRadius: "12px",
                        padding:"12px"
                    }}>
                        {skillResources.Documentation && (
                            <>
                                <Typography variant="h6">Documentation:</Typography>
                                {skillResources.Documentation.map((doc, index) => (
                                    <ListItem key={index}>
                                        <Button href={doc} target="_blank" color="primary">
                                            {doc}
                                        </Button>
                                    </ListItem>
                                ))}
                            </>
                        )}

                    </Card>

                    <Card style={{
                        marginBottom: '15px',
                        boxShadow: "none",
                        border: "0.8px solid black",
                        borderRadius: "12px",
                        padding:"12px"
                    }}>
                        {skillResources.Practice && (
                            <>
                                <Typography variant="h6">Practice:</Typography>
                                {skillResources.Practice.map((practice, index) => (
                                    <ListItem key={index}>
                                        <Button href={practice} target="_blank" color="primary">
                                            {practice}
                                        </Button>
                                    </ListItem>
                                ))}
                            </>
                        )}
                    </Card>

                    <Card style={{
                        marginBottom: '15px',
                        boxShadow: "none",
                        border: "0.8px solid black",
                        borderRadius: "12px",
                        padding:"12px"
                    }}>
                        {skillResources.Community && (
                            <>
                                <Typography variant="h6">Community:</Typography>
                                {skillResources.Community.map((community, index) => (
                                    <ListItem key={index}>
                                        <Button href={community} target="_blank" color="primary">
                                            {community}
                                        </Button>
                                    </ListItem>
                                ))}
                            </>
                        )}
                    </Card>

                </List>
            </div>
        );
    };

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
                    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
                        <Typography variant="h4" gutterBottom>
                            Resources for Your Skills
                        </Typography>
                        {skills.map((skill) => renderResources(skill))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResourcesPage;
