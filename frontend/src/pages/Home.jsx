import { useEffect, useState } from "react"
import RecipeCard from "../components/RecipeCard";
import Pagination from "../components/Pagination";
import {useLocation,useNavigate} from 'react-router-dom'


export default function Home() {
    let [recipes,setRecipes] = useState([]);
    let [links,setLinks] = useState(null);
    let navigate = useNavigate();

    let location = useLocation();
    let searchQuery = new URLSearchParams(location.search);
    let page = searchQuery.get('page'); // string
    page = parseInt(page); // int


    useEffect(()=>{
        let fetchRecipes = async()=>{
        let response = await fetch('http://localhost:4000/api/recipes?page='+page);
        if(response.ok){
            let data = await response.json();
            setLinks(data.links);
            setRecipes(data.data);

            // scroll to top 
            window.scrollTo({top:100,left:100,behavior:'smooth'});
        }
        }

        fetchRecipes();
    },[page])

    
    let onDeleted = (_id)=>{
        if(recipes.length === 1 && page > 1){
            navigate('/?page='+(page-1))
        } else {
            // handle delete for client site
            setRecipes(prevState => prevState.filter(recipe => recipe._id!==_id))
        }
    }
  return (
    <div className="space-y-3">
        {!!recipes.length && (recipes.map(recipe=>(
            <RecipeCard key={recipe._id} recipe={recipe} onDeleted={onDeleted}/>
        ))
        )}
        {!!links &&<Pagination links={links} page={page || 1}/>}
    </div>
  )
}
