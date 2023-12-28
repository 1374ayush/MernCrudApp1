import React, { useEffect, useState } from "react";
import './homeCss.css'
import axios from 'axios'
import SingleTask from "./singleTask";

const Home = () => {
    const [list, setList] = useState([])
    const [inputVariable, setInputVariable] = useState("");

    const task = {
        taskName: "Ayush is studying",
        description: "tech phsyco",
        completed: true
    }

    //Calling api to get the data

    //get api for list of data....
    const fetchData = async () => {
        console.log("fetchDataFunc called....")
        const data = await axios.get('http://localhost:3100/list');
        setList(data.data);
    }

    useEffect(() => {
        fetchData();
    }, [])

    //post api
    const addTask = async () => {
        try {
            const response = await axios.post('http://localhost:3100/addData', {
                taskName: inputVariable,
                description: "Ayush is a web phsyco..."
            });
            setInputVariable("")
            fetchData();
        } catch (error) {
            console.error('Error:', error.response || error.message || error);
        }
    }

    //delete API


    return (
        <div className="mainBack">
            <div className="container row my-3" style={{ width: '50%', margin: 'auto' }}>
                <h2 className="fw-bold">Task here , knock knock !!!</h2>

                <div className="col-md-12 mainBlock p-4 mt-3 rounded">
                    <input type="text" className="inputBlock" placeholder="enter your task..."
                        onChange={(e) => { setInputVariable(e.target.value) }} value={inputVariable}/>
                    <button className="button" onClick={() => addTask()}>Add Task</button>

                    <div className="my-4">
                        {list.map((item, index) => (
                            <SingleTask data={item} customKey={index} fetchDataFunc={fetchData} />
                        ))
                        }
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Home