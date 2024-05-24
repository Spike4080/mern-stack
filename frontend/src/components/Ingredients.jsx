export default function Ingredients({ingredients}) {
  return (
    <div>
        <span>Ingredients -</span>
        {!!ingredients.length && ingredients.map((ingredient,i)=>(
        <span className="bg-orange-400 text-white px-2 py-1 text-sm rounded-full" key={i}>{ingredient}</span>
    ))}

    </div>
  )
}
