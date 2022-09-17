import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./pag1.styles.css";

const defaultFormFields = {
  employeeId: "",
  name1: "",
  dob: "",
  designation: "",
  organization: "",
  gender: "",
  image: "",
};

const Page1 = () => {
  const navigate = useNavigate();
  const [field, setFields] = useState(defaultFormFields);
  const [url, setUrl] = useState();
  const [pic, setPic] = useState("");
  const { employeeId, name1, dob, designation, organization, image } = field;

  useEffect(() => {
    if (url) submit();
  }, [url]);

  const uploadImage = () => {
    const data = new FormData();
    data.append("file", pic);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "insta-clone-r");
    fetch("https://api.cloudinary.com/v1_1/insta-clone-r/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
        setFields({ ...field, image: data.url });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields({ ...field, [name]: value });
  };

  const submit = async () => {
    if (
      !employeeId ||
      !name1 ||
      !dob ||
      !designation ||
      !organization ||
      !image ||
      !field.gender
    ) {
      alert("All fields are required!");
      return;
    }
    try {
      fetch("/submit", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employeeId,
          name1,
          dob,
          designation,
          organization,
          image,
          gender: field.gender,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          navigate("/allEmployees");
          setFields(defaultFormFields);
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="mycard">
      <div className="card auth-card input-field">
        <h2>Detail</h2>
        <input
          type="text"
          placeholder="Name"
          onChange={handleChange}
          value={name1}
          name="name1"
        />
        <input
          type="text"
          placeholder="Employee Id"
          required
          onChange={handleChange}
          value={employeeId}
          name="employeeId"
        />
        <input
          type="text"
          placeholder="Designation"
          required
          onChange={handleChange}
          value={designation}
          name="designation"
        />
        <input
          type="text"
          placeholder="Organization"
          required
          onChange={handleChange}
          value={organization}
          name="organization"
        />
        <p>
          <label id="dob">Date Of Birth :</label>
          <input
            className="dob"
            type="date"
            placeholder="Date Of Birth"
            required
            onChange={handleChange}
            value={dob}
            name="dob"
          />
        </p>
        <p>
          <label id="gender">Gender :</label>
          <label>
            <input
              name="gender"
              type="radio"
              required
              onChange={handleChange}
              value="M"
            />
            <span className="gender">Male</span>
          </label>
          <label>
            <input
              name="gender"
              type="radio"
              onChange={handleChange}
              value="F"
              required
            />
            <span className="gender">Female</span>
          </label>
        </p>
        <p>
          <label id="upload-profile">Upload Profile :</label>
          <input
            type="file"
            onChange={(e) => setPic(e.target.files[0])}
            name="image"
            accept="image/*"
            className="upload-profile"
          />
        </p>
        <button
          className="waves-effect waves-light btn #64b5f6    darken-1"
          onClick={uploadImage}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Page1;
