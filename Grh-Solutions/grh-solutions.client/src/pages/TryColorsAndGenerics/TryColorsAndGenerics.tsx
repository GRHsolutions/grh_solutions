import { Box, Typography, Paper, Grid2, useTheme, SxProps } from '@mui/material';
import React from 'react';
import MUIswitch from '../../generics/switch/MUIswitch';
import GrhButton from '../../generics/grh-generics/button';
import GrhTextField from '../../generics/grh-generics/textField';
import { DragDropInput } from '../../generics/grh-generics/DragNDrop';
import GenericDatePicker from '../../generics/grh-generics/inputDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import MultipleSelect from '../../generics/grh-generics/multipleSelect';
import GrhBasicMenu from '../../generics/grh-generics/menu';
import GrhGenericTable2 from '../../generics/grh-generics/tableWrapper2';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import GrhCustomSelect from '../../generics/grh-generics/inputSelect';
import { ImageCarousel } from '../../generics/grh-generics/imageCarousel';
import { TabConfig, TabsCompo } from '../../generics/tabs/tabs';

interface TableDemo {
  name: string,
  calories: number, 
  fat: number, 
  carbs: number, 
  protein : number,
  cualquiera: Cualqueira,
  [key: string] : any
}

interface Cualqueira {
  name: string,
  fecha: Dayjs;

}

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
  cualquiera: string,
  fecha: Dayjs
): TableDemo{
  return { 
    name: name, 
    calories:calories, 
    fat:fat, 
    carbs:carbs,
    protein, 
    cualquiera: { 
      name: cualquiera,
      fecha: fecha
    }
  };
}


const TryColorsAndGenerics = () => {
  const theme = useTheme();
  const [ useColorShowCase, setUseColorShowCase ] = React.useState(false);
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);
  const [dat, setDat] = React.useState<Dayjs | null>(dayjs());
  const [text, setText] = React.useState("");
  const [currentInputSelected, setCurrentInputSelected] = React.useState(0);
  const options = [{
      id: 1,
      name: "OBJETO 1"
    },{
      id: 2,
      name: "OBJETO 2"
    },{
      id: 3,
      name: "OBJETO 3"
    },{
      id: 4,
      name: "OBJETO 4"
    },{
      id: 5,
      name: "OBJETO 5"
    }
  ];
    // Configuración de los tabs
  const tabs: TabConfig[] = [
      {
          value: '1',
          label: 'Primer Tab',
          content: (
              <Box sx={{ p: 3 }}>
                  <Typography variant="h6">Contenido del primer tab</Typography>
                  <Typography>Aquí puedes poner cualquier componente</Typography>
              </Box>
          )
      },
      {
          value: '2',
          label: 'Segundo Tab',
          content: (
              <Box sx={{ p: 3 }}>
                  <Typography variant="h6">Contenido del segundo tab</Typography>
                  <Typography>Otro componente diferente aquí</Typography>
              </Box>
          )
      },
      {
          value: '3',
          label: 'Tercer Tab',
          content: (
              <Box sx={{ p: 3 }}>
                  <Typography variant="h6">Contenido del tercer tab</Typography>
                  <Typography>Último componente personalizado</Typography>
              </Box>
          )
      }
  ];
  const [mult, setMult] = React.useState<number[]>([]);

  const rows : TableDemo[] = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0, "sigma", dayjs()),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3, "sigma", dayjs()),
    createData('Eclair', 262, 16.0, 24, 6.0, "sigma", dayjs()),
    createData('Cupcake', 305, 3.7, 67, 4.3, "sigma", dayjs()),
    createData('Gingerbread', 356, 16.0, 49, 3.9, "sigma", dayjs()),
    createData('Gingerbread', 356, 16.0, 49, 3.9, "sigma", dayjs()),
    createData('Gingerbread', 356, 16.0, 49, 3.9, "sigma", dayjs()),
    createData('Gingerbread', 356, 16.0, 49, 3.9, "sigma", dayjs()),
    createData('Gingerbread', 356, 16.0, 49, 3.9, "sigma", dayjs()),
    createData('Gingerbread', 356, 16.0, 49, 3.9, "sigma", dayjs()),
  ];

  const handleFileSelect = (files: File[]) => {
    setSelectedFiles(files);
  };

  const ColorSwatch = ({ color, name, textColor = '#000' }: { color: string; name: string; textColor?: string }) => (
    <Paper elevation={2} sx={{ mb: 2, overflow: 'hidden' }}>
      <Box
        sx={{
          backgroundColor: color,
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <Typography variant="subtitle1" sx={{ color: textColor, fontWeight: 'bold' }}>
          {name}
        </Typography>
        <Typography variant="body2" sx={{ color: textColor }}>
          {color}
        </Typography>
      </Box>
    </Paper>
  );

  const Section = ({ title, children, sx }: { title: string; children: React.ReactNode, sx?: SxProps }) => (
    <Box sx={{ mb: 4}}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
        {title}
      </Typography>
      <Grid2 container spacing={5} sx={{...sx}}>
        {children}
      </Grid2>
    </Box>
  );

  const handleSwitchAction = () => {
    setUseColorShowCase(!useColorShowCase);
  }

  const setFieldValue = (_field: string, value: number[]) => {
    setMult(value);
  };

  return (
    <Box 
      sx={{ 
        p: 4, 
        maxWidth: '{ sx: 12, sm: 6, md: 4 }00px', 
        margin: '0 auto',
        overflow: 'auto',
        "&::-webkit-scrollbar": {
          width: "8px", // Ancho de la barra
        },
        "&::-webkit-scrollbar-track": {
          background: `${theme.palette.primary.light}`, // Color de fondo
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#888", // Color del "thumb" (parte desplazable)
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          background: "#555", // Color cuando se pasa el mouse
        },
      }}
    >
      <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
        Theme Color Palette
      </Typography>
      <Typography variant='h5' sx={{ mb: 4, textAlign: 'center' }}>
        cambiar vista <MUIswitch value={useColorShowCase} onChange={handleSwitchAction} />
      </Typography>
      {useColorShowCase ? 
        <>
          <Section title="Primary Colors">
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <ColorSwatch color={theme.palette.primary.main} name="Primary Main" textColor={theme.palette.primary.contrastText}/>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <ColorSwatch color={theme.palette.primary.dark} name="Primary Dark" textColor={theme.palette.primary.contrastText}/>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <ColorSwatch color={theme.palette.primary.light} name="Primary Light" textColor={theme.palette.primary.contrastText}/>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <ColorSwatch color={theme.palette.primary.hover as string} name="Primary Hover" textColor={theme.palette.primary.contrastText}/>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <ColorSwatch color={theme.palette.primary.father as string} name="Primary Father" textColor={theme.palette.primary.contrastText}/>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <ColorSwatch color={theme.palette.primary.link as string} name="Primary Link" textColor={theme.palette.primary.contrastText}/>
            </Grid2>
          </Section>

          <Section title="Secondary Colors">
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <ColorSwatch color={theme.palette.secondary.main} name="Secondary Main" textColor={theme.palette.primary.contrastText} />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <ColorSwatch color={theme.palette.secondary.dark} name="Secondary Dark" textColor={theme.palette.primary.contrastText} />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <ColorSwatch color={theme.palette.secondary.light} name="Secondary Light" textColor={theme.palette.primary.contrastText}/>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <ColorSwatch color={theme.palette.secondary.hover as string} name="Secondary Hover" textColor={theme.palette.primary.contrastText} />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <ColorSwatch color={theme.palette.secondary.link as string} name="Secondary Link" textColor={theme.palette.primary.contrastText} />
            </Grid2>
          </Section>

          <Section title="Background Colors">
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <ColorSwatch color={theme.palette.background.default} name="Background Default" textColor={theme.palette.primary.contrastText}/>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <ColorSwatch color={theme.palette.background.paper} name="Background Paper" textColor={theme.palette.primary.contrastText}/>
            </Grid2>
          </Section>

          <Section title="Text Colors">
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <ColorSwatch color={theme.palette.text.primary} name="Text Primary" textColor={theme.palette.primary.contrastText}/>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <ColorSwatch color={theme.palette.text.secondary} name="Text Secondary" textColor={theme.palette.primary.contrastText}/>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <ColorSwatch color={theme.palette.text.dark} name="Text Dark" />
            </Grid2>
          </Section>

          <Section title="Status Colors">
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <ColorSwatch color={theme.palette.success.main} name="Success Main" textColor={theme.palette.primary.contrastText}/>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <ColorSwatch color={theme.palette.error.main} name="Error Main" textColor={theme.palette.primary.contrastText} />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <ColorSwatch color={theme.palette.warning.main} name="Warning Main" textColor={theme.palette.primary.contrastText}/>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <ColorSwatch color={theme.palette.info.main} name="Info Main" textColor={theme.palette.primary.contrastText}/>
            </Grid2>
          </Section>

          <Section title="Gray Scale">
            {Object.entries(theme.palette.gray).map(([key, value]) => (
              <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={key}>
                <ColorSwatch 
                  color={value} 
                  name={`Gray ${key}`} 
                  textColor={parseInt(key) > 500 ? theme.palette.primary.contrastText : theme.palette.primary.contrastText} 
                />
              </Grid2>
            ))}
          </Section>
        </>
      : 
        <Section title='Componentes propios de grh utiles' sx={{ display: 'flex', flexDirection: 'column'}}> 
            <GrhBasicMenu 
              optionsPosition={{
                top: '2px',
                left: '10px'
              }}
              items={[
                {
                  icon: <AcUnitIcon />,
                  label: "Opcion del menu 1",
                  onClick: () => {console.log("pressed")},
                  visible: true,
                  disabled: false
                },
                {
                  icon: <AcUnitIcon />,
                  label: "Opcion del menu 2",
                  onClick: () => {console.log("pressed")},
                  visible: true,
                  disabled: false
                },
                {
                  icon: <AcUnitIcon />,
                  label: "Opcion del menu 3",
                  onClick: () => {console.log("pressed")},
                  visible: true,
                  disabled: false
                }
              ]}          
            />
            <GrhButton 
              label="BOTON PRINCIPAL"
              variant='principal'
              sx={{
                width: '50%'
              }}
            />
          <GrhButton 
            label="BOTON SECONDARY"
            variant='secondary'
            sx={{
              width: '50%'
            }}
          />
          <GrhButton 
            label="BOTON TERTIARY"
            variant='tertiary'
            sx={{
              width: '50%'
            }}
          />
          <GrhButton 
            label="BOTON DEFAULT"
            variant='use-default'
            sx={{
              width: '50%'
            }}
          />
          <GrhTextField 
            label='label component'
            value={text}
            onChange={(e) => {
              setText(e.target.value || "");
            }}
          />
          <DragDropInput 
            acceptedMimeTypes={['image/jpeg', 'image/png', 'image/gif']}
            maxSizeInKB={15}
            onFileSelect={handleFileSelect}
            selectedFiles={selectedFiles} 
            maxFiles={1}
          />
          <GenericDatePicker 
            value={dat} 
            label={'Input Date Picker'} 
            onChange={setDat}         
          />
          <label> MultipleSelect BUGGED</label>
          <MultipleSelect 
            label={'Input multiple select'} 
            name={'input'} 
            options={options.map(item => ({
              id: item.id, 
              nombre: item.name
            }))} 
            maxSelections={3}
            value={mult} 
            setFieldValue={setFieldValue}
          />
          <GrhGenericTable2 
            maxHeight={"20rem"}
            columns={[{
              key: "name",
              label: "Alimento",
              onRowClick: (value)=>{
                console.log(value)
              },
              type: "string"
            },{
              key: "calories",
              label: "Calorias",
              onRowClick: undefined,
              type: "string"
            },
            {
              key: "fat",
              label: "Fatura?",
              onRowClick: undefined,
              type: "string"
            },{
              key: "carbs",
              label: "Carbohidratos",
              onRowClick: undefined,
              type: "string"
            },{
              key: "cualquiera.name",
              label: "Cualquiera",
              onRowClick: undefined,
              type: "string"
            },{
              key: "cualquiera.fecha",
              label: "Fecha",
              onRowClick: undefined,
              type: "date"
            }
          ]} 
            data={rows} 
            pagination={{
              pageSize: 5,
              totalPages: 10,
              currentPage: 1,
              totalRows: 510
            }} 
            onPageChange={(value)=>{
              console.log(value);
            }}                    
          />
          <GrhCustomSelect 
            label={"Demo input grh select"} 
            options={options.map(item => ({
              value: item.id, 
              name: item.name
            }))} 
            value={currentInputSelected} 
            onChange={(e) => {
              setCurrentInputSelected(e.target.value as number);
            }}
          />
          <ImageCarousel 
            images={[
              "data:image/png;base64,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",
              "data:image/png;base64,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",
            ]}          
          />
          <TabsCompo 
            tabs={tabs}
          />
        </Section>
      }
    </Box>
  );
}

export default TryColorsAndGenerics;