import { Box, Tab, Tabs, useTheme } from "@mui/material";
import React from "react";

export interface TabConfig {
    value: string;
    label: string;
    content: React.ReactNode;
};

export interface TabsCompoProps {
    tabs: TabConfig[];
    initialTab?: string; // Valor inicial opcional
}

export const TabsCompo = ({
    tabs,
    initialTab = '1' // Valor por defecto
}: TabsCompoProps) => {
    const theme = useTheme();
    const [value, setValue] = React.useState(initialTab);

    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ 
                borderBottom: 1, 
                borderColor: 'divider',
                position: 'relative' // Para el indicador personalizado
            }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="tabs de ejemplo"
                    variant="fullWidth"
                    TabIndicatorProps={{
                        style: {
                            backgroundColor: 'transparent' // Ocultamos el indicador por defecto
                        }
                    }}
                >
                    {tabs.map((tab) => (
                        <Tab 
                            key={tab.value} 
                            label={tab.label} 
                            value={tab.value} 
                            sx={{
                                fontWeight: value === tab.value ? 'bold' : 'normal',
                                color: theme.palette.text.primary,
                                textTransform: 'none',
                                transition: 'all 0.3s ease',
                                position: 'relative',
                                '&::after': {
                                    content: '""',
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    height: value === tab.value ? 3 : 0,
                                    backgroundColor: theme.palette.secondary.main,
                                    transition: 'all 0.3s ease',
                                },
                                '&.Mui-selected': {
                                    color: theme.palette.primary.contrastText,
                                }
                            }}
                        />
                    ))}
                </Tabs>
            </Box>
            
            {/* Contenido del tab activo */}
            {tabs.map((tab) => (
                value === tab.value && (
                    <Box 
                        key={tab.value} 
                        role="tabpanel"
                        sx={{ 
                            p: 3,
                            animation: 'fadeIn 0.3s ease',
                            '@keyframes fadeIn': {
                                from: { opacity: 0.5 },
                                to: { opacity: 1 }
                            }
                        }}
                    >
                        {tab.content}
                    </Box>
                )
            ))}
        </Box>
    );
};