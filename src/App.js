import React, { Component } from 'react';
import $ from "jquery";
import jsPDF from 'jspdf';
import moment from 'moment';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      assig_name: '',
      course_name: '',
      instruct_name: '',
      student_name: '',
      date: ''
    }

  }
  componentDidMount() {
    this.doc = new jsPDF({
      orientation: 'portrait',
      unit: "mm",
      format: "letter"
    })

    this.doc.writeText = function (x, y, text, options) {
      options = options || {};

      var defaults = {
        align: 'left',
        width: this.internal.pageSize.width
      }

      var settings = $.extend({}, defaults, options);

      // Get current font size
      var fontSize = this.internal.getFontSize();

      // Get the actual text's width
      /* You multiply the unit width of your string by your font size and divide
       * by the internal scale factor. The division is necessary
       * for the case where you use units other than 'pt' in the constructor
       * of jsPDF.
      */
      var txtWidth = this.getStringUnitWidth(text) * fontSize / this.internal.scaleFactor;

      if (settings.align === 'center')
        x += (settings.width - txtWidth) / 2;
      else if (settings.align === 'right')
        x += (settings.width - txtWidth);

      //default is 'left' alignment
      this.text(text, x, y);

    }

  }
  renderCoverPage = (event) => {
    event.preventDefault();
    this.doc.setFontSize(12);//Font Size: 12
    this.doc.setFont("times");//Font: Times new Roman
    this.doc.setFontType("bold");//Font Type: Bold
    //Header
    this.doc.writeText(0, 20, "UNIVERSITY OF THE SOUTHERN CARIBBEAN", { align: 'center' });
    this.doc.writeText(0, 25, "MARACAS ROYAL ROAD, MARACAS, ST. JOSEPH.", { align: 'center' });

    this.doc.setFontType("normal");//Font Type: Normal
    //Assignment Name
    this.doc.writeText(0, 70, this.state.assig_name, { align: 'center' });
    //Decleration
    this.doc.writeText(0, 105, "An Assignment", { align: 'center' });
    this.doc.writeText(0, 110, "Presented in Partial Fulfilment", { align: 'center' });
    this.doc.writeText(0, 115, "of the Requirements for the Course", { align: 'center' });
    //Course Name
    this.doc.writeText(0, 120, this.state.course_name, { align: 'center' });
    //Instructor Name
    this.doc.writeText(0, 150, "INSTRUCTOR: " + this.state.instruct_name, { align: 'center' });
    //Student Name
    this.doc.writeText(0, 190, "By", { align: 'center' });
    this.doc.writeText(0, 200, this.state.student_name, { align: 'center' });
    this.doc.writeText(0, 210, moment(this.state.date).format('DD MMMM YYYY'), { align: 'center' });
    //End
    this.doc.writeText(0, 250, "Approval…….............                     ", { align: 'right' });
    this.doc.save('cover-page.pdf')
  }
  render() {
    return (
      <div>
        <form onSubmit={this.renderCoverPage}>
          <input
            type="text"
            value={this.state.assig_name}
            onChange={event => this.setState({ assig_name: event.target.value })}
            placeholder="Assignment Name"
            required
          />
          <input
            type="text"
            value={this.state.course_name}
            onChange={event => this.setState({ course_name: event.target.value })}
            placeholder="Course Name"
            required
          />
          <input
            type="text"
            value={this.state.instruct_name}
            onChange={event => this.setState({ instruct_name: event.target.value })}
            placeholder="Instructor Name"
            required
          />
          <input
            type="text"
            value={this.state.student_name}
            onChange={event => this.setState({ student_name: event.target.value })}
            placeholder="Student Name"
            required
          />
          <input
            type='date'
            value={this.state.date}
            onChange={event => this.setState({ date: event.target.value })}
            placeholder="Date"
            required
          />
          <button type="submit">Generate Cover Page</button>
        </form>
      </div>
    );
  }
}

export default App;
