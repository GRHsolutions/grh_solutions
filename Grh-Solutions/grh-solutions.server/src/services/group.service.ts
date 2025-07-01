import {get} from "http";
import { groupsModel } from "../models/group.model";
import { GroupFilter } from "../filters/group.filter";

export const groupService = {
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