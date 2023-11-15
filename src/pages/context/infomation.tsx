// import React,{ReactNode, useContext, useState} from "react"

// interface InfoProviderProps {
//     children:ReactNode
// }

// interface InfoContextType {
//     schoolData: any
//     setSchoolData:(schoolData:any) => void
// }

// const InfoContext = React.createContext<InfoContextType>({
//     schoolData:"",
//     setSchoolData:()=>{}
// })

// export const useInfo = () =>{
//     return useContext(InfoContext);
// }

// export const InfoProvider = ({children}:InfoProviderProps) =>{
//     const [schoolData,setSchoolData] = useState();
//     const value = {
//         schoolData,
//         setSchoolData,
//     }

//     return <InfoContext.Provider value={value}>{children}</InfoContext.Provider>
// }

