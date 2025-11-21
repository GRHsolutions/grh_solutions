import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import {
  Instagram,
  Facebook,
  LinkedIn,
  Twitter,
  YouTube,
  WhatsApp,
} from "@mui/icons-material";
import { Box, useTheme } from "@mui/material";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./index.styles.scss";
import DownloadIcon from '@mui/icons-material/Download';
import disolinImage from "../../img/disolin.jpg";
import disolinImage2 from "../../img/disolin2.png";
import { FloatingButton } from "../../generics/floatingButton/floatingButton";

export default function Index() {
  const theme = useTheme();
  return (
    <div className="background">
      <div className="overlay"></div>
      <div className="content">
        <div className="main-container">
          <div className="carousel-container">
            <Swiper
              modules={[Pagination, Navigation, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              loop={true}
              autoplay={{ delay: 3000 }}
              pagination={{ clickable: true }}
              navigation
            >
              <SwiperSlide>
                <img
                  src={disolinImage}
                  alt="Imagen 1"
                  className="carousel-img"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src={disolinImage2}
                  alt="Imagen 2"
                  className="carousel-img"
                />
              </SwiperSlide>
            </Swiper>
          </div>

          <div className="text-container">
            <h1 className="title">Disolin</h1>
            <p className="description">
              Disolin es una empresa dedicada a la distribución y monitoreo de
              máquinas expendedoras. Actualmente, se encuentra en crecimiento,
              pero enfrenta desafíos en la gestión de recursos humanos.
            </p>
          </div>
        </div>
      </div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
          height: "100%",
          width: "100%",
          fontSize: "2rem",
          fontFamily: theme.typography.fontFamily,
          color: theme.palette.primary.contrastText,
          position: "relative", // Solo si es necesario
          zIndex: 1, // Asegúrate de que este z-index sea menor que el contenido principal
        }}
      >
        <footer className="footer">
          <p className="contact-title">
            <strong>Contáctanos.</strong>
          </p>
          <div className="contact-section">
            <div className="contact-info">
              <p>
                <strong>Correo:</strong>
                <a href="mailto:disolin.asociados@gmail.com">
                  {" "}
                  disolin.asociados@gmail.com
                </a>
              </p>
              <p>
                <strong>Teléfono:</strong>
                <a href="tel:86756434567"> 86756434567</a>
              </p>
            </div>
            <div className="social-icons">
              <a href="https://www.instagram.com" target="_blank">
                <Instagram sx={{ color: theme.palette.text.primary }} />
              </a>
              <a href="https://www.facebook.com" target="_blank">
                <Facebook sx={{ color: theme.palette.text.primary }} />
              </a>
              <a href="https://www.linkedin.com" target="_blank">
                <LinkedIn sx={{ color: theme.palette.text.primary }} />
              </a>
              <a href="https://twitter.com" target="_blank">
                <Twitter sx={{ color: theme.palette.text.primary }} />
              </a>
              <a href="https://www.youtube.com" target="_blank">
                <YouTube sx={{ color: theme.palette.text.primary }} />
              </a>
              <a href="https://wa.me/86756434567" target="_blank">
                <WhatsApp sx={{ color: theme.palette.text.primary }} />
              </a>
            </div>
          </div>
        </footer>
      </Box>
      <FloatingButton
        labelP="right"
        bgColor={theme.palette.secondary.main}
        borderColor={theme.palette.secondary.hover}
        positions={{
          right: "2.2rem",
          bottom: "2.2rem",
        }}
        onClick={() => {
          window.open("https://drive.google.com/drive/folders/1TA0huK9dhxuWU0KmyAkGLHsrvRlKQY8p", "_blank");
        }}
        label="Descargar android"
        icon={<DownloadIcon />}
      />
    </div>
  );
}
