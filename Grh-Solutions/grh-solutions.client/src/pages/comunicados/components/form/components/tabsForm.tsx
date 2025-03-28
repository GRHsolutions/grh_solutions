import { Box, Tab, Tabs } from "@mui/material";
import React from "react";

export const TabsForm = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
      setValue(newValue);
    };
  
    return (
      <Box sx={{ width: '100%', typography: 'body1' }}>
        
      </Box>
    );
}