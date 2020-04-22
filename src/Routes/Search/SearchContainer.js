import React from "react";
import SearchPresenter from "./SearchPresenter";
import { moviesApi, tvApi } from "../../api";

export default class extends React.Component {
  state = {
    movieResults: null,
    tvResults: null,
    searchTerm: "",
    searchedTerm: "",
    loading: false,
    error: null,
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { searchTerm } = this.state;
    if (searchTerm !== "") {
      await this.searchByTerm();
    }
    this.setState({ searchedTerm: searchTerm, searchTerm: "" });
  };

  updateTerm = (event) => {
    const {
      target: { value },
    } = event;
    this.setState({ searchTerm: value });
  };

  searchByTerm = async () => {
    const { searchTerm } = this.state;
    this.setState({ loading: true });
    try {
      const {
        data: { results: movieResults },
      } = await moviesApi.search(searchTerm);
      const {
        data: { results: tvResults },
      } = await tvApi.search(searchTerm);
      this.setState({
        movieResults,
        tvResults,
      });
    } catch {
      this.setState({ error: "❌ Cannot Find Results" });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const {
      movieResults,
      tvResults,
      searchTerm,
      searchedTerm,
      loading,
      error,
    } = this.state;
    return (
      <SearchPresenter
        movieResults={movieResults}
        tvResults={tvResults}
        searchTerm={searchTerm}
        searchedTerm={searchedTerm}
        loading={loading}
        error={error}
        handleSubmit={this.handleSubmit}
        updateTerm={this.updateTerm}
      />
    );
  }
}
