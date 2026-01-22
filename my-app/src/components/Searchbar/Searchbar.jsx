import useSearchbar from "../useSearchbar";
import { ImageGallery } from "../ImageGallery/ImageGallery"
import { Loader } from "../Loader/Loader"

export default function Searchbar() {
  const { gallery, query, isLoading, error, handleLoadMore, handleSubmit, handleChange } = useSearchbar();

  // Змінює стан loading на true,
  //  спрацьовує функція з файлу js,
  // потім отримаємо новий масив
  //  та змінимо стан попереднього масиву на новий, який ми отримали
  // та до минулого стану нашої величини сторінки додаємо одиницю.
  // У разі помилки до нам у параметри прийде помилка, та помилка зміниться з null на true,
  // а в самому кінці значення лоадінг знову стане false.

  return (
    <header className="Searchbar">
      <form className="form" onSubmit={handleSubmit}>
        <button type="submit" className="button">
          <span className="button-label">Search</span>
        </button>

        <input
          className="input"
          type="text"
          placeholder="Search images and photos"
          onChange={handleChange}
          value={query}
        />
      </form>

      {error && <h1>UPS! SOMETHUNG WENT WRONG</h1>}

      <ImageGallery images={gallery} loadMore={handleLoadMore} />

      {isLoading && <Loader />}
    </header>
  );
}
