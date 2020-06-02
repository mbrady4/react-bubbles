import React, { useState, useEffect } from "react";
import axios from "axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import { auth } from "../utils/auth";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  const [editing, setEditing] = useState(false);

  useEffect( () => {
    auth()
      .get('/api/colors')
      .then(res => {
        console.log({res});
        setColorList(res.data)
      })
      .catch(err => console.log(err));
    }, [editing]);

  return (
    <>
      <ColorList colors={colorList} editing={editing} setEditing={setEditing} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
