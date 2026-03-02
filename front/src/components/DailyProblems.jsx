import React, { useEffect, useState } from "react";
import API from "../api/api";
import { CheckCircle2 } from "lucide-react";

const DailyProblems = () => {

  const [problems,setProblems] = useState([]);

  useEffect(()=>{
    fetchProblems();
  },[])

  const fetchProblems = async ()=>{
    const res = await API.get("/problems/today");
    setProblems(res.data);
  }

  const markDone = async(id)=>{
    await API.post(`/problems/complete/${id}`);

    setProblems(prev =>
      prev.map(p =>
        p._id === id ? { ...p, completed: true } : p
      )
    );
  }

  return (
    <div className="  ">

      <h2 className="text-lg font-semibold mb-4">
        Daily DSA Problems
      </h2>

      <div className="space-y-3">

        {problems.map((p)=>(

          <div
          key={p._id}
          className="flex justify-between items-center bg-gray-50 p-3 rounded-xl">

            <div>
              <p className="font-medium">{p.title}</p>
              <span className="text-xs text-gray-500">{p.difficulty}</span>
            </div>

            <div className="flex gap-2">

              
              <a
  href={p.leetcodeLink}
  target="_blank"
  rel="noopener noreferrer"
  className="text-xs bg-black text-white px-3 py-1 rounded-lg"
>
  Solve
</a>

              {!p.completed ? (

                <button
                  onClick={()=>markDone(p._id)}
                  className="text-xs bg-yellow-400 px-3 py-1 rounded-lg hover:bg-yellow-500"
                >
                  Done
                </button>

              ):(
                <div className="flex items-center gap-1 text-green-500 text-xs font-medium">

                  <CheckCircle2 size={16}/>
                  Solved

                </div>
              )}

            </div>

          </div>

        ))}

      </div>
    </div>
  )
}

export default DailyProblems;