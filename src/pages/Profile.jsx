import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ArrowBackIos, Upload } from "@mui/icons-material";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { baseURL } from "../api/axios";
import { useNavigate } from "react-router-dom";
import ModalWrapper from "../components/ModalWrapper";
import Loading from "../components/Loading";
import { updateUserProfile } from "../redux/slices/auth/authActions";
import axios from "../api/axios";

const FiledRow = (props) => {
  return (
    <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row items-start md:items-center">
      <div className="flex-1 flex flex-col">
        <p className="font-heading text-black text-xl">{props.fieldName}</p>
        <p className="font-text text-text text-sm">{props.fieldDes}</p>
      </div>
      <div className="flex-1 flex flex-col space-y-2 w-full">
        <input
          disabled={props.disabled}
          type={props.type || "text"}
          placeholder={props.placeholder}
          value={props.value}
          name={props.name}
          onChange={(e) => props.onChange(e.target.value)}
          className="flex-1 p-3 outline-secondary border border-border rounded-lg bg-primary"
        />
        {props.inputDes && (
          <p className="font-text text-text text-sm">{props.inputDes}</p>
        )}
      </div>
    </div>
  );
};

function Profile() {
  const avatarRef = React.useRef(null);
  const { loading, userInfo, error } = useSelector((state) => state.auth);
  const [avatar, setAvatar] = React.useState(null);
  const [edit, setEdit] = React.useState(false);
  const [imageLoading, setImageLoading] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [profile, setProfile] = React.useState({});

  React.useEffect(() => {
    setProfile(userInfo);
  }, [userInfo]);

  const handleUpload = () => {
    avatarRef.current.click();
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
    } else {
      setAvatar(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      avatar: e.target?.avatar?.files[0] || userInfo?.avatar || null,
      name: e.target?.name?.value || userInfo?.name || "",
      companyName: e.target?.companyName?.value || userInfo?.companyName || "",
      designation: e.target?.designation?.value || userInfo?.designation || "",
      location: e.target?.location?.value || userInfo?.location || "",
      skills: e.target?.skills?.value || userInfo?.skills || [],
      interests: e.target?.interests?.value || userInfo?.interests || [],
      bio: e.target?.bio?.value || userInfo?.bio || "",
      title: e.target?.title?.value || userInfo?.title || "",
    };

    if (data.avatar && typeof data.avatar !== "string") {
      setImageLoading(true);
      const formData = new FormData();
      formData.append("files", data.avatar);
      const res = await axios.post("/upload/uploadFile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data) {
        data.avatar = res.data[0].filename;
      } else {
        data.avatar = null;
      }
      setImageLoading(false);
    }

    dispatch(updateUserProfile(data));
    setEdit(false);
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden bg-tertiary">
      <ModalWrapper style={{ backgroundColor: "transparent" }} isOpen={loading}>
        <div className="flex self-center items-center justify-center">
          <Loading type="bars" size={40} />
        </div>
      </ModalWrapper>
      <Header />
      {/* Head section */}
      <form
        onSubmit={handleSubmit}
        className="flex-1 flex flex-col space-y-8 p-8 md:p-16"
      >
        {/* <div className="flex-1 flex flex-col space-y-5"> */}
        <div className="flex flex-row justify-between items-center cursor-pointer">
          <div
            className="flex flex-row space-x-3 items-center"
            onClick={() => navigate(-1)}
          >
            <ArrowBackIos />
            <p className="font-heading text-black text-xl">Profile</p>
          </div>
          {!edit ? (
            <Button
              onClick={() => setEdit(!edit)}
              style={{ paddingLeft: 25, paddingRight: 25, borderRadius: 30 }}
              text="Edit Profile"
            />
          ) : (
            <div className="flex flex-col space-x-0 space-y-3 md:space-y-0 md:space-x-3 md:flex-row  items-start md:items-center">
              <Button
                onClick={() => setEdit(false)}
                style={{ paddingLeft: 25, paddingRight: 25, borderRadius: 30 }}
                text="Cancel"
              />
              <Button
                type="submit"
                style={{ paddingLeft: 25, paddingRight: 25, borderRadius: 30 }}
                text="Submit"
              />
            </div>
          )}
        </div>
        {/* </div> */}
        {/* Avatar Section */}
        <div className="flex flex-col space-y-5">
          <div>
            <img
              src={
                avatar !== null
                  ? URL.createObjectURL(avatar)
                  : userInfo?.avatar
                  ? `${baseURL}/upload/image/${userInfo?.avatar}`
                  : "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"
              }
              alt="avatar"
              className="rounded-full w-[150px] h-[150px] object-cover"
            />
          </div>
          <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 space-x-0 md:space-x-3 items-start md:items-center justify-between">
            <div className="flex flex-col">
              <p className="font-heading text-black text-xl">Photo Profile</p>
              <p className="font-text text-text">Change Photo Profile use</p>
            </div>
            <div className="flex flex-col space-y-3 ">
              <div
                onClick={edit ? handleUpload : null}
                className="rounded-lg border space-x-2 border-border flex flex-row p-3 items-center cursor-pointer"
              >
                {imageLoading ? (
                  <Loading type="spin" />
                ) : (
                  <>
                    <p className="text-text font-text">Upload new photo</p>
                    <Upload />
                  </>
                )}
                <input
                  type="file"
                  onChange={handleFile}
                  ref={avatarRef}
                  hidden
                  name="avatar"
                />
              </div>
              <p className="text-text font-text">Max 2 mb</p>
            </div>
          </div>
        </div>
        {/* Info section */}
        <div className="flex flex-col space-y-5">
          <FiledRow
            fieldName="Full Name"
            fieldDes="Your Full Name"
            type="text"
            placeholder="Type your Name"
            inputDes="Max 25 characters"
            disabled={!edit}
            value={profile?.name}
            name="name"
            onChange={(val) => setProfile({ ...profile, name: val })}
          />
          <FiledRow
            fieldName="Email"
            fieldDes="Email Address"
            type="email"
            placeholder="Type your Email"
            value={profile?.email}
            disabled={true}
            name="email"
            onChange={(val) => setProfile({ ...profile, email: val })}
          />
          <FiledRow
            fieldName="Phone"
            fieldDes="Phone Number"
            type="text"
            placeholder="Type your Phone Number"
            value={profile?.phoneNo}
            disabled={true}
            name="phoneNo"
            onChange={(val) => setProfile({ ...profile, phoneNo: val })}
          />
          <FiledRow
            fieldName="Company Name"
            fieldDes="Company Name"
            type="text"
            placeholder="Type your Comapny Name"
            disabled={!edit}
            value={profile?.companyName}
            name="companyName"
            onChange={(val) => setProfile({ ...profile, companyName: val })}
          />
          <FiledRow
            fieldName="Designation"
            fieldDes="Designation"
            type="text"
            placeholder="Type your Designation"
            disabled={!edit}
            value={profile?.designation}
            name="designation"
            onChange={(val) => setProfile({ ...profile, designation: val })}
          />
          <FiledRow
            fieldName="Role"
            fieldDes="Role"
            type="text"
            placeholder="Type your Role"
            disabled={true}
            value={profile?.role}
            name="role"
            onChange={(val) => setProfile({ ...profile, role: val })}
          />
          <FiledRow
            fieldName="Location"
            fieldDes="Location"
            type="text"
            placeholder="Type your Location i.e City, Country"
            disabled={!edit}
            value={profile?.location}
            name="location"
            onChange={(val) => setProfile({ ...profile, location: val })}
          />
          <FiledRow
            fieldName={profile?.role === "Freelancer" ? "skills" : "interests"}
            fieldDes={profile?.role === "Freelancer" ? "skills" : "interests"}
            type="text"
            placeholder="Type your interests"
            disabled={!edit}
            value={
              profile?.role === "Freelancer"
                ? profile?.skills
                : profile?.interests
            }
            name={profile?.role === "Freelancer" ? "skills" : "interests"}
            onChange={(val) =>
              setProfile({
                ...profile,
                [profile?.role === "Freelancer" ? "skills" : "interests"]: val,
              })
            }
          />
          <FiledRow
            fieldName="Bio"
            fieldDes="Bio"
            type="text"
            placeholder="Type your interests"
            disabled={!edit}
            value={profile?.bio}
            name="bio"
            onChange={(val) => setProfile({ ...profile, bio: val })}
          />
          <FiledRow
            fieldName="Title"
            fieldDes="Title"
            type="text"
            placeholder="Type your interests"
            disabled={!edit}
            value={profile?.title}
            name="title"
            onChange={(val) => setProfile({ ...profile, title: val })}
          />
        </div>
      </form>
      {/* </div> */}
      <Footer />
    </div>
  );
}

export default Profile;
