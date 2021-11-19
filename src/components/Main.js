import { useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"
import Index from "../pages/Index"
import Show from "../pages/Show"

const Main = (props) => {
    // State to hold our list of cheeses
    const [cheeses, setCheeses] = useState(null)

    // your deployed heroku URL
    const URL = "https://as-cheese-backend.herokuapp.com/cheeses/"

    // function to get updated list of cheeses
    const getCheeses = async () => {
        // make api call
        const response = await fetch(URL)
        // turn the response in an object
        const data = await response.json()
        // set the state to the api data
        setCheeses(data)
    }

    // function that will later be passed data from our new/create form and make the post request to create a new cheese
    const createCheeses = async (cheese) => {
        // make the post request to our API
        await fetch(URL, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cheese)
        })

        // get updated list of cheeses
        getCheeses()
    }

    // function to update a cheese
    const updateCheeses = async (cheese, id) => {
        // make the put request
        await fetch(URL + id, {
            method: "put",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cheese)
        })
        //update the list of cheeses
        getCheeses()
    }

    // create function to delete a person
    const deleteCheeses = async (id) => {
        //make the delete request
        await fetch(URL + id,  {
            method: "delete"
        })
        //update the list of cheeses
        getCheeses()
    }

    // a useEffect to make a call to getCheeses when page loads
    useEffect(() => {
        getCheeses()
    }, [])

    return (
        <main>
            <Routes>
                <Route path="/" element={
                <Index cheeses={cheeses} createCheeses={createCheeses}/>
                }/>
                <Route path="/cheeses/:id" element={
                <Show cheeses={cheeses} updateCheeses={updateCheeses} deleteCheeses={deleteCheeses}/>}/>
            </Routes>
        </main>
    )
}

export default Main