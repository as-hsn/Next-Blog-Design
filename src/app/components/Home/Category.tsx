import CategoryCards from "../CategoryCards";


export default function CategorySection() {
 
  return (
    <div className="container mx-auto pt-32">
      <h1 className="text-center text-3xl md:text-4xl font-bold mb-12 text-slate-900">
        Choose A Category
      </h1>
      <CategoryCards />
    </div>
  );
}
