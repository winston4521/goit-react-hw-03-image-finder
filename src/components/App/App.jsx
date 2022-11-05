import React, { Component } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ApiFetch } from '../API/Api';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Moodal/Modal';
import { Button } from 'components/Button/Button';

export default class App extends Component {
  state = {
    searchQuery: '',
    gallery: [],
    page: 1,
    error: null,
    showModal: false,
    isLoading: false,
    largeImageURL: '',
  };

  // =============fetchCats=====================
  async fetchCats() {
    const { searchQuery, page } = this.state;

    this.setState({ isLoading: true });
    try {
      const { data } = await ApiFetch(searchQuery, page);
      if (data.hits.length === 0) {
        const { searchQuery } = this.state;
        return toast.error(`No pictures found with name ${searchQuery}`);
      }
      this.setState(prevState => ({
        gallery: [...prevState.gallery, ...data.hits],
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  // =============componentDidUpdate=====================
  componentDidUpdate = (prevProps, prevState) => {
    const { page } = this.state;

    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.page !== page
    ) {
      this.fetchCats();
    }
  };
  // =============Next page=============
  nextPageHandler = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  onModalOpen = largeImageURL => {
    this.toggleModal();
    this.setState({
      largeImageURL: largeImageURL,
    });
  };
  // ============Modal methods============
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  submitFormHandler = searchQuery => {
    this.setState({ searchQuery, page: 1, gallery: [] });
  };

  render() {
    const { gallery, error, isLoading, showModal, largeImageURL } = this.state;

    return (
      <div>
        <Searchbar submitFormHandler={this.submitFormHandler} />
        {error && toast.error(`Oops something went wrong. ${error.message}`)}
        {gallery.length > 0 && (
          <ImageGallery gallery={gallery} onModalOpen={this.onModalOpen} />
        )}
        {showModal && (
          <Modal
            onModalClose={this.toggleModal}
            largeImageUrl={largeImageURL}
          />
        )}
        {isLoading && <Loader />}
        {gallery.length > 11 && <Button onClick={this.nextPageHandler} />}

        <ToastContainer autoClose={3000} theme={'colored'} />
      </div>
    );
  }
}
