

class HostRow extends React.Component {
  constructor(props){
    super(props);

  }
  actRemoveHost(){
    this.props.rmHost(this.props.ID);
  }
  render() {
    return (
      <tr>
        <td>{this.props.ID}</td>
        <td>{this.props.children}</td>
        <td>{this.props.ip}</td>
        <td>
          <button className="btn btn-danger" onClick={this.actRemoveHost.bind(this)}>
            <span className="glyphicon glyphicon-remove"></span> Usuń
          </button>
        </td>
      </tr>
    );
  }
}

class HostList extends React.Component {
  constructor(props){
    super(props);
    this.rmHost = this.rmHost.bind(this);
  }
  rmHost(id) {
    console.log("Remove ID: " + id);
    $.ajax({
      url: this.props.url_del + id,
      dataType: 'json',
      cache: false,
      success: function(dataLoaded) {
          console.log("deleted host id " + id);
          this.props.mkReloadHosts();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url_del, status, err.toString());
      }.bind(this)
    });
  }
  render() {
    var self = this;
    var rows = this.props.data.map(function(hostItem){
      return (
        <HostRow ID={hostItem.id} ip={hostItem.ip} rmHost={self.rmHost.bind(self)}
          key={hostItem.id}>{hostItem.name}</HostRow>
      );
    });
    return (
       <table className="table table-striped">
        <thead>
        <tr><th>#</th><th>Name</th><th>IP</th><th>Edit</th></tr>
      </thead>
      <tbody>{rows}</tbody>
      <tfoot>
      <tr><th>#</th><th>Name</th><th>IP</th><th>Edit</th></tr>
      </tfoot>
      </table>
    );
  }
}

HostList.propTypes = {
  mkReloadHosts: React.PropTypes.func,
};


class HostAdd extends  React.Component {
  constructor(props){
    super(props);
    this.state = {ip: "", name: ""};
    this.insertHost = this.insertHost.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleIp = this.handleIp.bind(this);
  }
  insertHost(){
    $.ajax({
      url: this.props.url_add + this.state.name + "&ip=" + this.state.ip,
      dataType: 'json',
      cache: false,
      success: function(dataLoaded) {
          this.setState({data: dataLoaded});
          console.log("host list is reoladed");
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url_get, status, err.toString());
      }.bind(this)
    });
  }
  addHost(){
    this.insertHost();
    this.props.mkRealoadHosts();
    this.setState({ip:"", name: ""});
  }
  handleName(event){
    event.preventDefault();
    this.setState({name: event.target.value});
  }
  handleIp(event){
    event.preventDefault();
    this.setState({ip: event.target.value});
  }
  render(){
    return (
      <div className="form-horizontal" role="form">
        <div className="form-group">
          <label className="col-sm-3 control-label">
          Nazwa hosta:
          </label>
          <div className="col-sm-9">
            <input type="text" className="form-control"  value={this.state.name}
            onChange={this.handleName} placeholder="Nazwa hosta" />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-3 control-label">Stałe IP</label>
          <div className="col-sm-9">
            <input type="text" className="form-control" value={this.state.ip}
            onChange={this.handleIp} placeholder="Stałe IP" />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-5 col-sm-3">
            <button type="submit" className="btn btn-success" onClick={this.addHost.bind(this)} >
            <span className="glyphicon glyphicon-plus"></span> Dodaj</button>
          </div>
        </div>
      </div>
    );
  }
}


class Hosts extends React.Component {

  constructor(props) {
    super(props);
    this.state = {grId:0, grName:"Nazwa?", data: []};
    this.setHosts = this.setHosts.bind(this);
    this.loadHosts = this.loadHosts.bind(this);
  }
  setHosts(id, name){
    this.setState({grId: id, grName: name});
    this.loadHosts(id);
    //this.refs.hostList.setGroup(id);
    //console.log("proper loadHosts method");
  }
  componentDidMount(){
    window.loadHosts = this.setHosts;
  }
  loadHosts(id) {
    var url = this.props.url_get + id;
    console.log("URL: " + url);
    $.ajax({
      url: this.props.url_get + id,
      dataType: 'json',
      cache: false,
      success: function(dataLoaded) {
          this.setState({data: dataLoaded});
          console.log("host list is reoladed");
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url_get, status, err.toString());
      }.bind(this)
    });
  }
  mkLoadHosts(){
    this.loadHosts(this.state.grId);
  }
  render(){
    return (
      <div>
      <div className="panel-heading">Hosty w grupie:
        <big> {this.state.grName}</big>
      </div>
      <div className="panel-body">
      <HostAdd url_add={"api/ins?t=h&id="+this.state.grId + "&n="}
        mkRealoadHosts={this.mkLoadHosts.bind(this)}/>
        <hr />
         <HostList  url_del="/api/del?t=h&id="
         data={this.state.data} ref="hostList"
          mkReloadHosts={this.mkLoadHosts.bind(this)}/>
       </div>
      </div>
    );
  }
}


ReactDOM.render(
  <Hosts  url_del={"/api/del?t=h&id=1"} url_get={"/api/get?t=h&id="} />,
  document.getElementById('hostInsert')
);
