import apiSchool from "@/lib/apiClient";
import React, { useRef, useState } from "react";

function SelectUniversity() {
  const [schools, setSchools] = useState([]);
  const schoolref = useRef<HTMLInputElement>(null);
  const schoolSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await apiSchool
      .get(
        `https://api.edu-data.jp/api/v1/school?keyword=${schoolref.current?.value}`
      )
      .then((response) => {
        const selectSchools = response.data.schools.data;
        if (selectSchools.length == 0) {
          // alert("学校名が間違っています");
        } else if (selectSchools.length > 1) {
          // alert("学校が1つに絞れません");
        } else {
          alert("いい感じ");
        }
      });
  };
  const schoolChange = async (e: React.FormEvent<HTMLInputElement>) => {
    await apiSchool
      .get(
        `https://api.edu-data.jp/api/v1/school?keyword=${schoolref.current?.value}`
      )
      .then((response) => {
        setSchools(response.data.schools.data);
      });
  };
  return (
    <div className="bg-gray-100 w-[20rem] h-40 mx-auto rounded-xl">
      <form action="" onClick={schoolSubmit} className="pt-8">
        <input
          className="block mx-auto py-2 rounded mb-6 outline-teal-300 transition-all duration-1000"
          size={30}
          type="text"
          onChange={schoolChange}
          name="university"
          id="university"
          list="school"
          ref={schoolref}
          placeholder="学校名を入力してくださ"
        />
        <datalist id="school">
          {schools.map((school: any) => (
            <option
              value={school.school_name}
              key={school.school_code}
            ></option>
          ))}
        </datalist>
        <input
          type="submit"
          value="送信"
          className="py-2 px-4 bg-gray-300 rounded hover:shadow-lg hover:bg-gray-200 hover:-translate-y-1 transition-all"
        />
      </form>
    </div>
  );
}

export default SelectUniversity;
