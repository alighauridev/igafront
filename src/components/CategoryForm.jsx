import React from "react";
import Button from "./Button";
import { Cancel } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { selectCategoryById } from "../redux/slices/category/categorySlice";

function CategoryForm(props) {
  const [tags, setTags] = React.useState([]);
  const category = useSelector((state) => selectCategoryById(state, props.id));
  const [name, setName] = React.useState("");

  React.useEffect(() => {
    if (category && (props.isEdit || props.id)) {
      setName(category?.name);
      setTags(category?.subCategories);
    }
  }, [category]);

  const handleAdd = (e) => {
    if (e.key === "Enter") {
      if (!tags.includes(e.target.value)) {
        setTags([...tags, e.target.value]);
      }
      e.target.value = "";
    }
  };
  const handleClose = () => {
    document.getElementById("thisForm").reset();
    setName(null);
    setTags([]);
    props.handleClose();
  };
  const handleRemove = (tag) => {
    setTags(tags.filter((item) => item !== tag));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: e.target.name.value || name || "",
      subCategories: tags || category?.subCategories || [],
    };
    if (props.isEdit) {
      props.handleSubmit(data, props.id);
    } else {
      props.handleSubmit(data);
    }
    handleClose();
  };

  return (
    <form
      id="thisForm"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
      onSubmit={handleSubmit}
      className="flex flex-col space-y-5"
    >
      <p className="font-heading text-heading text-center">
        {props?.isEdit ? "Edit" : "Add"} Category
      </p>

      <div className="flex flex-col space-y-3">
        <p className="font-heading text-text">Category</p>
        <input
          required
          min={1}
          type="text"
          name="name"
          value={name}
          disabled={
            !((props.isEdit && props.id) || (!props.isEdit && !props.id))
          }
          onChange={(e) => setName(e.target.value)}
          className="border border-border rounded-sm p-3 font-text text-text max-w-full max-h-[300px]"
        />
      </div>
      <p className="font-heading text-text">Sub Categories<span className="text-xs"> (press Enter after each sub category)</span></p>
      <div className="flex-1 min-h-[100px] max-w-full max-h-full flex items-center flex-wrap border border-secondary rounded-md p-3 ">
        {tags.map((item, index) => (
          <div
            key={index.toString()}
            className="flex justify-center items-center rounded-md bg-secondary text-white p-2 m-1"
          >
            {item}
            {((props.isEdit && props.id) || (!props.isEdit && !props.id)) && (
              <Cancel
                className="ml-2 cursor-pointer"
                onClick={() => handleRemove(item)}
              />
            )}
          </div>
        ))}
        {((props.isEdit && props.id) || (!props.isEdit && !props.id)) && (
          <input
            type="text"
            placeholder="Add"
            className="outline-none border-none bg-transparent flex-1 text-secondary font-text"
            onKeyDown={handleAdd}
          />
        )}
      </div>

      <div className="flex flex-row items-center justify-between pb-8">
        <Button
          onClick={handleClose}
          style={{
            maxWidth: "30%",
            flex: 1,
            paddingLeft: 20,
            paddingRight: 20,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: "#3276FA",
            backgroundColor: "white",
            color: "#3276FA",
          }}
          text="Cancel"
        />
        {((props.isEdit && props.id) || (!props.isEdit && !props.id)) && (
          <Button
            loading={props.submitLoading}
            type={"submit"}
            style={{
              maxWidth: "30%",
              flex: 1,
              paddingLeft: 20,
              paddingRight: 20,
              borderRadius: 20,
            }}
            text="Submit"
          />
        )}
      </div>
    </form>
  );
}

export default CategoryForm;
