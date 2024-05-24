import React from "react"

export interface postStateAndSetters {
    //title: React.Dispatch<React.SetStateAction<string>>
    description: React.Dispatch<React.SetStateAction<string>>
    local: React.Dispatch<React.SetStateAction<string>>
    status: React.Dispatch<React.SetStateAction<number>>
    createdAt: React.Dispatch<React.SetStateAction<number>>
}
