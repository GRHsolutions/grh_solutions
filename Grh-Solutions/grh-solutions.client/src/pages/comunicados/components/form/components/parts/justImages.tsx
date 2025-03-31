import { Grid2 } from "@mui/material";
import { DragDropInput, DragNDropVariables } from "../../../../../../generics/grh-generics/DragNDrop";
import { News } from "../../../../../../domain/models/news/news.entities";

interface JustImagesProps {
    values: News;
    changeImages: (name: string, image: DragNDropVariables[]) => void;
}

export const JustImages = ({
    values,
    changeImages
}: JustImagesProps) => {
    return (
        <Grid2
            container
            spacing={2}
        >
            <DragDropInput 
                acceptedMimeTypes={["jpg", "png", "gif"]} 
                maxSizeInKB={340} 
                maxFiles={4} 
                onFileSelect={(files: DragNDropVariables[]) => {
                    changeImages("images", files)
                }} 
                selectedFiles={values.images}            
            />
        </Grid2>
    );
}