import React, { useEffect, useState } from "react";
import './homeCss.css'
import axios from 'axios'


const SingleTask = ({ data, customKey, fetchDataFunc }) => {
    const [updateVariable, setUpdateVariable] = useState()
    //delete function
    const deleteData = async (id) => {
        console.log(id)
        try {
            const response = await axios.delete('http://localhost:3100/deleteData/' + id)
            fetchDataFunc()
            console.log(response)
        } catch (e) {
            console.log(e)
        }
    }

    //update function...
    const updateFunc = (id) => {
        try{
            const response2 = axios.put('http://localhost:3100/updateData/' + id,{
                taskName:updateVariable
            })
            fetchDataFunc()
            console.log(response2)
        }catch(e){
            console.log(e)
        }
    }

    return (
        <>
            <div className="my-2 singleTask p-1 row shadow-sm" key={customKey}>
                <div className=" col-md-6 fw-bold">{data.taskName}</div>
                <div className="col-md-6" style={{ textAlign: 'right' }}>
                    <button className="mx-1 button" data-bs-toggle="modal" data-bs-target="#exampleModal">Update</button>  <button className="button" onClick={() => { deleteData(data._id) }}>Delete</button>
                </div>

                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">

                                <input type="text" className="inputBlock" placeholder="enter your task..."
                                    onChange={(e) => { setUpdateVariable(e.target.value) }} />

                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" onClick={() => updateFunc(data._id)}>Update it...</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

const Home = () => {
    const [list, setList] = useState([])
    const [inputVariable, setInputVariable] = useState();

    const task = {
        taskName: "Ayush is studying",
        description: "tech phsyco",
        completed: true
    }

    //Calling api to get the data

    //get api for list of data....
    const fetchData = async () => {
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
                        onChange={(e) => { setInputVariable(e.target.value) }} />
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