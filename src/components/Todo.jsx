import { list } from 'postcss';
import React, { useState , useEffect, useRef} from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { TrashIcon, PlusCircleIcon, ArchiveBoxXMarkIcon } from '@heroicons/react/24/solid'
import { v4 } from 'uuid';




const Todo = () => {
    const [TodolistItems, setTodoListItems] = useState([]);

    function handleDrag(result)
    {
        if(result.destination == null)
       {}
  else {
      const itemCopy = Array.from(TodolistItems)
     const [recoveredItem] = itemCopy.splice(result.source.index,1);
      itemCopy.splice(result.destination.index,0,recoveredItem)
     setTodoListItems(itemCopy);
  }       
    }       


    const handelSubmit =(e)=> {
  e.preventDefault();
  if(e.target.data.value!='')
  {
      setTodoListItems([...TodolistItems,{ id:v4(),name:e.target.data.value} ])
      e.target.data.value=''
  }
    }


    const deleteTodo =(index) =>
    {
     const newTasks = TodolistItems.filter(obj => obj.id!== index);     
     setTodoListItems([...newTasks])
    }



/////////////////////


    return (
        <>
 
            <div>
                <div    className=' select-none rounded-xl m-20'>
                    <form  onSubmit={e =>handelSubmit(e)} className=" flex">
                        <input   placeholder='  Todo....' autoComplete="off" name='data' className=' dark:text-white indent-4  bg-slate-200 dark:bg-slate-700 w-[250px] rounded-lg m-2' type="text" />
                        
                    </form>

                    <DragDropContext onDragEnd={handleDrag}>
                        <Droppable droppableId='Todos'>
                            {(provided) => (
                                <ul {...provided.droppableProps}  ref={provided.innerRef}>
                                    {TodolistItems.map((e, index) => {
                                        return(
                                        <Draggable index={index} key={e.id} draggableId={e.id}>
                                            {(provided , snapshot) => (
                                                <li  className={ ` flex m-1 rounded-lg  select-none bg-slate-700 dark:opacity-80 opacity-40    `+`${snapshot.isDragging && "dragging"}` }  {...provided.dragHandleProps}{...provided.draggableProps} ref={provided.innerRef}>
                                                    <span className='  grow  text-white text-opacity-100  dark:text-white ml-2'> {e.name} </span> <button onClick={()=> deleteTodo(e.id)} ><ArchiveBoxXMarkIcon className='  w-5 h-5 text-white mr-2'/></button>
                                                </li>
                                            )}
                                        </Draggable>
                                        )
                                    })}

                                    {provided.placeholder}
                                </ul>
                            )
                            }
                        </Droppable>
                    </DragDropContext>
                    <ul>
                    </ul>
                </div>

            </div>

        </>
    )
}

export default Todo

