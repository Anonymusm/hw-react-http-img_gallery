import { Component } from "react";

export class Modal extends Component {
  state = { isOpen: false };

  componentDidMount() {
    window.addEventListener("keydown", this.escapeCloseModal);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.escapeCloseModal);
  }

  openModal = () => {
    this.setState({
        isOpen: true,
    })
  }

  closeModal = () => {
    this.setState({ isOpen: false });
    console.log("Modal is cloded");
  };

  escapeCloseModal = (event) => {
    if (event.key === "Escape") this.closeModal();
  };

  handleOverlayClick = (event) => {
    if (event.target.className === "overlay") this.closeModal();
  };

  render() {
    const { isOpen } = this.state;
    const { largeImageURL, tags } = this.props.image;

    if (!isOpen) return null;

    return (
      <div className="overlay" onClick={this.handleOverlayClick}>
        <div className="modal">
          <button type="button" onClick={this.closeModal}>Close</button>
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>
    );
  }
}
