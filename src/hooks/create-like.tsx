import { LikeEntity } from "@/entities/LikeEntity";
import { api } from "@/services/api";
import React from "react";
import { getPostById } from "./getPostById";

interface CreateLikeRequest {
    authorId: string; 
    postId: string;
}

export async function CreateLike({ authorId, postId }: CreateLikeRequest): Promise<void> {

    const response = await api
    .post("/new/like", {
      authorId,
      postId
    })
    .then(res => res.data);

    if(!response) {
      return;
    }
}