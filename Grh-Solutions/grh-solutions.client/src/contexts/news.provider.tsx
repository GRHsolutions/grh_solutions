import React from "react";
import { Birthday, Commentary, News } from "../domain/models/news/news.entities";
import { Errors } from "../domain/models/error/error.entities";
import dayjs from "dayjs";
import { IMAGENDEPRUEBAPARACOMUNICADOS } from "../const/variables";
import { useSearchParams } from "react-router-dom";

interface CurrentProps {
  item: News | null;
  action: "create" | "view" | "delete" | "none" | string;
  id?: number;
}

interface NewsItems {
  news: News[];
  birthdays: Birthday[];
  comments: Commentary[];
  status: Errors | null;
  reload: () => void;
  current: CurrentProps;
  selectItem: (select: number) => void;
  noCurrnt: (change?: string) => void;
  newComment: (comment: Commentary) => void;
}

export const NewsContext = React.createContext<NewsItems | undefined>(undefined);

export const NewsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [news, setNews] = React.useState<News[]>([]);
  const [status, setStatus] = React.useState<Errors | null>(null);
  const [useReload, setReload] = React.useState(false);
  const [birthdays, setBirthdays] = React.useState<Birthday[]>([]);
  const [current, setCurrent] = React.useState<CurrentProps>({
    item: null,
    action: "none",
    id: undefined
  });
  const [comments, setComments] = React.useState<Commentary[]>([]);
  const [_searchParams, setSearchParams] = useSearchParams();

  // Sincronizar current con los parámetros de búsqueda
  React.useEffect(() => {
    const params = new URLSearchParams();
    
    // Only add id if it exists and is positive
    if (typeof current.id === 'number' && current.id > 0) {
      params.set('id', current.id.toString());
    }
    
    // Only add action if it exists and isn't empty
    if (current.action?.trim()) {
      params.set('action', current.action.trim());
    }
    
    setSearchParams(params);
  }, [current, setSearchParams]);

  React.useEffect(() => {
    const fetchBirthdays = async () => {
      try {
        setBirthdays([
          {
            id: 1,
            name: "Persona 1",
            date: dayjs(),
            photo: "data:image/png;base64,...",
          },
          {
            id: 2,
            name: "Persona 2",
            date: dayjs(),
            photo: "data:image/png;base64,...",
          },
          {
            id: 3,
            name: "Persona 3",
            date: dayjs(),
            photo: "data:image/png;base64,...",
          },
        ]);
      } catch (error) {
        setStatus({
          statusCode: 500,
          message: "Error al cargar los cumpleaños",
        });
      }
    };

    fetchBirthdays();
  }, []);

  React.useEffect(() => {
    if(current.item){
      setComments([
        {
          id: 1,
          comment: "Comentario 1",
          madeBy: 1
        },
        {
          id: 2,
          comment: "Comentario 2",
          madeBy: 1
        },
        {
          id: 3,
          comment: "Comentario 3",
          madeBy: 1
        }
      ])
    } else {
      setComments([]);
    }
  }, [current.item]);

  React.useEffect(() => {
    const fetchNews = async () => {
      try {
        setNews([
          {
            id: 1,
            title: "Noticia 1",
            description: "Lorem ipsum dolor sit amet...",
            images: [{
              base64: IMAGENDEPRUEBAPARACOMUNICADOS,
              name: "prueba",
              type: "png",
              size: 42
            }, ],
            status: "Activa",
            numberLikes: 0,
            numberDisLikes: 0,
            date: dayjs(),
            madeBy: "Pedro Sanchez",
            type: "publication-with-images"
          },
          {
            id: 2,
            title: "Noticia 2",
            description: "Descripción 2",
            images: [],
            status: "Activa",
            numberLikes: 0,
            numberDisLikes: 0,
            date: dayjs(),
            madeBy: "Pedro Sanchez",
            type: "simple-publication"
          },
          {
            id: 3,
            title: "Noticia 3",
            description: "Descripción 3",
            images: [],
            status: "Activa",
            numberLikes: 0,
            numberDisLikes: 0,
            date: dayjs(),
            madeBy: "Pedro Sanchez",
            type: "simple-publication"
          },
        ]);
      } catch (error) {
        setStatus({ statusCode: 500, message: "Error al cargar las noticias" });
      }
    };

    fetchNews();
  }, [useReload]);

  const newComment = (comment: Commentary) => {
    console.log("ajusar servicio para subir: ", comment);
  }

  const handleReload = () => {
    setReload(!useReload);
  };

  const SelectItem = (id: number) => {
    if(id <= 0){
      return;
    }
    
    // get from endpoint    
    const selected = news.find(x => x.id === id)
    if(selected == undefined){
      console.log("NO SE ENCONTRO EL OBJETO")
      setCurrent({
        action: "none",
        id: undefined,
        item: null
      });
      return;
    }
    setCurrent({
      action: "view",
      id: id,
      item: selected
    });
  };

  const noCurrnt = (lash?: string) => {
    console.log(lash)
    setCurrent({
      action: lash != undefined ? lash : 'none',
      id: undefined,
      item: null
    })
  }

  const value: NewsItems = {
    news,
    status,
    reload: handleReload,
    birthdays: birthdays,
    current: current,
    selectItem: SelectItem,
    comments: comments,
    newComment: newComment,
    noCurrnt: noCurrnt
  };

  return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>;
};