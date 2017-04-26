


class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
  tick() {
    this.setState({
      date: new Date()
    });
  }
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}


class Frame extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className="row">
      <div className="col-md-6">{this.props.children}</div>
      <div className="col-md-6">{this.props.right}</div>
      </div>
    );
  }
}

class Block extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <Frame right={<Clock />}>
      <h2>This is the child of element</h2>
      </Frame>
    );
  }
}

class Component1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {info: 'empty'};
    this.updateState = this.updateState.bind(this);
  }
  updateState(event){
    this.setState({info: event.target.value});
    console.log('this.state.val = ' + this.state.info);
  }
  render() {
    return (
      <div className="group1">
        <label>Component1:
        <input value={this.state.info} onChange={this.updateState}/>
        </label>
        <InnerComp1 data={this.state.info} />
      </div>
    );
  }
}


class InnerComp1 extends React.Component {
  constructor(props){
    super(props);
    //this.dataChange = this.dataChange.bind(this);
  }
  render(){
      return (
        <label>InnerComp1 <input value={this.props.data} /></label>
      );
  }
}


class Component2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {info: '', add: ''};
    this.refresh= this.refresh.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  refresh(event){
    var cont = this.refs.inner.refresh(this.state.add);
    this.setState({info: cont});
    //console.log('info = ' + this.state.info);
  }
  handleChange(event){
    this.setState({add: event.target.value});
  }
  render() {
    return (
      <div className="group2">
      <h3>{this.state.info}</h3>
      <label>Component2<input type="text" value={this.state.add} onChange={this.handleChange} /></label>
      <button onClick={this.refresh}>Refresh</button>
      <InnerComp2 ref="inner" />
      </div>
    );
  }
}

class InnerComp2 extends React.Component {
  constructor(props){
    super(props);
    this.state = {cont: "content"};
    this.refresh = this.refresh.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event){
    this.setState({cont: event.target.value });
  }
  refresh(n){
    console.log('refresh: ' + this.state.cont + n);
    this.setState({cont: n });
    return this.state.cont;
  }
  render(){
      return (
        <label>InnerComp2<input value={this.state.cont} onChange={this.handleChange} /></label>
      );
  }
}


class Component3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {info: 'Info'};
  }
  refresh(str){
    this.setState({info: str});
    //console.log('info = ' + this.state.info);
  }
  render() {
    return (
      <div className="group2">
      <h3>{this.state.info}</h3>
      <InnerComp3  refresh={this.refresh.bind(this)}   />
      </div>
    );
  }
}

class InnerComp3 extends React.Component {
  constructor(props){
    super(props);
    this.state = {cont: "comp 3"};
    this.toParent= this.toParent.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  toParent(event){
    this.props.refresh(this.state.cont);
  }
  handleChange(event){
    this.setState({cont: event.target.value });
  }
  render(){
      return (
        <div>
        <label>InnerComp3: <input value={this.state.cont} onChange={this.handleChange} />
        </label><button onClick={this.toParent}>OK</button>
        </div>
      );
  }
}

InnerComp3.propTypes = {
  refresh: React.PropTypes.func,
};

class CompIndependent1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {info: 'Info'};
    this.refresh = this.refresh.bind(this);
    window.globalF = this.refresh;
  }
  refresh(str){
    this.setState({info: str});
    console.log('info = ' + this.state.info);
  }
  render() {
    return (
      <div className="group2">
      <h2>Indep1</h2>
      <h3>{this.state.info}</h3>
      </div>
    );
  }
}

class CompIndependent2 extends React.Component {
  constructor(props){
    super(props);
    this.state = {cont: "comp 3"};
    this.toOther= this.toParent.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  toParent(event){
    window.globalF(this.state.cont);
    //console.log('toParent');
  }
  handleChange(event){
    this.setState({cont: event.target.value });
  }
  render(){
      return (
        <div>
        <label>Indep2: <input value={this.state.cont} onChange={this.handleChange} />
        </label><button onClick={this.toOther}>OK</button>
        </div>
      );
  }
}


ReactDOM.render(
  <Component1 />,
  document.getElementById('mainComp1')
);

ReactDOM.render(
  <Component2 />,
  document.getElementById('mainComp2')
);

ReactDOM.render(
  <Component3 />,
  document.getElementById('mainComp3')
);

ReactDOM.render(
  <Block />,
  document.getElementById('extra')
);

ReactDOM.render(
  <CompIndependent1 />,
  document.getElementById('indep1')
);

ReactDOM.render(
  <CompIndependent2 />,
  document.getElementById('indep2')
);
