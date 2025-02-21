import React from "react";

interface ContainerProps {
  children : React.ReactNode;
}


const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="flex justify-center items-center min-h-[90vh] -mb-32 custom-background">
      <div className="w-full my-10 max-w-md bg-white p-8 shadow-2xl rounded-sm">
        {children}
      </div>
    </div>
  )
}


export default Container