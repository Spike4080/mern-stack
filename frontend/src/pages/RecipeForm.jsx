import { useEffect, useState } from "react"
import plus from "../assets/plus.svg"
import Ingredients from "../components/Ingredients"
import axios from 'axios'
import { useNavigate,useParams } from "react-router-dom"


export default function RecipeForm() {
    let {id} = useParams();
    console.log(id)
    let navigate = useNavigate();
    let [ingredients,setIngredients] = useState([]);
    let [newIngredients,setnewIngredients] = useState('');
    let [title,setTitle] = useState('');
    let [description,setDescription] = useState('');
    let [errors,setErrors] = useState([]);

    useEffect(()=>{
        let fetchRecipe = async()=>{
            if(id){
                let res = await axios.get('http://localhost:4000/api/recipes/'+id)
                if(res.status === 200) {
                    setTitle(res.data.title)
                    setDescription(res.data.description)
                    setIngredients(res.data.ingredients)
                }
                }
        }
        fetchRecipe()
    },[id])

    let addIngredient = () => {
        setIngredients(prevState=>[newIngredients,...prevState]);
        setnewIngredients('');
    }

    let submit = async (e) =>{
        try {
            e.preventDefault();
        let recipe = {
            title,
            description,
            ingredients
        }

        //server request
        let res;
        if(id){
            res = await axios.patch('http://localhost:4000/api/recipes/'+id,recipe)
        }else {
            res = await axios.post('http://localhost:4000/api/recipes',recipe)
        }
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
        <h1 className="mb-6 text-2xl font-bold text-orange-400 text-center">Recipe {id ? 'Edit' : 'Create'} Form</h1>
        <form className="space-y-5" onSubmit={submit}>
            <ul>
                {!!errors.length&&errors.map((error,i)=>(
                    <li key={i} className="text-red-500 text-sm border border-red-500 bg-transparent p-3 text-center">{error} is invalid value</li>
                ))}
            </ul>
            <input type="text" placeholder="Recipe Title"  className="w-full p-1" value={title} onChange={e=>setTitle(e.target.value)}/>
            <textarea rows="5" className="w-full p-1" placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)}></textarea>
            <label className="block text-slate-500">Add atleast 3 ingredients</label>
           <div className="flex space-x-2 items-center">
           <input value={newIngredients} onChange={e=>setnewIngredients(e.target.value)} type="text" placeholder="Recipe Ingredient"  className="w-full p-1"/>
            {!!newIngredients.length  && <img src={plus} alt="" className="cursor-pointer" onClick={addIngredient}/>}
           </div>
           <div>
            <Ingredients ingredients={ingredients}/>
           </div>
           <button type="submit" className="w-full px-3 py-1 rounded-full bg-orange-400 text-white">{id ? 'Edit':'Create'} Recipe</button>
        </form>
    </div>
  )
}
