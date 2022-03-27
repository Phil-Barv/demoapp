import { useState } from 'react';
import APIService from '../api'

const AddProjectForm = (props) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [goal, setGoal] = useState('');
    const [deadline, setDeadline] = useState('');
    const [targetAmount, setTargetAmount] = useState('');
    const [raisedAmount, setRaisedAmount] = useState('');
    const imageURL = "https://placekitten.com/200/140";

    const addProject = () => {
      APIService.AddProject({
            title,
            description,
            imageURL,
            goal,
            deadline,
            targetAmount,
            raisedAmount
        }).then((response) => console.log(response))
        .catch(error => console.log('error',error))
    }

    const handleSubmit=(event)=>{ 
      event.preventDefault()
      addProject()
    }

  return (
       <div>
       <form onSubmit = {handleSubmit} >
            
            <label htmlFor="title" className="form-label">Title</label>
            <input 
                type="text"
                className="form-control" 
                placeholder ="Enter title"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                required />

            <label htmlFor="description" className="form-label">Description</label>
            <textarea 
                className="form-control" 
                placeholder ="Enter Description" 
                rows='6'
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
                required></textarea>

            <label htmlFor="goal" className="form-label">Goal</label>
            <textarea 
                className="form-control" 
                placeholder ="Enter Goal" 
                rows='6'
                value={goal}
                onChange={(e)=>setGoal(e.target.value)}
                required></textarea>

            <label htmlFor="deadline" className="form-label">Deadline</label>
            <input 
                type="datetime-local"
                className="form-control" 
                value={deadline}
                onChange={(e)=>setDeadline(e.target.value)}
                required />

            <label htmlFor="targetAmount" className="form-label">Target Amount</label>
            <input 
                type="number"
                className="form-control" 
                placeholder ="Enter your target amount"
                value={targetAmount}
                onChange={(e)=>setTargetAmount(e.target.value)}
                required />

            <label htmlFor="raisedAmount" className="form-label">Raised Amount</label>
            <input 
                type="number"
                className="form-control" 
                placeholder ="Enter Your Riased Amount"
                value={raisedAmount}
                onChange={(e)=>setRaisedAmount(e.target.value)}
                required />


            <button> create project </button>

            </form>
       </div>
  )}

export default AddProjectForm;