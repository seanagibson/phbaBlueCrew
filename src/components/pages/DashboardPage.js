import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ConfirmEmailMessage from "../messages/confirmEmailMessage";
// import { allGamesSelector } from "../../reducers/games";
// import AddGameCtA from "../ctas/AddGameCtA";
// import { fetchGames } from "../../actions/games";

class DashboardPage extends React.Component {
  componentDidMount = () => this.onInit(this.props);

  // onInit = props => props.fetchGames();

  render() {
    const { isConfirmed } = this.props;
    return (
      <div>
        {!isConfirmed && <ConfirmEmailMessage />}
      </div>
    );
  }
}

DashboardPage.propTypes = {
  isConfirmed: PropTypes.bool.isRequired,
  fetchBooks: PropTypes.func.isRequired,
  books: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

function mapStateToProps(state) {
  return {
    isConfirmed: !!state.user.confirmed
  };
}

export default connect(mapStateToProps)(DashboardPage);