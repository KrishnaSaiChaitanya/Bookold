import React from 'react'
import { useEffect , useState } from "react";

function Test() {

const click = () => {
  count++;
  document.getElementById("count").innerText = `count = ${count}`;
}
  var count = 0;
//     const [p_data, setp_data] = useState([])
//     useEffect(() => {
//         const fetch_handle = async () =>{      
//  await fetch("http://localhost:5000/api/getALL") .then((res) => res.json()).then((data) => setp_data(data))
//             .catch((err) => console.log(err) ) }
//             fetch_handle();   
//                 }, [])
//                 console.log(p_data);

  return (
    <>
    <p id = "count"> count = {count}</p>
    <button onClick={click}>increase</button>
    </>
  )
}

export default Test