import { Component } from "react";
import fetchPictures from "../../pic-api";
import { Button } from "../Button/Button";
import { Loader } from "../Loader/Loader";
import { ImageGallery } from "../ImageGallery/ImageGallery";

export class Searchbar extends Component {
  state = {
    gallery: [],
    query: "",
    currentPage: 1,
    error: null,
    isLoading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      const newQuery = this.state.query;
      if (newQuery !== this.state.query) {
        this.setState({ query: newQuery });
      }
    }
  }

  handleChange = (event) => {
    this.setState({
      query: event.target.value,
    });
  };

  handleSubmit = (event) => {
    // Що трапиться після сабміту форми
    event.preventDefault();

    this.setState(
      {
        gallery: [], // Очищаємо, щоб після сабміту все оновилося
        currentPage: 1,
      },
      this.loadGallery
    );
  };

  // Змінює стан loading на true,
  //  спрацьовує функція з файлу js,
  // потім отримаємо новий масив
  //  та змінимо стан попереднього масиву на новий, який ми отримали
  // та до минулого стану нашої величини сторінки додаємо одиницю.
  // У разі помилки до нам у параметри прийде помилка, та помилка зміниться з null на true,
  // а в самому кінці значення лоадінг знову стане false.

  loadGallery = () => {
    const { currentPage, query } = this.state;

    this.setState({ isLoading: true });

    fetchPictures({ query, currentPage })
      .then((newGallery) =>
        this.setState((prevState) => ({
          gallery: [...prevState.gallery, ...newGallery],
          currentPage: prevState.currentPage + 1,
        }))
      )
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  render() {
    const { error, isLoading } = this.state;
    return (
      <header className="Searchbar">
        <form className="form" onSubmit={this.handleSubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            type="text"
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={this.state.query}
          />
        </form>

        {error && <h1>UPS! SOMETHUNG WENT WRONG</h1>}

        <ImageGallery
          images={this.state.gallery}
          loadGallery={this.loadGallery}
        />

        {isLoading && <Loader />}
      </header>
    );
  }
}
