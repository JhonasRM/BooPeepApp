import React from "react"

//Tornar o checkdescription opcional.

export interface createPostStateAndSetters {
    createdAt: React.Dispatch<React.SetStateAction<number>>
    //title: React.Dispatch<React.SetStateAction<string>>
    //checktitle: React.Dispatch<React.SetStateAction<string>>
    UserID: React.Dispatch<React.SetStateAction<string>>
    description: React.Dispatch<React.SetStateAction<string>>
    checkdescription: React.Dispatch<React.SetStateAction<string>>
    postId: React.Dispatch<React.SetStateAction<string>>
    local: React.Dispatch<React.SetStateAction<string>>
    status: React.Dispatch<React.SetStateAction<number>>
    
}
