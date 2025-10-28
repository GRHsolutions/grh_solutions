import { ModuleModel } from "../models/module.model";

export const moduleService = {
  create: async (data: {
    name: string;
    description?: string;
    disabled?: boolean;
  }) => {
    const existing = await ModuleModel.findOne({ name: data.name.trim() });

    if (existing) {
      throw new Error("Ya existe un módulo con ese nombre.");
    }

    const created = await ModuleModel.create({
      name: data.name.trim(),
      description: data.description?.trim() || "",
      disabled: data.disabled,
    });

    return created;
  },

  getAll: async (options: {
    name?: string;
    includeDisabled?: boolean | undefined;
  }) => {
    const query: any = {};

    if (options.name) {
      query.name = { $regex: options.name, $options: "i" };
    }
  if (typeof options.includeDisabled === "boolean") {
    query.disabled = options.includeDisabled;
  }

    return await ModuleModel.find(query).sort({ createdAt: -1 });
  },

  getById: async (id: string) => {
    const module = await ModuleModel.findById(id);
    if (!module) {
      throw new Error("Módulo no encontrado");
    }
    return module;
  },

  update: async (
    id: string,
    data: { name?: string; description?: string; disabled?: boolean }
  ) => {
    const updates: any = {};
    if (data.name !== undefined) updates.name = data.name.trim();
    if (data.description !== undefined) updates.description = data.description;
    if (data.disabled !== undefined) updates.disabled = data.disabled;

    const updated = await ModuleModel.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      throw new Error("Módulo no encontrado");
    }

    return updated;
  },

  delete: async (id: string) => {
    const updated = await ModuleModel.findByIdAndUpdate(
      id,
      { disabled: true },
      { new: true }
    );

    if (!updated) {
      throw new Error("Módulo no encontrado");
    }

    return updated;
  },

  getByTerm: async (name: string) => {
    const module = await ModuleModel.findOne({ 
      name 
    })
    .select("_id")
    .lean();

    return module ? module._id : null;
  },
};
