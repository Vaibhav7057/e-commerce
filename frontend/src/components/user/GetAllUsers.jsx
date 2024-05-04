import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const GetAllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let ismounted = true;
    const controller = new AbortController();

    const getUsers = () => {
      axios
        .get("/api/user/getallusers", {
          signal: controller.signal,
        })
        .then((res) => {
          console.log(res.data);
          ismounted && setUsers(res.data.users);
          toast.success("users fetched successfully!");
        })
        .catch((err) => {
          let error = err.response?.data;
          if (!error) {
            toast.error(err.response?.statusText);
          } else {
            toast.error(error.message);
          }
        });
    };
    getUsers();
    return () => {
      controller.abort();
      ismounted = false;
    };
  }, []);

  return (
    <div className="w-full h-full flex gap-2 flex-col p-2 bg-slate-400 ">
      <div className="flex justify-between px-3 py-1 bg-white rounded-md ">
        <p>all Users</p> <button className="px-2 py-1">add new user</button>
      </div>

      {users.length > 0 && (
        <div className="flex flex-wrap bg-white rounded-md ">
          {users?.map((item, i) => (
            <div
              key={i * 31}
              className="w-[100px] h-[300px] border border-slate-500 pb-2 "
            >
              <div className="w-full h-[150px] ">
                <img
                  src="/images/user.png"
                  alt="admin photo"
                  className="w-full"
                />
              </div>
              <p className="px-2 mt-2">{item.title}</p>
              <p className="px-2 mt-2">{item.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetAllUsers;
