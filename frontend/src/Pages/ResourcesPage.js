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
                        border: "1px solid black",
                        borderRadius: "12px",
                        padding: "12px"
                    }}>
                        {skillResources.Platforms && (
                            <>
                                <Typography variant="h6">Platforms:</Typography>
                                <ul style={{ listStyleType: 'disc', }}>
                                    {skillResources.Platforms.map((platform, index) => (
                                        <li>
                                            <ListItem key={index}>
                                                <Button href={platform} target="_blank" color="primary">
                                                    {platform}
                                                </Button>
                                            </ListItem>
                                        </li>
                                    ))}
                                </ul>

                            </>
                        )}
                    </Card>

                    <Card style={{
                        marginBottom: '15px',
                        boxShadow: "none",
                        border: "1px solid black",
                        borderRadius: "12px",
                        padding: "12px"
                    }}>
                        {skillResources.Documentation && (
                            <>
                                <Typography variant="h6">Documentation:</Typography>
                                <ul style={{ listStyleType: 'disc', }}>
                                    {skillResources.Documentation.map((doc, index) => (
                                        <li>
                                            <ListItem key={index}>
                                                <Button href={doc} target="_blank" color="primary">
                                                    {doc}
                                                </Button>
                                            </ListItem>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        ) || skillResources.Frameworks && (
                            <>
                                <Typography variant="h6">Frameworks:</Typography>
                                <ul style={{ listStyleType: 'disc', }}>
                                    {skillResources.Frameworks.map((doc, index) => (
                                        <li>
                                            <ListItem key={index}>
                                                <Button href={doc} target="_blank" color="primary">
                                                    {doc}
                                                </Button>
                                            </ListItem>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        ) || skillResources.Tools && (
                            <>
                                <Typography variant="h6">Tools:</Typography>
                                <ul style={{ listStyleType: 'disc', }}>
                                    {skillResources.Tools.map((doc, index) => (
                                        <li>
                                            <ListItem key={index}>
                                                <Button href={doc} target="_blank" color="primary">
                                                    {doc}
                                                </Button>
                                            </ListItem>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        ) || skillResources.Services && (
                            <>
                                <Typography variant="h6">Services:</Typography>
                                <ul style={{ listStyleType: 'disc', }}>
                                    {skillResources.Services.map((doc, index) => (
                                        <li>
                                            <ListItem key={index}>
                                                <Button href={doc} target="_blank" color="primary">
                                                    {doc}
                                                </Button>
                                            </ListItem>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}

                    </Card>

                    <Card style={{
                        marginBottom: '15px',
                        boxShadow: "none",
                        border: "1px solid black",
                        borderRadius: "12px",
                        padding: "12px"
                    }}>
                        {skillResources.Practice && (
                            <>
                                <Typography variant="h6">Practice:</Typography>
                                <ul style={{ listStyleType: 'disc', }}>
                                    {skillResources.Practice.map((practice, index) => (
                                        <li>
                                            <ListItem key={index}>
                                                <Button href={practice} target="_blank" color="primary">
                                                    {practice}
                                                </Button>
                                            </ListItem>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </Card>

                    <Card style={{
                        marginBottom: '15px',
                        boxShadow: "none",
                        border: "1px solid black",
                        borderRadius: "12px",
                        padding: "12px"
                    }}>
                        {skillResources.Community && (
                            <>
                                <Typography variant="h6">Community:</Typography>
                                <ul style={{ listStyleType: 'disc', }}>
                                    {skillResources.Community.map((community, index) => (
                                        <li>
                                            <ListItem key={index}>
                                                <Button href={community} target="_blank" color="primary">
                                                    {community}
                                                </Button>
                                            </ListItem>
                                        </li>
                                    ))}
                                </ul>
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
