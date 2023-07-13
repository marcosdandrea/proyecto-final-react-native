import { createContext, useState } from "react";
import { SECTIONS } from "../constants/sections";

const SectionContext = createContext()

const SectionContextProvider = ({children}) => {

    const [section, setSection] = useState(SECTIONS.Exercises)

    return (
        <SectionContext.Provider value={{section, setSection}}>
            {children}
        </SectionContext.Provider>
    )
}

export default SectionContext
export {SectionContextProvider}