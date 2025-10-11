import React from "react";
import {
  Birthday,
  Commentary,
  NewForm,
  News,
} from "../domain/models/news/news.entities";
import { Errors } from "../domain/models/error/error.entities";
import { useSearchParams } from "react-router-dom";
import { NewRepository } from "../infrastructure/repositories/news/news";
import { NewsService } from "../domain/services/news/news.service";

interface CurrentProps {
  item: News | null;
  action: "create" | "view" | "delete" | "none" | string;
  id?: string;
}

interface LoadingStates {
  list: boolean;
  fetch_more: boolean;
  fetch_comments: boolean;
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
  loading: LoadingStates;
  fechMore: () => void;
  hasMore: boolean;

  handleCreate: (n: NewForm) => void;
  handleBruteReload: () => void;
}

export const NewsContext = React.createContext<NewsItems | undefined>(
  undefined
);

export const NewsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [news, setNews] = React.useState<News[]>([]);
  const [loading, setLoading] = React.useState<LoadingStates>({
    list: false,
    fetch_more: false,
    fetch_comments: false,
  });
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
        const response = await service.getBirths();

        setBirthdays(response);
      } catch (e) {
        console.error(e);
        setStatus({
          message: "Error al cargar el objeto",
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
    setLoading({
      ...loading,
      list: true,
    });

    const controller = new AbortController();
    const { signal } = controller;

    const fetchNews = async () => {
      try {
        const response = await service.get(
          {
            page,
            limit: 10,
          },
          signal
        );
        setNews((prev) => {
          const newsMap = new Map();

          // Agregamos primero el estado anterior
          prev.forEach((item) => {
            newsMap.set(item._id, item);
          });

          // Agregamos los nuevos items
          response.data.forEach((item) => {
            const existing = newsMap.get(item._id);

            if (
              !existing ||
              new Date(item.createdAt) > new Date(existing.createdAt)
            ) {
              // Solo lo reemplaza si es más reciente
              newsMap.set(item._id, item);
            }
          });

          // Convertir de vuelta a array
          const merged = Array.from(newsMap.values());

          // Ordenar por fecha descendente (más reciente primero)
          merged.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

          return merged;
        });

        if (page >= response.totalPages) setHasMore(false);
      } catch (e) {
        console.error(e);
        setStatus({
          message: "Error al cargar el objeto",
        });
      } finally {
        setLoading({
          list: false,
          fetch_more: false,
          fetch_comments: false,
        });
      }
    };

    fetchNews();

    // Cleanup para abortar fetch si el componente se desmonta o cambia page
    return () => controller.abort();
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
    setLoading({
      ...loading,
      fetch_more: true,
    });
    setPage(page + 1);
  };

  const handleBruteReload = () => {
    setNews([]);
    setPage(1);
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
    handleCreate,
    handleBruteReload,
  };

  return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>;
};
