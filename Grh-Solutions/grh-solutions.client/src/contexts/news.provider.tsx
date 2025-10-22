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
import { useSyncedLocalStorage } from "../hooks/synclocalstorage";

interface CurrentProps {
  item: News | null;
  action: "create" | "view" | "delete" | "edit" | "none" | string;
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
  newComment: (comment: string) => void;
  loading: LoadingStates;
  fechMore: () => void;
  fechMoreComments: () => void;
  hasMore: boolean;
  hasMoreC: boolean;

  handleCreate: (n: NewForm) => void;
  handleBruteReload: ({
    reseturl,
    resetList,
  }: {
    reseturl: boolean;
    resetList?: boolean;
  }) => void;

  selectItemToUpdate: (id: string) => void;

  handleEdit: (id: string, n: NewForm) => void;
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
  const search = useSyncedLocalStorage<string>("search", "");

  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);

  const [pageC, setPageC] = React.useState(1);
  const [hasMoreC, setHasMoreC] = React.useState(false);

  const [userReloadC, setUseReloadC] = React.useState(false);

  const service = new NewsService(new NewRepository());

  React.useEffect(() => {
    if (current.item == null && current.action != "view") {
      setComments([]);
      return;
    }

    setLoading({
      ...loading,
      fetch_comments: true,
    });

    const controller = new AbortController();
    const { signal } = controller;

    const fetchComm = async () => {
      try {
        console.log("trayendo commentarios");
        const response = await service.getComments(
          {
            page: pageC,
            limit: 10,
            new: current.item?._id,
          },
          signal
        );

        setComments((prev) => {
          const newsMap = new Map();

          // Agregamos primero el estado anterior
          prev.forEach((item) => {
            newsMap.set(item._id, item);
          });

          // Agregamos los nuevos items
          response.data.forEach((item: Commentary) => {
            const existing = newsMap.get(item);

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
          merged.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );

          return merged;
        });
        setHasMoreC(pageC < response.totalPages);
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

    fetchComm();

    // Cleanup para abortar fetch si el componente se desmonta o cambia page
    return () => controller.abort();
  }, [current.item, pageC, userReloadC]);

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
            search: search,
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
          merged.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );

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

  React.useEffect(() => {
    setNews([]);
    setPage(1);
    handleReload();
  }, [search]);

  const newComment = async (comment: string) => {
    if (current.item == null) {
      return;
    }

    await service
      .createComment({
        comment: comment,
        fromNew: current.item._id,
      })
      .then((e) => {
        console.log(e);
        if (e) {
          handleReloadComms();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  React.useEffect(() => {
    console.log(news);
  }, [news]);

  const handleEdit = async (id: string, n: NewForm) => {
    try {
      const updated = await service.edit(id, n);

      if (updated) {
        setNews((prev) => {
          console.log("Prev before update:", prev);
          const updatedList = prev.map((item) =>
            item._id === id ? updated : item
          );
          console.log("Updated list:", updatedList);
          return updatedList;
        });
      }
    } catch (error: any) {
      console.error(error.toString());
      setStatus({
        message: "Error al actualizar la noticia",
        statusCode: 500,
      });
    }
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

  const handleReloadComms = () => {
    setUseReloadC(!userReloadC);
  };

  const SelectItem = async (id: string) => {
    if (id == "") {
      return;
    }

    let selected = news.find((x) => x._id === id);
    if (selected == undefined) {
      // ejecutar busqueda
      selected = await service.getById(id);
    }
    setCurrent({
      action: "view",
      id: id,
      item: selected,
    });
  };

  const selectItemToUpdate = async (id: string) => {
    if (id == "") {
      return;
    }

    let selected = news.find((x) => x._id === id);
    if (selected == undefined) {
      selected = await service.getById(id);
    }

    setCurrent({
      action: "edit",
      id: id,
      item: selected,
    });
  };

  const noCurrnt = (lash?: string) => {
    setComments([]);
    setPageC(1);

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

  const fechMoreComments = () => {
    setLoading({
      ...loading,
      fetch_more: true,
    });
    setPageC(pageC + 1);
  };

  const handleBruteReload = ({
    reseturl,
    resetList = true,
  }: {
    reseturl: boolean;
    resetList?: boolean;
  }) => {
    if (reseturl) {
      setCurrent({
        action: "none",
        id: undefined,
        item: null,
      });
    }
    if (resetList) {
      setNews([]);
      setPage(1);
    }
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
    fechMoreComments,
    hasMore,
    hasMoreC,

    // FORMULARIOS
    handleCreate,
    handleBruteReload,

    // select to update
    selectItemToUpdate,

    // update data
    handleEdit,
  };

  return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>;
};