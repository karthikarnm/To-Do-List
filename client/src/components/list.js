/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
// Import necessary dependencies and modules
import React, { useEffect, useState } from 'react'
import axios from 'axios'

// Define a functional component called List
function List() {
  // State variables for managing items, listItems, update status, and a new list
  const [items, setItems] = useState('')
  const [listItems, setListItems] = useState([])
  const [isUpdated, setIsUpdated] = useState('')
  const [newList, setNewList] = useState('')

  // Async function to add a new item to the list
  const addItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:4000/post/item`, { item: items });
      setListItems([...listItems, res.data])
      setItems('')
    } catch (err) {
      console.log(err);
    }
  }

  // Async function to delete an item from the list
  const del = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:4000/delete/item/${id}`);
      const newList = listItems.filter(item => item._id !== id);
      console.log(res.data, "deleted");
      setListItems(newList);
    } catch (err) {
      console.log(err);
    }
  }

  // Async function to update an item in the list
  const updateItems = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.put(`http://localhost:4000/update/item/${isUpdated}`, { item: newList });
      console.log(res.data, "updated");
      const updatedItemIndex = listItems.findIndex(item => item._id === isUpdated);
      const updatedItem = listItems[updatedItemIndex].item = newList;
      setNewList('')
      setIsUpdated('')
    } catch (err) {
      console.log(err);
    }
  }

  // Component for the update form
  const UpdateForm = () => (
    <div>
      <form onSubmit={(e) => { updateItems(e) }}>
        <div className='flex flex-wrap lg:w-50% sm:mx-auto sm:mb-2 -mx-2 p-4   '>
          <div className='p-2 sm:w-1/2 w-50%'>
            <div class=" rounded flex p-2 h-full items-center">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
                class="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                <path d="M22 4L12 14.01l-3-3"></path>
              </svg>
              <input className='appearance-none block w-50% bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 border-none' type='text' placeholder='update here' onChange={e => setNewList(e.target.value)} value={newList} />
            </div>
          </div>
          <div className='p-2 sm:w-1/2  '>
            <div className='flex justify-center lg: flex flex-wrap justify-end p-3.5 ml-4 '>
              <button type='submit' className='flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded'> update</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )

  // Effect hook to fetch the list items when the component mounts
  useEffect(() => {
    const getlist = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/get/item`);
        setListItems(res.data)
      } catch (err) {
        console.log(err);
      }
    }
    getlist();
  }, [])

  // Render JSX for the List component
  return (
    <>
      <div className='flex justify-center max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-16'>
        <div className=''>
          <div className='px-4 py-2'>
            <h1 className='text-gray-800 font-bold text-2xl uppercase'> ToDo List</h1>
            <form class="w-full max-w-sm mx-auto px-4 py-2" onSubmit={e => addItem(e)}>
              <div class="flex items-center border-b-2 border-teal-500 py-2">
                <input class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Add an item" onChange={e => setItems(e.target.value)} value={items} />
                <button type="submit" class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded">Add</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className='flex w-60% justify-center items-center'>
        <div className='mx-20 mt-20  p-4 shadow-md rounded-lg border-t-2 border-teal-300 flex justify-center items-center '>
          <div>
            {
              listItems.map(item => (
                <div>
                  {isUpdated === item._id ? UpdateForm() :
                    <>
                      <div className='flex flex-wrap lg:w-full sm:mx-auto sm:mb-2 -mx-2 p-4   '>
                        <div className='p-2 sm:w-1/2 w-full'>
                          <div class="bg-gray-100 rounded flex p-4 h-full items-center">
                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
                              class="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                              <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                              <path d="M22 4L12 14.01l-3-3"></path>
                            </svg>
                            <p className=''>{item.item}</p> <br />
                          </div>
                        </div>
                        <div className='p-2 '>
                          <div className=' gap-2 items-center lg: flex flex-col-2 justify-center p-3.5 ml-4 sm: flex justify-end '>
                            <button className='flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded' onClick={() => setIsUpdated(item._id)}>update</button>
                            <button onClick={() => del(item._id)} class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">delete</button>
                          </div>
                        </div>
                      </div>
                    </>
                  }
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}

// Export the List component as the default export
export default List
