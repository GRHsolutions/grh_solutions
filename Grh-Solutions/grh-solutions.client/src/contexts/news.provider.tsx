import React from "react";
import {
  Birthday,
  Commentary,
  NewForm,
  News,
  NewsFilter,
} from "../domain/models/news/news.entities";
import { Errors } from "../domain/models/error/error.entities";
import dayjs from "dayjs";
import { useSearchParams } from "react-router-dom";
import { NewRepository } from "../infrastructure/repositories/news/news";
import { NewsService } from "../domain/services/news/news.service";

interface CurrentProps {
  item: News | null;
  action: "create" | "view" | "delete" | "none" | string;
  id?: string;
}

interface NewsItems {
  news: News[];
  birthdays: Birthday[];
  comments: Commentary[];
  status: Errors | null;
  reload: () => void;
  current: CurrentProps;
  selectItem: (select: string) => void;
  noCurrnt: (change?: string) => void;
  newComment: (comment: Commentary) => void;
  loading: boolean;
  fechMore: () => void;
  hasMore: boolean;

  handleCreate: (n: NewForm) => void;
}

export const NewsContext = React.createContext<NewsItems | undefined>(
  undefined
);

export const NewsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [news, setNews] = React.useState<News[]>([]);

  const [loading, setLoading] = React.useState(false);
  const [status, setStatus] = React.useState<Errors | null>(null);
  const [useReload, setReload] = React.useState(false);
  const [birthdays, setBirthdays] = React.useState<Birthday[]>([]);
  const [current, setCurrent] = React.useState<CurrentProps>({
    item: null,
    action: "none",
    id: undefined,
  });
  const [comments, setComments] = React.useState<Commentary[]>([]);
  const [_searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);

  const service = new NewsService(new NewRepository());

  // Sincronizar current con los parámetros de búsqueda
  React.useEffect(() => {
    const params = new URLSearchParams();

    // Only add id if it exists and is positive
    if (typeof current.id === "string" && current.id != "") {
      params.set("id", current.id);
    }

    // Only add action if it exists and isn't empty
    if (current.action?.trim()) {
      params.set("action", current.action.trim());
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
    if (current.item) {
      setComments([
        {
          id: 1,
          comment: "Comentario 1",
          madeBy: 1,
        },
        {
          id: 2,
          comment: "Comentario 2",
          madeBy: 1,
        },
        {
          id: 3,
          comment: "Comentario 3",
          madeBy: 1,
        },
      ]);
    } else {
      setComments([]);
    }
  }, [current.item]);

  React.useEffect(() => {
    setLoading(true);
    const fetchNews = async () => {
      try {
        await service
          .get({
            page,
            limit: 10,
          })
          .then((e) => {
            setNews((prev) => [...prev, ...e.data]); // agrega al listado los nuevos elementos
            if (page >= e.totalPages) setHasMore(false); // verifica la cantidad de elementos si hay mas por mostrar
          })
          .catch((e) => {
            setStatus({
              message: "Error al cargar el objeto",
            });
          });
      } catch (error) {
        setStatus({ statusCode: 500, message: "Error al cargar las noticias" });
      }
    };
    fetchNews();
  }, [useReload, page]);

  const newComment = (comment: Commentary) => {
    console.log("ajusar servicio para subir: ", comment);
  };

  const handleCreate = async (n: NewForm) => {
    try {
      await service
        .create(n)
        .then((e) => {
          if (e) {
            handleReload();
          }
        })
        .catch((e) => {
          console.error(e.toString());
          setStatus({
            message: "Error al cargar el objeto",
          });
        });
    } catch (error) {
      setStatus({ statusCode: 500, message: "Error al cargar las noticias" });
    }
  };

  const handleReload = () => {
    setReload(!useReload);
  };

  const SelectItem = (id: string) => {
    if (id == "") {
      return;
    }

    // get from endpoint
    const selected = news.find((x) => x._id === id);
    if (selected == undefined) {
      console.log("NO SE ENCONTRO EL OBJETO");
      setCurrent({
        action: "none",
        id: undefined,
        item: null,
      });
      return;
    }
    setCurrent({
      action: "view",
      id: id,
      item: selected,
    });
  };

  const noCurrnt = (lash?: string) => {
    console.log(lash);
    setCurrent({
      action: lash != undefined ? lash : "none",
      id: undefined,
      item: null,
    });
  };

  const fechMore = () => {
    setPage(page + 1);
  };

  const value: NewsItems = {
    news,
    status,
    reload: handleReload,
    birthdays: birthdays,
    current: current,
    selectItem: SelectItem,
    comments: comments,
    newComment: newComment,
    noCurrnt: noCurrnt,
    loading, // ✅ Add this
    fechMore, // ✅ And this
    hasMore,

    // FORMULARIOS
    handleCreate
  };

  return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>;
};
