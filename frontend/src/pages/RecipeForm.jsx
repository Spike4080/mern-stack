import { useState } from "react"
import plus from "../assets/plus.svg"
import Ingredients from "../components/Ingredients"

export default function RecipeForm() {
    let [ingresients,setIngredients]=useState([]);
    let [newIngredients,setnewIngredients]=useState('');

    let addIngredient = () => {
        setIngredients(prevState=>[newIngredients,...prevState]);
        setnewIngredients('');
    }
  return (
    <div className="mx-auto max-w-md border-2 border-white p-4">
        <h1 className="mb-6 text-2xl font-bold text-orange-400 text-center">RecipeForm</h1>
        <form className="space-y-5">
            <input type="text" placeholder="Recipe Title"  className="w-full p-1"/>
            <textarea rows="5" className="w-full p-1" placeholder="Description"></textarea>
           <div className="flex space-x-2 items-center">
           <input value={newIngredients} onChange={e=>setnewIngredients(e.target.value)} type="text" placeholder="Recipe Ingredient"  className="w-full p-1"/>
            <img src={plus} alt="" className="cursor-pointer" onClick={addIngredient}/>
           </div>
           <div>
            <Ingredients ingredients={ingresients}/>
           </div>
           <button className="w-full px-3 py-1 rounded-full bg-orange-400 text-white">Create Recipe</button>
        </form>
    </div>
  )
}
