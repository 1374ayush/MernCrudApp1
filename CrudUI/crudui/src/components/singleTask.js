import React, { useEffect, useState } from "react";
import './homeCss.css'
import axios from 'axios'

const SingleTask = ({ data, customKey, fetchDataFunc }) => {
    const [updateVariable, setUpdateVariable] = useState()
    const [taskName, setTaskName] = useState("")
    const [id, setId] = useState()

    //console.log("reconcilation occureed")
    //delete function
    const deleteData = async (id) => {
        console.log(id)
        try {
            const response = await axios.delete('http://localhost:3100/deleteData/' + id)
            fetchDataFunc()
           // console.log(response)
        } catch (e) {
            console.log(e)
        }
    }

    //update function...

    //calling API to get the data of particular task
    const onClickUpdateHandler = async(id) =>{
        setId(id)

        const response = await axios.get('http://localhost:3100/list/'+id);
        setTaskName(response.data.taskName)

        console.log(taskName)
    }

    const updateFunc = async() => {
        try{
            const response2 = await axios.put('http://localhost:3100/updateData/' + id,{
                taskName:updateVariable,
                description:"Ayush is web physco..."
            })
            setUpdateVariable("")
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
                    <button className="mx-1 button" data-bs-toggle="modal" data-bs-target={"#exampleModal"+customKey} onClick={()=>{onClickUpdateHandler(data._id)}}>Update</button>  <button className="button" onClick={() => { deleteData(data._id) }}>Delete</button>
                </div>

                <div className="modal fade" id={"exampleModal"+customKey} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <p className="fw-medium fs-5">Current Task: <span className="fw-bold">{taskName}</span></p>
                                <input type="text" className="inputBlock" placeholder="enter your task..."
                                    onChange={(e) => { setUpdateVariable(e.target.value) }}/>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => updateFunc()}>update it..</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}


export default SingleTask