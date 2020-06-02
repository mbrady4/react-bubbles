import React, { useState } from "react";
import axios from "axios";
import { auth } from '../utils/auth';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, editing, setEditing }) => {
  console.log(colors);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState(initialColor);
  const [colorEdit, setColorEdit] = useState(false);

  const editColor = color => {
    setColorEdit(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    setEditing(true);
    console.log('trying to update', colorToEdit)
    auth()
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log({res})
        setEditing(false);
        setColorEdit(false);
      })
      .catch(err => {console.log(err)});
  };

  const deleteColor = color => {
    setEditing(true);
    auth()
      .delete(`/api/colors/${color.id}`)
      .then( res => {
        console.log({res})
        setEditing(false);
      })
      .catch(err => console.log(err));
  };

  const addColor = color => {
    setEditing(true);
    auth()
      .post(`/api/colors`, newColor)
      .then( res => {
        console.log({res});
        setEditing(false);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
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
      {colorEdit && (
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
            <button onClick={() => setColorEdit(false)}>cancel</button>
          </div>
        </form>
      )}
      {/* <div className="spacer" /> */}
      {/* stretch - build another form here to add a color */}
      <form onSubmit={addColor}>
          <legend>add color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setNewColor({ ...newColor, color: e.target.value })
              }
              value={newColor.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setNewColor({
                  ...newColor,
                  code: { hex: e.target.value }
                })
              }
              value={newColor.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">add</button>
          </div>
        </form>
    </div>
  );
};

export default ColorList;
