import { NewsModel } from "../models/new.model";
import { newsFilter } from "../filters/news.filter";

export const newsService = {
  getAll: async (filter: newsFilter) => {
    const query: any = {
      status: "shown",
    };

    if(filter.page == 0){
      throw new Error("Se desconoce la pagina a la que se intenta acceder");
    }

    if(filter.limit == 0){
      throw new Error("No hay limite presente por lo que no se procede");
    }

    if (filter.search && filter.search.trim() !== "") {
      const regex = new RegExp(filter.search, "i"); // Usamos filter.search, no filter.name
      query.$or = [{ title: regex }, { description: regex }];
    }

    const skip = (filter.page - 1) * filter.limit;

    const data = await NewsModel.find(query) // TRAE TODOS LOS ITEMS
      .populate("madeBy", "name email") // aquí seleccionas qué campos del usuario mostrar
      .sort({ date: -1 }) // 🔹 orden descendente (más recientes primero)
      .skip(skip)
      .limit(filter.limit);

    const totalItems = await NewsModel.countDocuments(query) // CUENTA TODOS LOS DOCUMENTOS DE ACUERDO AL FILTRO APLICADO.
      .populate("madeBy", "name email") // aquí seleccionas qué campos del usuario mostrar
      .sort({ date: -1 }) // 🔹 orden descendente (más recientes primero)

    return {
      data,
      totalPages: Math.ceil(totalItems / filter.limit) // DEVUELVE EL TOTAL DE PAGINAS, ESTO SE USARA EN EL FEED DE NEWS
    };
  },

  create: async (entity: object) => {
    const newNew = new NewsModel(entity);
    console.log(newNew);

    return NewsModel.create(newNew);
  },

  delete: async (id: number) => {
    const conf = await NewsModel.findByIdAndUpdate(
      id,
      { status: "deleted" }, // cambia el estado
      { new: true }      // devuelve el documento actualizado
    );

    if(conf){
      return conf;
    };
  },
};
