##  App.js
import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    topText: '',
    bottomText: '',
    allMemeImgs: [],
    randomImg: ''
  };

  // ComponentDidMount lifecycle method to fetch images from the API
  componentDidMount() {
    // Fetching data from the API
    fetch('https://api.imgflip.com/get_memes')
      // Converting the promise received into JSON
     .then(response => response.json())
     .then(content => {
        // Updating state variables
        this.setState({
          allMemeImgs: content.data.memes
        });
      });
  }

  // Method to handle changes in input fields
  handleChange = event => {
    // Destructuring the event.target object
    const { name, value } = event.target;

    // Updating the state variable
    this.setState({
      [name]: value
    });
  };

  // Method to submit the form and create a meme
  handleSubmit = event => {
    event.preventDefault();
    const { allMemeImgs } = this.state;
    // Correctly calculating the index for a random image
    const randIndex = Math.floor(Math.random() * allMemeImgs.length);
    const rand = allMemeImgs[randIndex].url;
    this.setState({
      randomImg: rand
    });
  };

  render() {
    return (
      <div>
        {/* Controlled form for entering top and bottom text */}
        <form className="meme-form" onSubmit={this.handleSubmit}>
          {/* Input field for the top text */}
          <input
            placeholder="Enter Top Text"
            type="text"
            value={this.state.topText}
            name="topText"
            onChange={this.handleChange}
          />
          {/* Input field for the bottom text */}
          <input
            placeholder="Enter Bottom Text"
            type="text"
            value={this.state.bottomText}
            name="bottomText"
            onChange={this.handleChange}
          />
          {/* Button to generate the meme */}
          <button type="submit">Generate Meme</button>
        </form>
        <br />
        {/* Display area for the generated meme */}
        <div className="meme">
          {/* Conditionally rendering the meme image and text */}
          {this.state.randomImg && (
            <>
              <img src={this.state.randomImg} alt="Generated Meme" />
              <h2 className="top">{this.state.topText}</h2>
              <h2 className="bottom">{this.state.bottomText}</h2>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default App;
