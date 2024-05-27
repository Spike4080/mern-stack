import { useEffect, useState } from "react"
import RecipeCard from "../components/RecipeCard";
import Pagination from "../components/Pagination";
import {useLocation} from 'react-router-dom'


export default function Home() {
    let [recipes,setRecipes] = useState([]);

    let location = useLocation();
    let searchQuery = new URLSearchParams(location.search);
    let page = searchQuery.get('page');

    console.log(page);
    useEffect(()=>{
        let fetchRecipes = async()=>{
        let response = await fetch('http://localhost:4000/api/recipes?page='+page);
        if(response.ok){
            let data = await response.json();
            setRecipes(data);

            // scroll to top 
            window.scroll({top:100,left:100,behavior:'smooth'});
        }
        }

        fetchRecipes();
    },[page])

    // backend info (hashcode)
    let links = {
            nextPage : true ,
            previousPage : true,
            currentPage : 1,
            loopableLinks : [
                {number:1},
                {number:2},
                {number:3}
            ]
        }
    

  return (
    <div className="space-y-3">
        {recipes.length && (recipes.map(recipe=>(
            <RecipeCard key={recipe.id} recipe={recipe}/>
        ))
        )}
        <Pagination links={links} page={page}/>
    </div>
  )
}
