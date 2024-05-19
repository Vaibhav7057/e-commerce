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
    <div className="w-full h-full flex gap-2 flex-col p-2 bg-slate-400 overflow-hidden ">
      <div className="flex justify-between px-3 py-1 bg-white rounded-md ">
        <p>all Users</p> <button className="px-2 py-1">add new user</button>
      </div>

      {users.length > 0 && (
        <table className="usertable border border-slate-600">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Suspended</th>
            <th>Take action</th>
          </tr>

          {users?.map((user, i) => (
            <tr key={i * 24}>
              <td data-cell="Name">{user.fullName}</td>
              <td data-cell="Email">{user.email}</td>
              <td data-cell="Suspended">{user.role}</td>
              <td data-cell="Role">{user.isSuspended ? "True" : "False"}</td>
              <td data-cell="Take action">
                <button>Edit</button>
              </td>
            </tr>
          ))}
        </table>
      )}
    </div>
  );
};

export default GetAllUsers;
