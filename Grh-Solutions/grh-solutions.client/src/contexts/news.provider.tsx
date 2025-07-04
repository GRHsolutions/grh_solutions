import React from "react";
import { Birthday, Commentary, News, NewsFilter } from "../domain/models/news/news.entities";
import { Errors } from "../domain/models/error/error.entities";
import dayjs from "dayjs";
import { useSearchParams } from "react-router-dom";
import { NewRepository } from "../infrastructure/repositories/news/news";
import { NewsService } from "../domain/services/news/news.service";

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
  loading: boolean;
  changeCurrentPage: (page: number) => void;
}

export const NewsContext = React.createContext<NewsItems | undefined>(undefined);

export const NewsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [news, setNews] = React.useState<News[]>([]);
  const [loading, setLoading] = React.useState(false);
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
  const [filter, setFilter] = React.useState<NewsFilter>({
    currentPage: 1,
    totalPages: 0,
    rowsPerPage: 15,
    useGetAllNoPage: false
  });
  const service = new NewsService(new NewRepository);

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
    if (current.item) {
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
    setLoading(true);
    console.log("ajahahaha")
    const fetchNews = async () => {
      try {
        await service.get(filter).then(e => {
          setNews(e)
        }).catch(e => {
          setStatus({
            message: "Error al cargar el objeto"
          })
        })
      } catch (error) {
        setStatus({ statusCode: 500, message: "Error al cargar las noticias" });
      }
    };
    fetchNews();

  }, [useReload, filter.currentPage]);

  React.useEffect(() => {
    const fetchPagination = async () => {
      try {
        await service.getPagination(filter).then(e => {
          setFilter({
            totalPages: e.totalPages,
            rowsPerPage: e.rowsPerPage
          })
        }).catch(e => {
          setStatus({
            message: "Error al cargar el objeto"
          })
        })
      } catch (error) {
        setStatus({ statusCode: 500, message: "Error al cargar las noticias" });
      }
    }

    fetchPagination();
    setLoading(false);
  }, [useReload]);

  const newComment = (comment: Commentary) => {
    console.log("ajusar servicio para subir: ", comment);
  }

  const handleReload = () => {
    setReload(!useReload);
  };

  const SelectItem = (id: number) => {
    if (id <= 0) {
      return;
    }

    // get from endpoint    
    const selected = news.find(x => x.id === id)
    if (selected == undefined) {
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

  const changeCurrentPage = (page: number) => {
    setFilter({
      ...filter,
      currentPage: page
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
    noCurrnt: noCurrnt,
    loading,               // ✅ Add this
    changeCurrentPage      // ✅ And this
  };

  return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>;
};