import { Box, Typography, Paper, Grid2, useTheme, SxProps } from '@mui/material';
import React from 'react';
import MUIswitch from '../../generics/switch/MUIswitch';
import GrhButton from '../../generics/grh-generics/button';
import GrhTextField from '../../generics/grh-generics/textField';
import { DragDropInput, DragNDropVariables } from '../../generics/grh-generics/DragNDrop';
import GenericDatePicker from '../../generics/grh-generics/inputDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import MultipleSelect from '../../generics/grh-generics/multipleSelect';
import GrhBasicMenu from '../../generics/grh-generics/menu';
import GrhGenericTable2 from '../../generics/grh-generics/tableWrapper2';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import GrhCustomSelect from '../../generics/grh-generics/inputSelect';
import { ImageCarousel } from '../../generics/grh-generics/imageCarousel';
import { TabConfig, TabsCompo } from '../../generics/tabs/tabs';
import { VarIma } from '../../const/variables';


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
  const [selectedFiles, setSelectedFiles] = React.useState<DragNDropVariables[]>([]);
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

  const handleFileSelect = (files: DragNDropVariables[]) => {
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
              {
                name: "Imagen1",
                size: 24,
                base64: VarIma,
                type: 'png'
              }
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