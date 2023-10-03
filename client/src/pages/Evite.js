function Evite() {
    return (
      <div className="Evite">
        <h1 color="#f4a1e9">Evite Page</h1>
        <h2>Attendees</h2>
        <h2 align="left">Invitation</h2>
        <canvas id = "invitation" width = "150" height = "100"></canvas>
        <button color = "#d6300d">Color</button>
        <button type = "button" color = "#2a85ec">Images</button>
        <button type = "button" color = "#000000">Text</button>
        <br />
        <button type = "submit" color="#08f525">Send Invitation</button>
        <br />
        <rect width="150" height="100" />
      </div>
    );
  }
  
  export default Evite;
  