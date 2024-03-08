import React, { useState, useEffect } from "react";
import "./Users.css";
import Navbar from "./AdminNav";
import pfimg from "./profile.jpg"

const Users = () => {

  const [data, setData] = useState();
  const [searchResult, setSearchResult] = useState("");
  const [deleteOperation, setDeleteOperation] = useState("")
  const [searchedUserId, setSearchedUserId] = useState(null); 

  const handleAccountDelete = (username) => {

    if(confirm(`Are you sure You want to delete ${username} account?`))
    {
      fetch(`http://127.0.0.1:8000/api/adminuserdelete/${username}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          console.log("User deleted successfully");
          fetch("http://127.0.0.1:8000/api/users/", {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); 
      })
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });

        setDeleteOperation(username)
        
    }
  };








  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/users/", {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); 
      })
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
      console.log(deleteOperation)
  }, [deleteOperation]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/users/", {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); 
      })
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);



  useEffect(() => {
    console.log("response", data);
  }, [data]);


  useEffect(() => {
    if (data) {
      const user = data.find((item) => item.username === searchResult);
      if (user) {
        console.log("found it");
        setSearchedUserId(user.id);
      } else {
        setSearchedUserId(null);
      }
      if (searchResult === "") {
      }
    }
  }, [searchResult, data]);






  return (
    <>
      <Navbar onSearch={setSearchResult} tab="Add Questions" />
      <div className="user-cont">
        {!data
          ? "Loading"
          : data.map((item) =>
              searchResult === "" || deleteOperation === "" ? (
                <div className={`user-card ${'admin' === item.username ? "user-hide" :""}`} key={item.id}>
                  <img
                    src={item.photo ? item.photo : pfimg}
                    alt="Profile"
                    className="user-profile-picture"
                  />
                  <div className="user-details">
                    <h3>
                      {item.first_name} {item.last_name}
                    </h3>
                    <p>@{item.username}</p>
                  </div>
                  <button
                    className="user-delete"
                    onClick={() => handleAccountDelete(item.username)}
                  >
                    Delete
                  </button>
                </div>
              ) : (
                <div
                  className={`user-card ${
                    searchResult === item.username? "" : "user-hide"
                  } ${'admin' === item.username ? "user-hide" :""}`}
                  key={item.id}
                >
                  <img
                    src={item.photo}
                    alt="Profile"
                    className="user-profile-picture"
                  />
                  <div className="user-details">
                    <h2>
                      {item.first_name} {item.last_name}
                    </h2>
                    <p>@{item.username}</p>
                  </div>
                  <button
                    className="user-delete"
                    onClick={() => handleAccountDelete(item.username)}
                  >
                    Delete
                  </button>
                </div>
              )
            )}
      </div>
    </>
  );
};

export default Users;
