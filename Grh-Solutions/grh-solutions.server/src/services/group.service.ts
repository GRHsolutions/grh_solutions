import {get} from "http";
import { groupsModel } from "../models/group.model";
import { GroupFilter } from "../filters/group.filter";

export const groupService = {
  getAll: async (filter: GroupFilter) => {
    const query: any = {};

    console.log(filter.name)

    if (filter.name && filter.name.trim() !== '') {
      query.$or = [{ name: new RegExp(filter.name, 'i') }]; // Búsqueda insensible a mayúsculas
    }

    return await groupsModel.find(query);
  },
    create : async (entity: object) => {
        return await groupsModel.create(entity);
    },
    delete : async (id: string) => {
        return await groupsModel.findByIdAndDelete(id);
    },
    deleteUserFromGroup : async (groupId: string, userId: string) => {
        return await groupsModel.findOneAndUpdate({ _id: groupId }, { $pull: { users: userId } }, { new: true }); 
    },
}