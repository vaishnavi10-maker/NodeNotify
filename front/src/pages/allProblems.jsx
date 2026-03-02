import React, { useEffect, useState } from "react";
import { CheckCircle2, ExternalLink } from "lucide-react";
import API from "../api/api";

const Problems = () => {

  const [problems, setProblems] = useState([]);
  const [visible, setVisible] = useState(10);

  useEffect(() => {
    API.get("/problems")
      .then(res => setProblems(res.data));
  }, []);

  const toggleSolved = async (id, completed) => {

    const res = await API.patch(
      `/problems/${id}`,
      { completed: !completed }
    );

    setProblems(problems.map(p =>
      p._id === id ? res.data : p
    ));
  };

  return (
    <div className="p-8">
      
      <header className="mb-8">
        <h1 className="text-4xl font-medium text-gray-900">All Problems</h1>
        <p className="text-gray-500 mt-2">Track your DSA problem-solving journey</p>
      </header>

      <div className="bg-white rounded-[2rem] p-6 border border-gray-100">
        
        <div className="space-y-3">
          {problems.slice(0, visible).map((p) => (
            <div 
              key={p._id} 
              className="flex justify-between items-center bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors"
            >
              
              <div className="flex-1">
                <p className="font-medium text-gray-900">{p.title}</p>
                <span className="text-xs text-gray-500">{p.difficulty}</span>
              </div>

              <div className="flex gap-2 items-center">
                
                <a
                  href={p.leetcodeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-1"
                >
                  Solve
                  <ExternalLink size={12} />
                </a>

                <button
                  onClick={() => toggleSolved(p._id, p.completed)}
                  className={`text-xs px-4 py-2 rounded-lg transition-all ${
                    p.completed
                      ? "bg-green-500 text-white hover:bg-green-600"
                      : "bg-yellow-400 text-gray-900 hover:bg-yellow-500"
                  }`}
                >
                  {p.completed ? (
                    <span className="flex items-center gap-1">
                      <CheckCircle2 size={14} />
                      Solved
                    </span>
                  ) : (
                    "Mark Done"
                  )}
                </button>

              </div>

            </div>
          ))}
        </div>

        {visible < problems.length && (
          <button
            onClick={() => setVisible(visible + 10)}
            className="w-full mt-6 bg-gray-900 text-white px-4 py-3 rounded-xl hover:bg-gray-800 transition-colors font-medium"
          >
            Load More ({problems.length - visible} remaining)
          </button>
        )}

      </div>

    </div>
  );
};

export default Problems;
