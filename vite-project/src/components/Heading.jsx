import React from "react";

const Heading = ({Heading,SubHeading}) => {
    return(
        <>
        <div className="font-bold text-4xl pt-6">
            {Heading}
        </div>
        <div className="text-gray-600 text-md pt-1 px-4 pb-4">
            {SubHeading}
        </div>
        </>
    )
}

export default Heading