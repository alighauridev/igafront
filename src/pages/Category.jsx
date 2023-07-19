import React, { useEffect } from "react";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import {
  addCategory,
  deleteCategory,
  getCategory,
  updateCategory,
} from "../redux/slices/category/categoryActions";
import { Delete, Edit } from "@mui/icons-material";
import Button from "../components/Button";
import ModalWrapper from "../components/ModalWrapper";
import CategoryForm from "../components/CategoryForm";
const Category = () => {
  const dispatch = useDispatch();
  const { loading, category, error } = useSelector((state) => state.category);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState(null);

  useEffect(() => {
    if (category.length === 0) {
      dispatch(getCategory());
    }
  }, [category]);

  // ====== MODAL MANAGEMENT ======
  const handleModalOpen = (id = null, edit = false) => {
    if (id) {
      if (edit) {
        setIsEdit(true);
      }
      setSelectedId(id);
    }
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsEdit(false);
    setSelectedId(null);
  };

  // ========================

  const handleSubmit = (data, id = null) => {
    if (id) {
      dispatch(updateCategory({ id, data }));
    } else {
      dispatch(addCategory(data));
    }
    setIsOpen(false);
  };

  const handleDelete = (id) => {
    dispatch(deleteCategory({ id }));
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden bg-tertiary">
      <ModalWrapper isOpen={isOpen}>
        <CategoryForm
          id={selectedId || null}
          isEdit={isEdit}
          handleSubmit={handleSubmit}
          handleClose={handleClose}
        />
      </ModalWrapper>
      <Header />
      <div style={{ background: "#F2F5FA", height: "100vh" }} className="p-5">
        <div style={{ width: "100%", maxWidth: "1200px", margin: "auto" }}>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <Button
              text="Add Category"
              style={{
                paddingHorizontal: "20px",
                paddingVertical: "20px",
                borderRadius: "5px",
              }}
              onClick={() => handleModalOpen(null)}
            />
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr  ",
              gap: "20px",
              paddingTop: "30px",
            }}
          >
            {category.map((map) => {
              return (
                <div
                  style={{
                    background: "white",
                    padding: "20px",
                    borderRadius: "8px",
                  }}
                >
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Delete
                      onClick={() => handleDelete(map._id)}
                      className="text-[red]"
                    />
                    <Edit
                      onClick={() => handleModalOpen(map._id, true)}
                      className="text-secondary"
                    />
                  </div>
                  <h1
                    style={{
                      fontSize: "24px",
                      color: "black",
                      fontWeight: "600",
                      margin: "20px 0",
                      fontFamily: "Manrope",
                    }}
                  >
                    {map.name}
                  </h1>
                  <Button
                    text="view details"
                    style={{
                      paddingHorizontal: "20px",
                      paddingVertical: "20px",
                      borderRadius: "5px",
                    }}
                    onClick={() => handleModalOpen(map._id)}
                  />
                </div>
              );
            })}
          </div>
          {loading && (
            <div className="flex justify-center items-center py-12">
              <Loading type="spin" size={40} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Category;
