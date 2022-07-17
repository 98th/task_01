let AccountTable = React.createClass({
  render: function () {
    return (
      <table>
        <tr>
          <th>Name</th>
          <th>Phone</th>
          <th>Industry</th>
          <th>Type</th>
        </tr>
        {this.props.records.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.Name}</td>
              <td>{val.Phone}</td>
              <td>{val.Industry}</td>
              <td>{val.Type}</td>
            </tr>
          );
        })}
      </table>
    );
  }
});
module.exports = AccountTable;
