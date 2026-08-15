function CategoryNav({
  categories,
  selectedCategory,
  onCategoryChange
}) {
  return (
    <nav className="category-nav">

      <div className="category-inner">

        <div className="category-scroll">

          {categories.map((category) => (

            <button
              key={category.name}
              className={
                selectedCategory === category.name
                  ? 'category active'
                  : 'category'
              }
              onClick={() =>
                onCategoryChange(category.name)
              }
            >
              {category.label}
            </button>

          ))}

        </div>

      </div>

    </nav>
  )
}

export default CategoryNav