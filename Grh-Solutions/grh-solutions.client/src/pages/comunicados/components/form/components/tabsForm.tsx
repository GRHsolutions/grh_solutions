import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import { TabConfig, TabsCompo } from "../../../../../generics/tabs/tabs";
import { News } from "../../../../../domain/models/news/news.entities";
import { Formik, FormikHelpers, FormikValues } from "formik";

interface TabsFormProps {
    initialValue: News | null,
    edit: boolean,
}

export const TabsForm = ({ 
    initialValue,
    edit
}: TabsFormProps) => {
    const tabs : TabConfig[] = [
        {
            value: "1",
            label: "Inicializacion",
            content: <>primera parte</>
        },
        {
            value: "2",
            label: "Contenido Adicional",
            content: <>Contenido Adicional</>
        },
        {
            value: "3",
            label: "any",
            content: <>any</>
        }
    ]

    const CreateNew = (nw: News) => {
        console.log(edit);
        console.log(nw);
    }
  
    return (
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <Formik 
            initialValues={{
                ...initialValue
            } as News}
            onSubmit={CreateNew}
        >
            
        </Formik>
        <TabsCompo tabs={tabs}/>
      </Box>
    );
}