import React from "react"

//Tornar o checkdescription opcional.

export interface postStateAndSetters {
    //title: React.Dispatch<React.SetStateAction<string>>
    description: React.Dispatch<React.SetStateAction<string>>
    local: React.Dispatch<React.SetStateAction<string>>
}
