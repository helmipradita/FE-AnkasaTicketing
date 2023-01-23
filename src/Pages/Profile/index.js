import React, { useEffect, useState } from "react";
import Footer from "../../Components/base/footer";
import NavbarComponent from "../../Components/base/header";
import ProfileCard from "../../Components/module/profileCard";
import styles from "./Profile.module.css";
import { useSelector, useDispatch } from "react-redux";
import { detailProfile, editProfile } from "../../Config/redux/actions/profile";
import NavbarComponentAdmin from "../../Components/base/header/headerAdmin";

const Profile = (props) => {
  // const navigate = useNavigate();
  const { profile } = useSelector((state) => state.profile);
  const id = profile.id;
  // console.log("console di page profile", id);
  const dispatch = useDispatch();

  const [dataProfile, setDataPofile] = useState({
    fullname: profile.fullname,
    email: profile.email,
    phone: profile.phone,
    city: profile.city,
    address: profile.address,
    poscode: profile.poscode,
    photo: profile.photo,
  });

  console.log(dataProfile);

  const [file, setFile] = useState({
    file: null,
    priview: "",
  });

  const handleUploadChange = (e) => {
    console.log(e.target.files[0]);
    let upload = e.target.files[0];
    setFile(upload);
  };

  const handleData = (e) => {
    e.preventDefault();
    const localdata = localStorage.getItem("Ankasa");
    const { token } = JSON.parse(localdata);
    // console.log(id);
    const formData = new FormData();
    formData.append("fullname", dataProfile.fullname);
    formData.append("email", dataProfile.email);
    formData.append("phone", dataProfile.phone);
    formData.append("city", dataProfile.city);
    formData.append("address", dataProfile.address);
    formData.append("poscode", dataProfile.poscode);
    formData.append("photo", file);
    dispatch(editProfile(id, formData, token));
    dispatch(detailProfile(token));
    // .then(() => navigate("/profile"));
  };

  const handleChange = (e) => {
    const newdata = { ...dataProfile };
    newdata[e.target.name] = e.target.value;
    setDataPofile(newdata);
  };
  // const token = localStorage.getItem("Ankasa");

  useEffect(() => {
    const localdata = localStorage.getItem("Ankasa");
    const { token } = JSON.parse(localdata);
    dispatch(detailProfile(token));
  }, []);

  return (
    <div className={styles.pageProfile}>
      <nav className="px-5 py-3">
        {profile.role === "admin" ? (
          <NavbarComponentAdmin />
        ) : (
          <NavbarComponent />
        )}
      </nav>
      <form>
        <div className={styles.content}>
          <div className={styles.profileContent}>
            <ProfileCard
              fullname={profile.fullname}
              city={profile.city}
              address={profile.address}
              profImg={profile.photo}
              noCard="4441 1235 5512 5551"
              typeCard="Z"
              saldoCard="1,440,2"
              onChange={handleUploadChange}
            />
          </div>
          <div className={styles.profileFrom}>
            <p>Profile</p>
            <div className={styles.orderTitle}>
              <div className={styles.titleProfile}>Profile</div>
            </div>
            <div className={styles.profileUdpate}>
              <div className={styles.contact}>
                <div>Contact</div>
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    label="Email"
                    placeholder={profile.email}
                    className={styles.inputProfile}
                    onChange={(e) => handleChange(e)}
                    value={dataProfile.email}
                  />
                  <label htmlFor="phone">Phone Number</label>

                  <input
                    type="text"
                    name="phone"
                    label="Phone Number"
                    placeholder={profile.phone}
                    className={styles.inputProfile}
                    onChange={(e) => handleChange(e)}
                    value={dataProfile.phone}
                  />
                  <span>Acoount Setting</span>
                </div>
              </div>
              <div className={styles.biodata}>
                <div>Biodata</div>
                <div>
                  <label htmlFor="fullname">Full name</label>

                  <input
                    type="text"
                    name="fullname"
                    label="Fullname"
                    placeholder={profile.fullname}
                    className={styles.inputProfile}
                    onChange={(e) => handleChange(e)}
                    value={dataProfile.fullname}
                  />
                  <label htmlFor="city">City</label>

                  <input
                    type="text"
                    name="city"
                    label="City"
                    placeholder={profile.city}
                    className={styles.inputProfile}
                    onChange={(e) => handleChange(e)}
                    value={dataProfile.city}
                  />
                  <label htmlFor="address">Address</label>

                  <input
                    type="text"
                    name="address"
                    placeholder={profile.address}
                    className={styles.inputProfile}
                    onChange={(e) => handleChange(e)}
                    value={dataProfile.address}
                  />
                  <label htmlFor="poscode">Post Code</label>

                  <input
                    type="text"
                    name="poscode"
                    label="Post Code"
                    placeholder={profile.poscode}
                    className={styles.inputProfile}
                    onChange={(e) => handleChange(e)}
                    value={dataProfile.poscode}
                  />
                  <button
                    title="Save"
                    className={styles.saveProfile}
                    onClick={(e) => handleData(e)}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default Profile;
