import * as React from 'react';
const {
  Component,
} = React;

class TextEdit extends Component {
  render() {
    return (
      <div className="TextEdit">
        <h3>
          Here's the TextEdit component.
        </h3>
        <textarea
          rows="10" cols="50"
          placeholder="Write something here..."
          >
        </textarea>
      </div>
    );
  }
}
export default TextEdit;
