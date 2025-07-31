import instance from "./axios";

export const createFriendship = async (friend: Friend) => {
    return instance.post("/friend/", friend);
};

export const deleteFriendship = async (friend: Friend) => {
    return instance.delete("/friend/", { data: friend });
};
