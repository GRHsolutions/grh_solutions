import { FC, useEffect, useRef, useState } from "react";
import {
  Drawer,
  Box,
  TextField,
  MenuItem,
  Button,
  Typography,
  IconButton,
  Select,
  InputLabel,
  FormControl,
  Divider,
  Alert,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  Contract,
  TypeContract,
  Vacancy,
} from "../../../domain/models/contratos/contratos.entities";
import { Usuario } from "../../../domain/models/usuario/user.entities";

interface Props {
  open: boolean;
  onClose: () => void;
  onCreate: (data: Partial<Contract>) => Promise<boolean>;
  onUpdate: (data: Partial<Contract>) => Promise<boolean>;
  initialData: Contract | null;
  empleados?: Usuario[];
  tiposContratos?: TypeContract[];
  vacantes?: Vacancy[];
  estratoList: number[];
}

const canvasWidth = 600;
const canvasHeight = 160;

const ContratoFormDrawer: FC<Props> = ({
  open,
  onClose,
  onCreate,
  onUpdate,
  initialData,
  empleados = [],
  tiposContratos = [],
  vacantes = [],
  estratoList,
}) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const isEditMode = Boolean(initialData);

  const [formData, setFormData] = useState<Partial<Contract>>({
    title: "",
    estado: "borrador",
    eps: "",
    estrato: 1,
    start_date: "",
    end_date: null,
    arl: "",
  });

  const [selectedIds, setSelectedIds] = useState({
    perfil_creador: "",
    perfil_empleado: "",
    tipo_contrato: "",
    vacante: "",
  });

  const [firmaEmpleadoB64, setFirmaEmpleadoB64] = useState<string>("");
  const [firmaEmpleadorB64, setFirmaEmpleadorB64] = useState<string>("");

  const canvasEmpleadoRef = useRef<HTMLCanvasElement | null>(null);
  const canvasEmpleadorRef = useRef<HTMLCanvasElement | null>(null);

  const drawingStateEmpleado = useRef({ drawing: false, lastX: 0, lastY: 0 });
  const drawingStateEmpleador = useRef({ drawing: false, lastX: 0, lastY: 0 });

  // Reset form cuando cambia el modo o se cierra
  const resetForm = () => {
    setFormData({
      title: "",
      estado: "borrador",
      eps: "",
      estrato: 1,
      start_date: "",
      end_date: null,
      arl: "",
    });
    setSelectedIds({
      perfil_creador: "",
      perfil_empleado: "",
      tipo_contrato: "",
      vacante: "",
    });
    setFirmaEmpleadoB64("");
    setFirmaEmpleadorB64("");
    clearCanvas(canvasEmpleadoRef.current);
    clearCanvas(canvasEmpleadorRef.current);
    setErrorMsg("");
  };

  // Cargar datos cuando es edición
  useEffect(() => {
    if (!open) return;

    if (initialData) {
      // MODO EDICIÓN
      const formatDate = (date: any) =>
        date ? new Date(date).toISOString().split("T")[0] : "";

      setFormData({
        _id: (initialData as any)._id,
        title: initialData.title || "",
        estado: initialData.estado || "borrador",
        eps: initialData.eps || "",
        estrato: (initialData.estrato as any) ?? 1,
        start_date: formatDate((initialData as any).start_date),
        end_date: formatDate((initialData as any).end_date) || null,
        arl: initialData.arl || "",
      });

      setSelectedIds({
        perfil_creador:
          (initialData as any).perfil_creador?._id ||
          (initialData as any).perfil_creador ||
          "",
        perfil_empleado:
          (initialData as any).perfil_empleado?._id ||
          (initialData as any).perfil_empleado ||
          "",
        tipo_contrato:
          (initialData as any).tipo_contrato?._id ||
          (initialData as any).tipo_contrato ||
          "",
        vacante:
          (initialData as any).vacante?._id ||
          (initialData as any).vacante ||
          "",
      });

      if ((initialData as any).firma_empleado) {
        setFirmaEmpleadoB64((initialData as any).firma_empleado);
      } else {
        setFirmaEmpleadoB64("");
        clearCanvas(canvasEmpleadoRef.current);
      }

      if ((initialData as any).firma_empleador) {
        setFirmaEmpleadorB64((initialData as any).firma_empleador);
      } else {
        setFirmaEmpleadorB64("");
        clearCanvas(canvasEmpleadorRef.current);
      }
    } else {
      // MODO CREACIÓN
      resetForm();
    }

    setErrorMsg("");
  }, [initialData, open]);

  // Cargar imágenes de firmas en canvas cuando está en modo edición
  useEffect(() => {
    if (!open || !isEditMode) return;

    const timeout = setTimeout(() => {
      if (firmaEmpleadoB64 && canvasEmpleadoRef.current) {
        loadImageToCanvas(canvasEmpleadoRef.current, firmaEmpleadoB64);
      }
      if (firmaEmpleadorB64 && canvasEmpleadorRef.current) {
        loadImageToCanvas(canvasEmpleadorRef.current, firmaEmpleadorB64);
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [open, isEditMode, firmaEmpleadoB64, firmaEmpleadorB64]);

  // Helpers canvas
  function getCtx(canvas: HTMLCanvasElement | null) {
    if (!canvas) return null;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = "#111827";
    return ctx;
  }

  function clearCanvas(canvas: HTMLCanvasElement | null) {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function loadImageToCanvas(canvas: HTMLCanvasElement | null, base64: string) {
    if (!canvas || !base64) return;
    const ctx = getCtx(canvas);
    if (!ctx) return;
    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const ratio = Math.min(
        canvas.width / img.width,
        canvas.height / img.height
      );
      const w = img.width * ratio;
      const h = img.height * ratio;
      const x = (canvas.width - w) / 2;
      const y = (canvas.height - h) / 2;
      ctx.drawImage(img, x, y, w, h);
    };
    img.src = base64;
  }

  // Eventos dibujo empleado
  const startDrawEmpleado = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasEmpleadoRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clientX =
      "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY =
      "touches" in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    drawingStateEmpleado.current.drawing = true;
    drawingStateEmpleado.current.lastX = clientX - rect.left;
    drawingStateEmpleado.current.lastY = clientY - rect.top;
  };

  const moveDrawEmpleado = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasEmpleadoRef.current;
    if (!canvas || !drawingStateEmpleado.current.drawing) return;
    const rect = canvas.getBoundingClientRect();
    const clientX =
      "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY =
      "touches" in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const ctx = getCtx(canvas);
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(
      drawingStateEmpleado.current.lastX,
      drawingStateEmpleado.current.lastY
    );
    ctx.lineTo(x, y);
    ctx.stroke();
    drawingStateEmpleado.current.lastX = x;
    drawingStateEmpleado.current.lastY = y;
  };

  const endDrawEmpleado = () => {
    drawingStateEmpleado.current.drawing = false;
    const canvas = canvasEmpleadoRef.current;
    if (!canvas) return;
    const b64 = canvas.toDataURL("image/png");
    setFirmaEmpleadoB64(b64);
  };

  // Eventos dibujo empleador
  const startDrawEmpleador = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasEmpleadorRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clientX =
      "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY =
      "touches" in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    drawingStateEmpleador.current.drawing = true;
    drawingStateEmpleador.current.lastX = clientX - rect.left;
    drawingStateEmpleador.current.lastY = clientY - rect.top;
  };

  const moveDrawEmpleador = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasEmpleadorRef.current;
    if (!canvas || !drawingStateEmpleador.current.drawing) return;
    const rect = canvas.getBoundingClientRect();
    const clientX =
      "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY =
      "touches" in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const ctx = getCtx(canvas);
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(
      drawingStateEmpleador.current.lastX,
      drawingStateEmpleador.current.lastY
    );
    ctx.lineTo(x, y);
    ctx.stroke();
    drawingStateEmpleador.current.lastX = x;
    drawingStateEmpleador.current.lastY = y;
  };

  const endDrawEmpleador = () => {
    drawingStateEmpleador.current.drawing = false;
    const canvas = canvasEmpleadorRef.current;
    if (!canvas) return;
    const b64 = canvas.toDataURL("image/png");
    setFirmaEmpleadorB64(b64);
  };

  const clearFirmaEmpleado = () => {
    clearCanvas(canvasEmpleadoRef.current);
    setFirmaEmpleadoB64("");
  };

  const clearFirmaEmpleador = () => {
    clearCanvas(canvasEmpleadorRef.current);
    setFirmaEmpleadorB64("");
  };

  const handleInput = (e: any) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === "estrato") value = Number(value);
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const handleSelect = (key: keyof typeof selectedIds, value: string) =>
    setSelectedIds((s) => ({ ...s, [key]: value }));

  // Validaciones comunes
  const validateForm = (): string | null => {
    if (!formData.title) return "El título es obligatorio";
    if (!selectedIds.perfil_creador) return "Debe seleccionar un empleador";
    if (!selectedIds.vacante) return "Debe seleccionar una vacante";
    if (!selectedIds.perfil_empleado) return "Debe seleccionar un empleado";
    if (!selectedIds.tipo_contrato) return "Debe seleccionar un tipo de contrato";
    if (!formData.eps) return "Debe seleccionar una EPS";
    if (!formData.arl) return "Debe seleccionar una ARL";
    if (!formData.start_date) return "Debe seleccionar la fecha de inicio";
    return null;
  };

  // Construir payload común
  const buildPayload = (): Partial<Contract> => {
    const payload: any = {
      title: formData.title!,
      estado: formData.estado!,
      eps: formData.eps!,
      arl: formData.arl!,
      estrato: Number(formData.estrato),
      start_date: formData.start_date!,
      perfil_creador: selectedIds.perfil_creador,
      perfil_empleado: selectedIds.perfil_empleado,
      tipo_contrato: selectedIds.tipo_contrato,
      vacante: selectedIds.vacante,
      firma_empleado: firmaEmpleadoB64,
      firma_empleador: firmaEmpleadorB64,
    };

    // Solo incluir end_date si tiene valor
    if (formData.end_date) {
      payload.end_date = formData.end_date;
    }

    return payload;
  };

  // LÓGICA DE CREACIÓN
  const handleCrear = async () => {
    const error = validateForm();
    if (error) {
      setErrorMsg(error);
      return;
    }

    setErrorMsg("");
    setIsSaving(true);

    const payload = buildPayload();

    try {
      const success = await onCreate(payload);
      if (success) {
        resetForm();
        onClose();
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "Error creando contrato");
    } finally {
      setIsSaving(false);
    }
  };

  // LÓGICA DE EDICIÓN
  const handleEditar = async () => {
    const error = validateForm();
    if (error) {
      setErrorMsg(error);
      return;
    }

    if (!initialData?._id) {
      setErrorMsg("ID del contrato no encontrado");
      return;
    }

    setErrorMsg("");
    setIsSaving(true);

    const payload = buildPayload();
    // NO incluir _id en el payload, se envía por separado en la URL
    // payload._id = initialData._id; // ❌ ELIMINAR ESTA LÍNEA

    try {
      const success = await onUpdate(payload);
      if (success) {
        onClose();
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "Error actualizando contrato");
    } finally {
      setIsSaving(false);
    }
  };

  // Handler unificado que decide qué hacer
  const handleGuardar = () => {
    if (isEditMode) {
      handleEditar();
    } else {
      handleCrear();
    }
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        sx={{
          width: { xs: "100%", sm: 620 },
          padding: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          position: "relative",
          overflowY: "auto",
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 10, right: 10 }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h5" fontWeight="bold">
          {isEditMode ? "Editar Contrato" : "Nuevo Contrato"}
        </Typography>

        {errorMsg && <Alert severity="error">{errorMsg}</Alert>}

        <Divider>Información General</Divider>

        <TextField
          label="Título"
          name="title"
          value={formData.title || ""}
          onChange={handleInput}
          fullWidth
        />

        <FormControl fullWidth>
          <InputLabel>Estado</InputLabel>
          <Select
            name="estado"
            value={formData.estado || "borrador"}
            onChange={handleInput}
            label="Estado"
          >
            {[
              "borrador",
              "por revisar",
              "aprobado",
              "por firmar",
              "firmado",
              "activo",
              "vencido",
              "cancelado",
            ].map((estado) => (
              <MenuItem key={estado} value={estado}>
                {estado}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Divider>Partes</Divider>

        <FormControl fullWidth>
          <InputLabel>Empleador</InputLabel>
          <Select
            value={selectedIds.perfil_creador}
            onChange={(e) => handleSelect("perfil_creador", e.target.value)}
          >
            {empleados.map((p) => (
              <MenuItem key={p._id} value={p._id}>
                {p.name} {p.lastname} {p.document ? `- ${p.document}` : ""}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Empleado</InputLabel>
          <Select
            value={selectedIds.perfil_empleado}
            onChange={(e) => handleSelect("perfil_empleado", e.target.value)}
          >
            {empleados.map((p) => (
              <MenuItem key={p._id} value={p._id}>
                {p.name} {p.lastname} {p.document ? `- ${p.document}` : ""}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Divider>Tipo / Vacante</Divider>

        <FormControl fullWidth>
          <InputLabel>Tipo de Contrato</InputLabel>
          <Select
            value={selectedIds.tipo_contrato}
            onChange={(e) => handleSelect("tipo_contrato", e.target.value)}
          >
            {tiposContratos.map((t) => (
              <MenuItem key={t._id} value={t._id}>
                {t.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Vacante</InputLabel>
          <Select
            value={selectedIds.vacante}
            onChange={(e) => handleSelect("vacante", e.target.value)}
          >
            <MenuItem value="">
              <em>Sin vacante</em>
            </MenuItem>
            {vacantes.map((v) => (
              <MenuItem key={v._id} value={v._id}>
                {v.tittle || v.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Divider>Información Laboral</Divider>

        <TextField
          label="EPS"
          name="eps"
          select
          fullWidth
          value={formData.eps || ""}
          onChange={handleInput}
        >
          {[
            "Nueva EPS",
            "Sanitas",
            "Sura",
            "Compensar",
            "Salud Total",
            "Coomeva",
            "Medimás",
            "Mutual Ser",
            "Capresoca",
            "Famisanar",
          ].map((eps) => (
            <MenuItem key={eps} value={eps}>
              {eps}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="ARL"
          name="arl"
          select
          fullWidth
          value={formData.arl || ""}
          onChange={handleInput}
        >
          {["Sura", "Bolívar", "Colmena", "Positiva", "Equidad", "Mapfre"].map(
            (arl) => (
              <MenuItem key={arl} value={arl}>
                {arl}
              </MenuItem>
            )
          )}
        </TextField>

        <TextField
          label="Estrato"
          name="estrato"
          select
          fullWidth
          value={formData.estrato || 1}
          onChange={handleInput}
        >
          {estratoList.map((n) => (
            <MenuItem key={n} value={n}>
              {n}
            </MenuItem>
          ))}
        </TextField>

        <Divider>Fechas</Divider>

        <TextField
          label="Fecha Inicio"
          name="start_date"
          type="date"
          value={formData.start_date || ""}
          onChange={handleInput}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="Fecha Fin"
          name="end_date"
          type="date"
          value={formData.end_date || ""}
          onChange={handleInput}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />

        <Divider>Firmas (dibujar con mouse / touch)</Divider>

        <Stack direction="column" spacing={1}>
          <Box>
            <Typography variant="subtitle2">Firma Empleado</Typography>
            <Box
              sx={{
                border: "1px solid rgba(0,0,0,0.12)",
                width: canvasWidth,
                height: canvasHeight,
                position: "relative",
                mb: 1,
              }}
            >
              <canvas
                ref={canvasEmpleadoRef}
                width={canvasWidth}
                height={canvasHeight}
                style={{
                  touchAction: "none",
                  width: "100%",
                  height: "100%",
                  display: "block",
                }}
                onMouseDown={startDrawEmpleado}
                onMouseMove={moveDrawEmpleado}
                onMouseUp={endDrawEmpleado}
                onMouseLeave={endDrawEmpleado}
                onTouchStart={startDrawEmpleado}
                onTouchMove={moveDrawEmpleado}
                onTouchEnd={endDrawEmpleado}
              />
            </Box>
            <Button
              variant="contained"
              color="inherit"
              size="small"
              onClick={clearFirmaEmpleado}
            >
              Limpiar Firma
            </Button>
          </Box>

          <Box>
            <Typography variant="subtitle2">Firma Empleador</Typography>
            <Box
              sx={{
                border: "1px solid rgba(0,0,0,0.12)",
                width: canvasWidth,
                height: canvasHeight,
                position: "relative",
                mb: 1,
              }}
            >
              <canvas
                ref={canvasEmpleadorRef}
                width={canvasWidth}
                height={canvasHeight}
                style={{
                  touchAction: "none",
                  width: "100%",
                  height: "100%",
                  display: "block",
                }}
                onMouseDown={startDrawEmpleador}
                onMouseMove={moveDrawEmpleador}
                onMouseUp={endDrawEmpleador}
                onMouseLeave={endDrawEmpleador}
                onTouchStart={startDrawEmpleador}
                onTouchMove={moveDrawEmpleador}
                onTouchEnd={endDrawEmpleador}
              />
            </Box>
            <Button
              variant="contained"
              color="inherit"
              size="small"
              onClick={clearFirmaEmpleador}
            >
              Limpiar Firma
            </Button>
          </Box>
        </Stack>

        <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
          <Button
            onClick={onClose}
            color="error"
            fullWidth
            variant="outlined"
            disabled={isSaving}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleGuardar}
            fullWidth
            variant="contained"
            disabled={isSaving}
          >
            {isSaving ? "Guardando..." : isEditMode ? "Actualizar" : "Crear"}
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default ContratoFormDrawer;