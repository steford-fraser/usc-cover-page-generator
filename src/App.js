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

    //Reload page to clear written text
    window.location.reload();

  }
  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'space-between'}}>
        <nav style={{backgroundColor: '#477D2F'}}>
          <div className="nav-wrapper">
            <a href="#" className="brand-logo">USC Cover Page Generator</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><a href="https://github.com/steford-fraser/usc-cover-page-generator">Contribute on Github</a></li>
            </ul>
          </div>
        </nav>
        <div className="container">
          <div className="row">
            <div className="col s12">
              <form onSubmit={this.renderCoverPage}>
                <div className="input-field">
                  <input
                    className="validate"
                    type="text"
                    value={this.state.assig_name}
                    onChange={event => this.setState({ assig_name: event.target.value })}
                    placeholder="Assignment Name"
                    required
                  />
                  <label htmlFor="first_name">Assignment Name</label>
                </div>
                <div className="input-field">
                  <input
                    type="text"
                    value={this.state.course_name}
                    onChange={event => this.setState({ course_name: event.target.value })}
                    placeholder="Course Name"
                    required
                  />
                  <label htmlFor="first_name">Course Name</label>
                </div>
                <div className="input-field">
                  <input
                    type="text"
                    value={this.state.instruct_name}
                    onChange={event => this.setState({ instruct_name: event.target.value })}
                    placeholder="Instructor Name"
                    required
                  />
                  <label htmlFor="first_name">Instructor Name</label>
                </div>
                <div className="input-field">
                  <input
                    type="text"
                    value={this.state.student_name}
                    onChange={event => this.setState({ student_name: event.target.value })}
                    placeholder="Student Name"
                    required
                  />
                  <label htmlFor="first_name">Student Name</label>
                </div>
                <div className="input-field">
                  <input
                    type='date'
                    value={this.state.date}
                    onChange={event => this.setState({ date: event.target.value })}
                    placeholder="Date"
                    required
                  />
                  <label htmlFor="first_name">Date</label>
                </div>
                <button className="btn waves-effect waves-light" type="submit" name="action">Generate Cover Page
                <i className="material-icons right">send</i>
                </button>
              </form>

            </div>
          </div>
        </div>
        <footer style={{backgroundColor: '#477D2F'}} className="page-footer">
          <div className="container">
            <div className="row">
              <div className="col l6 s12">
                <h5 className="white-text">Incase you were wondering</h5>
                <p className="grey-text text-lighten-4">These are the packages I used to create this.</p>
              </div>
              <div className="col l4 offset-l2 s12">
                <h5 className="white-text">Links</h5>
                <ul>
                  <li><a className="grey-text text-lighten-3" href="https://github.com/MrRio/jsPDF">jsPDF</a></li>
                  <li><a className="grey-text text-lighten-3" href="https://reactjs.org/">React Js</a></li>
                  <li><a className="grey-text text-lighten-3" href="https://jquery.com/">jQuery</a></li>
                  <li><a className="grey-text text-lighten-3" href="https://momentjs.com/">Moment.js</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <div className="container">
              By Steford Fraser @ 2015         
            </div>
          </div>
        </footer>

      </div>
    );
  }
}

export default App;
