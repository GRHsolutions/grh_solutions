import { NewsModel } from "../models/new.model";
import { newsFilter } from "../filters/news.filter";
import { CommentaryModel } from "../models/comentary.model";
import { Types } from "mongoose";
import { ObjectEncodingOptions } from "fs";
import { commentaryController } from "../controllers/commentary.controller";

export const newsService = {
  getAll: async (filter: newsFilter) => {
    const query: any = {
      status: "shown",
    };

    if (filter.page == 0) {
      throw new Error("Se desconoce la pagina a la que se intenta acceder");
    }

    if (filter.limit == 0) {
      throw new Error("No hay limite presente por lo que no se procede");
    }

    if (filter.search && filter.search.trim() !== "") {
      const regex = new RegExp(filter.search, "i"); // Usamos filter.search, no filter.name
      query.$or = [
        {
          title: regex,
        },
        {
          description: regex,
        },
      ];
    }

    const skip = (filter.page - 1) * filter.limit;

    const data = await NewsModel.find(query) // TRAE TODOS LOS ITEMS
      .populate("madeBy", "name email") // aquí seleccionas qué campos del usuario mostrar
      .sort({ date: -1 }) // 🔹 orden descendente (más recientes primero)
      .skip(skip)
      .limit(filter.limit)
      .lean();

    const totalItems = await NewsModel.countDocuments(query); // CUENTA TODOS LOS DOCUMENTOS DE ACUERDO AL FILTRO APLICADO.
    //.populate("madeBy", "name email") // aquí seleccionas qué campos del usuario mostrar
    //.sort({ date: -1 }) // 🔹 orden descendente (más recientes primero)

    // 🔹 Agregamos el conteo de comentarios a cada noticia
    const dataWithComms = await Promise.all(
      data.map(async (news) => {
        const commsCount = await CommentaryModel.countDocuments({
          fromNew: news._id,
        });
        return {
          ...news,
          comms: commsCount, // 👈 agregamos la nueva propiedad
        };
      })
    );

    return {
      data: dataWithComms,
      totalPages: Math.ceil(totalItems / filter.limit), // DEVUELVE EL TOTAL DE PAGINAS, ESTO SE USARA EN EL FEED DE NEWS
    };
  },

  create: async (entity: object) => {
    const newNew = new NewsModel(entity).populate("madeBy", "name email"); // aquí seleccionas qué campos del usuario mostrar;

    return NewsModel.create(newNew);
  },

  delete: async (id: string) => {
    const conf = await NewsModel.findByIdAndUpdate(
      new Types.ObjectId(id),
      { status: "deleted" }, // cambia el estado
      { new: true } // devuelve el documento actualizado
    ).populate("madeBy", "name email"); // aquí seleccionas qué campos del usuario mostrar;

    if (conf) {
      return conf;
    }
  },

  getId: async (id: string) => {
    const d = await NewsModel.findById(new Types.ObjectId(id))
      .populate("madeBy", "name email") // aquí seleccionas qué campos del usuario mostrar
      .lean();

    return d;
  },

  edit: async (id: string, d: object) => {
    // el { new: true } hace que devuelva el documento actualizado
    const updatedNews = await NewsModel.findByIdAndUpdate(id, d, { new: true })
      .populate("madeBy", "name email") // aquí seleccionas qué campos del usuario mostrar;
      .lean();

    if (!updatedNews) {
      throw new Error("Noticia no encontrada");
    }

    const commsCount = await CommentaryModel.countDocuments({
      fromNew: updatedNews._id,
    });

    const re = {
      ...updatedNews,
      comms: commsCount,
    };

    return re;
  },
};
