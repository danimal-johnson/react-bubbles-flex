import React, { useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    console.log(colorToEdit);
    const colorsCopy = colors.filter( c => c.id !== colorToEdit.id);
    colorsCopy.push (colorToEdit);

    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then( res => {
        console.log("COLOR UPDATED:", res.data);
        updateColors(colorsCopy);
      })
      .catch( err => console.error(err));

  };

  const deleteColor = color => {
    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      .then( res => {
        updateColors( colors.filter( c => c.id !== color.id) );
      })
      .catch( err => console.error(err));
  };

  const addColor = () => {
    setAdding(true);
    setColorToEdit(initialColor);
  }

  const saveAdd = () => {
    console.log ("Posting the new color", colorToEdit);
    axiosWithAuth()
      .post(`/colors/`, colorToEdit)
      .then( res => {
        console.log(res)
        updateColors( res.data );
      })
      .catch( err => console.error(err));
  };


  return (
    <div className="colors-wrap">
      <p>colors</p>
      <button className="add" onClick={ () => addColor() }
      > + </button>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      {adding && (
        <form onSubmit={saveAdd}>
          <legend>add color</legend>
            <label>
              color name:
              <input
                  onChange={e =>
                    setColorToEdit({ ...colorToEdit, color: e.target.value })
                  }
                  value={colorToEdit.color}
                />
              </label>
              <label>
                hex code:
                <input
                  onChange={e =>
                    setColorToEdit({
                      ...colorToEdit,
                      code: { hex: e.target.value }
                    })
                  }
                  value={colorToEdit.code.hex}
                />
              </label>
              <div className="button-row">
                <button type="submit">save</button>
                <button onClick={() => setAdding(false)}>cancel</button>
              </div>
            </form>
      )}
      <div className="spacer" />
    </div>
  );
};

export default ColorList;
