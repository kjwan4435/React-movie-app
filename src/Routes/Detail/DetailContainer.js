import React from "react";
import DetailPresenter from "./DetailPresenter";
import { moviesApi, tvApi } from "../../api";

export default class extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname },
    } = props;
    this.state = {
      result: null,
      error: null,
      loading: true,
      isMovie: pathname.includes("/movie/"),
    };
  }

  componentDidMount = async () => {
    console.log(this.props);
    const {
      match: {
        params: { id },
      },
      history: { push },
    } = this.props;
    const { isMovie } = this.state;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return push("/");
    }

    let result = null;
    try {
      this.setState({ loading: true });
      if (isMovie) {
        ({ data: result } = await moviesApi.movieDetail(parsedId));
      } else {
        ({ data: result } = await tvApi.tvDetail(parsedId));
      }
    } catch {
      this.setState({ error: "❌ Can't Find Anything" });
    } finally {
      this.setState({ loading: false, result });
    }
  };

  render() {
    const { result, error, loading } = this.state;
    console.log(this.state);
    return <DetailPresenter result={result} error={error} loading={loading} />;
  }
}
