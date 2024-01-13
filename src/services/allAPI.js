import { commomAPI } from "./commonAPI"
import { serverURL } from "./serverURL"


export const getAllBlog = async ()=>{
    return await commomAPI("GET",`${serverURL}/products`,"")
}

export const editBlog = async (blogId, updatedData) => {
    return await commomAPI("PUT", `${serverURL}/products/${blogId}`, updatedData);
}

