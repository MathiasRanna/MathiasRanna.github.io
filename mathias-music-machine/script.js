/* 1. nupud oigesti toole, 2. vol nupp parast naitab laulu nime */


const musicFiles = [
{
  keyCode: 81,
  keyTrigger: "Q",
  clipName: "Tiësto Allure - Pair Of Dice (Radio Edit)",
  id: "Pair-Of-Dice",
  url:
  "https://dl.dropbox.com/s/u32apb7wl4z0abr/Ti%C3%ABsto%20%20Allure%20-%20Pair%20Of%20Dice%20%28Radio%20Edit%29.mp3?dl=0" },

{
  keyCode: 87,
  keyTrigger: "W",
  clipName: "Robin Schulz feat. Erika Sirola - Speechless",
  id: "Speechless",
  url:
  "https://dl.dropbox.com/s/rirdacgv842n19z/Robin%20Schulz%20feat.%20Erika%20Sirola%20-%20Speechless%20%28Lyrics%29.mp3?dl=0" },

{
  keyCode: 69,
  keyTrigger: "E",
  clipName: "PETIT BISCUIT - Sunset Love",
  id: "Sunset-Love",
  url:
  "https://dl.dropbox.com/s/ncv727qclyg0e5l/PETIT%20BISCUIT%20-%20Sunset%20Lover.mp3?dl=0" },

{
  keyCode: 65,
  keyTrigger: "A",
  clipName: "Eklo - Lets Go Home (Sinco Remix)",
  id: "Lets-Go-Home",
  url:
  "https://dl.dropbox.com/s/nixax61siercuzm/Eklo%20-%20Lets%20Go%20Home%20%28Sinco%20Remix%29.mp3?dl=0" },

{
  keyCode: 83,
  keyTrigger: "S",
  clipName: "Lost Frequencies - Are You With Me (Kungs Remix)",
  id: "Are-You-With-Me",
  url:
  "https://dl.dropbox.com/s/9hruu7ag6nk5e49/Lost%20Frequencies%20-%20Are%20You%20With%20Me%20%28Kungs%20Remix%29.mp3?dl=0" },

{
  keyCode: 68,
  keyTrigger: "D",
  clipName: "KLYMVX feat. COZY - Fallen (Kygo Rework)",
  id: "Fallen",
  url:
  "https://dl.dropbox.com/s/8np1rhnfutwyimw/KLYMVX%20feat.%20COZY%20-%20Fallen%20%28Kygo%20Rework%29.mp3?dl=0" },

{
  keyCode: 90,
  keyTrigger: "Z",
  clipName: "Danny Ocean - Swing",
  id: "Swing",
  url:
  "https://dl.dropbox.com/s/4c2ypp31ofdjbjl/Danny%20Ocean%20-%20Swing%20%28Letra%20%20Lyrics%29.mp3?dl=0" },

{
  keyCode: 88,
  keyTrigger: "X",
  clipName: "Sech & Darell - Otro Trago",
  id: "Otro Trago",
  url:
  "https://dl.dropbox.com/s/vu8u5qntv9qhfzf/Sech%20%20Darell%20-%20%20Otro%20Trago%28LETRA%29.mp3?dl=0" },

{
  keyCode: 67,
  keyTrigger: "C",
  clipName: "Eladio Carrion Ft Zion - Mi Error",
  id: "Mi Error",
  url:
  "https://dl.dropbox.com/s/xeoceqaj9vyizxm/Eladio%20Carrion%20Ft%20Zion%20-%20Mi%20Error%20%28Letra%29.mp3?dl=0" }];



const inactiveStyle = {
  backgroundColor: "#424242" };


const activeStyle = {
  backgroundColor: "Blue",
  margin: "40px" };


class SoundPad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      padStyle: inactiveStyle };

    this.playSound = this.playSound.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.padControl = this.padControl.bind(this);
    this.stopOther = this.stopOther.bind(this);
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
    document.addEventListener("play", this.stopOther, true);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
    document.removeEventListener("play", this.stopOther, true);
  }

  handleKeyPress(e) {
    if (e.keyCode === this.props.keyCode) {
      this.playSound();
    }
  }

  playSound(e) {
    const sound = document.getElementById(this.props.keyTrigger);
    sound.currentTime = 0;
    sound.play();
    setTimeout(() => this.padControl(), 100);
    this.props.changeDisplay(this.props.clipName);
  }

  padControl() {
    if (this.props.power) {
      this.state.padStyle.backgroundColor === 'blue' ?
      this.setState({
        padStyle: inactiveStyle }) :

      this.setState({
        padStyle: activeStyle });

    } else {
      this.setState({
        padStyle: inactiveStyle });

    }
  }

  stopOther(e) {
    var audios = document.getElementsByClassName("clip");
    for (var i = 0, len = audios.length; i < len; i++) {
      if (audios[i] != e.target) {
        audios[i].pause();
      }
    }
  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", {
        className: "drum-pad",
        id: this.props.clipId,
        onClick: this.playSound,
        style: this.state.padStyle }, /*#__PURE__*/

      React.createElement("audio", {
        className: "clip",
        id: this.props.keyTrigger,
        src: this.props.clip }),

      this.props.keyTrigger));


  }}


class SoundPadSide extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let MusicBank;
    this.props.power ?
    MusicBank = this.props.musicData.map((Obj, i, MusicArr) => {
      return /*#__PURE__*/(
        React.createElement(SoundPad, {
          clipId: MusicArr[i].id,
          clip: MusicArr[i].url,
          keyCode: MusicArr[i].keyCode,
          keyTrigger: MusicArr[i].keyTrigger,
          clipName: MusicArr[i].clipName,
          changeDisplay: this.props.changeDisplay,
          power: this.props.power }));


    }) :
    MusicBank = this.props.musicData.map((Obj, i, MusicArr) => {
      return /*#__PURE__*/(
        React.createElement(SoundPad, {
          clipId: MusicArr[i].id,
          clip: "#",
          keyCode: MusicArr[i].keyCode,
          keyTrigger: MusicArr[i].keyTrigger,
          clipName: MusicArr[i].clipName,
          changeDisplay: this.props.changeDisplay,
          power: this.props.power }));


    });

    return /*#__PURE__*/React.createElement("div", { className: "music-Bank" }, " ", MusicBank, " ");
  }}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      power: true,
      musicData: musicFiles,
      display: String.fromCharCode(160),
      sliderVal: 0.35 };

    this.displayClipName = this.displayClipName.bind(this);
    this.adjustVol = this.adjustVol.bind(this);
    this.changePower = this.changePower.bind(this);
  }
  componentDidMount() {
    document.addEventListener("click", e => {
      if (
      e.target.classList.contains("drum-pad") &&
      e.target.style.backgroundColor === "blue")
      {
        var drumPads = document.getElementsByClassName("drum-pad");
        for (var drumPad of drumPads) {
          Object.keys(inactiveStyle).map(key => {
            drumPad.style[key] = inactiveStyle[key];
          });
        }
        Object.keys(activeStyle).map(key => {
          e.target.style[key] = activeStyle[key];
        });
      }
    });
    document.addEventListener("click", e => {
      if (e.target.classList.contains("inner")) {
        var drumPads = document.getElementsByClassName("drum-pad");
        for (var drumPad of drumPads) {
          Object.keys(inactiveStyle).map(key => {
            drumPad.style[key] = inactiveStyle[key];
          });
        }
      }});
  }

  componentWillUnmount() {
    document.removeEventListener("click", e => {
      if (e.target.classList.contains("drum-pad")) {
        var drumPads = document.getElementsByClassName("drum-pad");
        for (var drumPad of drumPads) {
          Object.keys(inactiveStyle).map(key => {
            drumPad.style[key] = inactiveStyle[key];
          });
        }
        Object.keys(activeStyle).map(key => {
          e.target.style[key] = activeStyle[key];
        });
      }
    });
    document.removeEventListener("click", e => {
      if (e.target.classList.contains("inner")) {
        var drumPads = document.getElementsByClassName("drum-pad");
        for (var drumPad of drumPads) {
          Object.keys(inactiveStyle).map(key => {
            drumPad.style[key] = inactiveStyle[key];
          });
        }
      }});
  }

  displayClipName(name) {
    if (this.state.power) {
      this.setState({
        display: name });

    }
  }

  changePower() {
    this.setState({
      power: !this.state.power });

    if (this.state.power) {
      this.setState({
        display: "OFF" });

      setTimeout(() => this.clearDisplay(), 1000);
    } else {
      this.setState({
        display: "ON" });

      setTimeout(() => this.clearDisplay(), 1000);
    }
  }

  adjustVol(e) {
    if (this.state.power) {
      this.setState({
        sliderVal: e.target.value,
        display: "Volume: " + Math.round(e.target.value * 100) });

      setTimeout(() => this.clearDisplay(), 1500);
    }
  }

  clearDisplay() {
    this.setState({
      display: String.fromCharCode(160) });

  }

  render() {
    const powerStyle = this.state.power ?
    { float: "left" } :
    { float: "right" };
    const clips = [].slice.call(document.getElementsByClassName("clip"));
    clips.forEach(sound => {
      sound.volume = this.state.sliderVal;
    });

    return /*#__PURE__*/(
      React.createElement("div", { id: "drum-machine" }, /*#__PURE__*/
      React.createElement("div", { id: "right-container" }, /*#__PURE__*/
      React.createElement("div", { className: "control" }, /*#__PURE__*/
      React.createElement("p", null, "Power"), /*#__PURE__*/
      React.createElement("div", { onClick: this.changePower, className: "select" }, /*#__PURE__*/
      React.createElement("div", { style: powerStyle, className: "inner" }))),

      " ", /*#__PURE__*/
      React.createElement("br", null), /*#__PURE__*/
      React.createElement("div", { id: "display" }, " ", this.state.display, " "), /*#__PURE__*/
      React.createElement("input", {
        type: "range",
        min: "0",
        max: "1",
        step: "0.01",
        value: this.state.sliderVal,
        onChange: this.adjustVol })), /*#__PURE__*/



      React.createElement("div", { id: "left-container" }, /*#__PURE__*/
      React.createElement(SoundPadSide, {
        musicData: this.state.musicData,
        changeDisplay: this.displayClipName,
        power: this.state.power }))));




  }}


ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("root"));