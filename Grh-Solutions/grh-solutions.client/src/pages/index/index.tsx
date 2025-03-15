import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { Instagram, Facebook, LinkedIn, Twitter, YouTube, WhatsApp } from "@mui/icons-material";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./index.styles.scss";

import disolinImage from '../../img/disolin.jpg';
import disolinImage2 from '../../img/disolin2.png';
import disolinImage3 from '../../img/disloin3.jpg';

export default function Index() {
  return (
    <div className="background">
      <div className="content">
        <h1 className="title">Disolin</h1>

        {/* Carrusel de imágenes */}
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
              <img src={disolinImage} alt="Imagen 1" className="carousel-img" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={disolinImage2} alt="Imagen 2" className="carousel-img" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={disolinImage3} alt="Imagen 3" className="carousel-img" />
            </SwiperSlide>
          </Swiper>
        </div>

        <p className="description">
          Disolin es una empresa dedicada a la distribución y monitoreo de máquinas expendedoras.
          Actualmente, se encuentra en crecimiento, pero enfrenta desafíos en la gestión de recursos humanos.
        </p>
      </div>

      <footer className="footer">
        <p className="contact-title"><strong>Contáctanos.</strong></p>

        <div className="contact-section">
          <div className="contact-info">
            <p>
              <strong>Correo:</strong>
              <a href="mailto:disolin.asociados@gmail.com"> disolin.asociados@gmail.com</a>
            </p>
            <p>
              <strong>Teléfono:</strong>
              <a href="tel:86756434567"> 86756434567</a>
            </p>
          </div>

          <div className="social-icons">
            <a href="https://www.instagram.com" target="_blank"><Instagram /></a>
            <a href="https://www.facebook.com" target="_blank"><Facebook /></a>
            <a href="https://www.linkedin.com" target="_blank"><LinkedIn /></a>
            <a href="https://twitter.com" target="_blank"><Twitter /></a>
            <a href="https://www.youtube.com" target="_blank"><YouTube /></a>
            <a href="https://wa.me/86756434567" target="_blank"><WhatsApp /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
