import { useState } from "react"
import plus from "../assets/plus.svg"
import Ingredients from "../components/Ingredients"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

export default function RecipeForm() {
    let navigate = useNavigate();
    let [ingredients,setIngredients] = useState([]);
    let [newIngredients,setnewIngredients] = useState('');
    let [title,setTitle] = useState('');
    let [description,setDescription] = useState('');
    let [errors,setErrors] = useState([]);

    let addIngredient = () => {
        setIngredients(prevState=>[newIngredients,...prevState]);
        setnewIngredients('');
    }

    let createRecipe = async (e) =>{
        try {
            e.preventDefault();
        let recipe = {
            title,
            description,
            ingredients
        }

        //server request
        let res = await axios.post('http://localhost:4000/api/recipes',recipe)
        if(res.status === 200) {
            navigate('/');
        }
        console.log(res)
        } catch (e){
            setErrors(Object.keys(e.response.data.errors))
        }
    }
  return (
    <div className="mx-auto max-w-md border-2 border-white p-4">
        <h1 className="mb-6 text-2xl font-bold text-orange-400 text-center">RecipeForm</h1>
        <form className="space-y-5" onSubmit={createRecipe}>
            <ul>
                {!!errors.length&&errors.map((error,i)=>(
                    <li key={i} className="text-red-500 text-sm border border-red-500 bg-transparent p-3 text-center">{error} is invalid value</li>
                ))}
            </ul>
            <input type="text" placeholder="Recipe Title"  className="w-full p-1" value={title} onChange={e=>setTitle(e.target.value)}/>
            <textarea rows="5" className="w-full p-1" placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)}></textarea>
           <div className="flex space-x-2 items-center">
           <input value={newIngredients} onChange={e=>setnewIngredients(e.target.value)} type="text" placeholder="Recipe Ingredient"  className="w-full p-1"/>
            <img src={plus} alt="" className="cursor-pointer" onClick={addIngredient}/>
           </div>
           <div>
            <Ingredients ingredients={ingredients}/>
           </div>
           <button type="submit" className="w-full px-3 py-1 rounded-full bg-orange-400 text-white">Create Recipe</button>
        </form>
    </div>
  )
}
