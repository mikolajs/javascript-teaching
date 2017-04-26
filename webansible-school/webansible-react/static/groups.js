window.loadHosts = function(){ console.log("empty load hosts function")};

class HostGroup extends React.Component {
  constructor(props){
    super(props);
    this.state = {data: [], idGr: 0, nameGr: ''};
    this.loadFromServer = this.loadFromServer.bind(this);
    this.reloadGroups = this.reloadGroups.bind(this);
    this.mkChangeGroup = this.mkChangeGroup.bind(this);
    this.actionAddNew = this.actionAddNew.bind(this);
    this.actionEdit = this.actionEdit.bind(this);
    this.actionDel = this.actionDel.bind(this);
  }
  loadFromServer() {
    $.ajax({
      url: this.props.url_get,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
        if(data.length > 0) {
          var id = data[0].id;
          var name = data[0].name;
          this.setState({idGr: id, nameGr: name});
          window.loadHosts(id, name);
        }
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url_get, status, err.toString());
      }.bind(this)
    });
  }
  componentDidMount() {
    this.loadFromServer();
  }
  //when group was edited in editbox
  reloadGroups() {
    this.loadFromServer();
  }
  mkChangeGroup(event) {
    this.refs.edit.hideAll();
    var id = event.target.value;
    var name = $(event.target).find('option:selected').text();
    this.setState({idGr: id, nameGr: name});
    console.log("choosen group : " + name + " ID: " + id);
    window.loadHosts(id, name);
  }
  actionAddNew(event){
    this.refs.edit.setGroup(0, "");
     $('#groupEditForm').show(200);
  }
  actionEdit(event){
    this.refs.edit.setGroup(this.state.idGr, this.state.nameGr);
    $('#groupEditForm').show(200);
  }
  actionDel(event){
    if(confirm("Are you shure to remove all group " + this.state.nameGr
      + " with hosts?!")) {
        $.ajax({
          url: "/api/del?t=g&id=" + this.state.idGr,
          dataType: 'json',
          cache: false,
          success: function(data) {
            if(data.Ans == "OK") this.loadFromServer();
            else console.log("Not added");
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url_add, status, err.toString());
          }.bind(this)
        });
      }
  }
  render() {
    var value = 0;
    var options = this.state.data.map((group) => {
      if(value == 0) value = group.id;
      return (
        <option value={group.id} key={group.id}>{group.name}</option>
      );
    });
    return (
      <div >
      <div className="row" >
        <div className="col-md-6" >
        <select className="form-control" value={this.state.idGr}
        onChange={this.mkChangeGroup}> {options}</select>
        </div>
        <div className="col-md-6">
        <div className="btn-group">
          <button type="button" className="btn btn-success"
          onClick={this.actionAddNew} >
            <span className="glyphicon glyphicon-plus"></span> Dodaj
          </button>
          <button type="button" className="btn btn-info"
          onClick={this.actionEdit}>
            <span className="glyphicon glyphicon-pencil"></span> Edytuj
          </button>
          <button type="button" className="btn btn-danger"
          onClick={this.actionDel}>
            <span className="glyphicon glyphicon-minus"></span> Usuń
          </button>
        </div>
        </div>
     </div>
      <hr />
      <EditGroupForm  ref="edit" url_edit={"/api/alt?t=g&"}
        url_add={"/api/ins?t=g&n="} reloadGroups={this.reloadGroups.bind(this)}/>
    </div>
    );
  }
}



class EditGroupForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {id:0,name:''};
    this.setGroupName = this.setGroupName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.hideAll = this.hideAll.bind(this);
    this.editGroupOnServer = this.editGroupOnServer.bind(this);
    this.setGroup = this.setGroup.bind(this);
  }
  setGroup(idG, nameG){
    this.setState({id:idG, name:nameG});
    console.log("setGroup: " + idG + ":" + nameG);
  }
 setGroupName(event){
   this.setState({name: event.target.value});
 }
 handleSubmit(event){
   event.preventDefault();
   var groupName = this.state.name;
   if(!groupName) return;
   this.editGroupOnServer();
   $('#groupEditForm').hide(200);
 }
 hideAll(event){
   $('#groupEditForm').hide(200);
 }
 editGroupOnServer(){
   var urlAct = "";
   if(this.state.id > 0){
     urlAct = this.props.url_edit + 'id=' + this.state.id +
      '&n=' + this.state.name;
   } else {
     urlAct = this.props.url_add + this.state.name.trim();
   }
   $.ajax({
     url: urlAct,
     dataType: 'json',
     cache: false,
     success: function(data) {
       if(data.Ans == "OK") this.props.reloadGroups();
       else console.log("Not added");
     }.bind(this),
     error: function(xhr, status, err) {
       console.error(this.props.url_add, status, err.toString());
     }.bind(this)
   });
 }
 render() {
    return (
      <div className="alert" id="groupEditForm" style={{"display": "none"}} >
      <form className="input-group btn-xs" onSubmit={this.handleSubmit} >
        <input type="text" style={{"display" : "none"}} id="idEdit"
        value={this.state.id}/>
        <input type="text" className="form-control" placeholder="Nazwa grupy bez spacji"
        value={this.state.name}  onChange={this.setGroupName} />
        <span className="input-group-btn">
                <button className="btn btn-success" type="submit" >Zapisz!</button>
                <button className="btn btn-danger" type="button" onClick={this.hideAll}>
                <span className="glyphicon glyphicon-remove-circle" ></span>
                </button>
        </span>
      </form>
      </div>
    );
  }
}

EditGroupForm.propTypes = {
  reloadGroups: React.PropTypes.func,
};



ReactDOM.render(
  <HostGroup url_get="/api/get?t=g" />,
  document.getElementById('hostGroup')
);
