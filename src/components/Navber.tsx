import React from "react";

function Navber(school: any) {
  const currentUniversity = school.school.school_name;
  return (
    <div className="w-5/6 mx-auto">
      <h1 className="py-8 text-teal-300 text-5xl font-bold">
        青空教科書　ー{currentUniversity}ー
      </h1>
    </div>
  );
}

export default Navber;
