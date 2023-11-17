import React from "react";
import Title from "../../shared/Title";

export default function Error404() {
    return (
        <div className="flex w-full text-xl justify-center align-center h-screen">
            <Title title={"404"} />
            <h1>This route doesn&apos;t exists</h1>
        </div>
    );
}
