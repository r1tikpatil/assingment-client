import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./page2.styles.css";

const Page2 = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://assingment-server.herokuapp.com/alluser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  setInterval(() => {
    fetch("https://assingment-server.herokuapp.com/alluser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, 3600000);

  const onSearch = (name) => {
    setSearch(name);
    fetch("https://assingment-server.herokuapp.com/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUsers(data.users);
      });
  };

  return (
    <>
      <div className="input-field auth-card  search-div">
        <span>
          <i
            class="material-icons"
            style={{ fontSize: "1.5em", fontWeight: "500" }}
          >
            search
          </i>
        </span>
        <input
          className="search"
          type="search"
          value={search}
          placeholder="search by name"
          onChange={(e) => {
            onSearch(e.target.value);
          }}
        />
      </div>
      <table className="highlight centered table">
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Employee Id</th>
            <th>Date Of Birth</th>
            <th>Designation</th>
            <th>Organization</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Time Of Entry</th>
          </tr>
        </thead>

        {users &&
          users.map((user) => {
            return (
              <tbody>
                <tr>
                  <td>
                    <div className="image">
                      <img
                        className="materialboxed"
                        alt="user"
                        src={user.pic}
                      />
                    </div>
                  </td>
                  <td>{user.name}</td>
                  <td>{user.employeeId}</td>
                  <td>{user.dob}</td>
                  <td>{user.designation}</td>
                  <td>{user.organization}</td>
                  <td>{user.gender}</td>
                  <td>{user.age}</td>
                  <td>{user.toe}</td>
                </tr>
              </tbody>
            );
          })}
      </table>
      <a
        className="waves-effect waves-light btn page2btn"
        onClick={() => {
          navigate("/");
        }}
      >
        Go Back
      </a>
    </>
  );
};

export default Page2;
