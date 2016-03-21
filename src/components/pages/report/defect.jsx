import React from 'react';
import {Link} from 'react-router';
import _ from 'lodash';
import { connect } from 'react-redux';
import { submitDefect, defectDataChanged } from '../../../actions/report';
import history from '../../../utilities/history';
import RaisedButton from 'material-ui/lib/raised-button';
import Paper from 'material-ui/lib/paper';
import TextField from 'material-ui/lib/text-field';
import Divider from 'material-ui/lib/divider';


const style = {
  marginLeft: 20,
};

class Defect extends React.Component {

  constructor(props){
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.get_signed_request = this.get_signed_request.bind(this);
    this.upload_file = this.upload_file.bind(this);
  }

  componentDidMount() {
    var _this = this;
    this.refs.image.onchange = function(){
      var files = document.getElementById("image").files;
      var file = files[0];

      var img = document.createElement('img');
      var reader = new FileReader();
      reader.onload = e => {
          img.src = e.target.result;

          var canvas = document.createElement("canvas");
          //var canvas = $("<canvas>", {"id":"testing"})[0];
          var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);

          var MAX_WIDTH = 600;
          var MAX_HEIGHT = 800;
          var width = img.width;
          var height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;
          var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          var dataurl = canvas.toDataURL("image/jpeg");
          document.getElementById('image-preview').src = dataurl;

          var binary = atob(dataurl.split(',')[1]);
          var array = [];
          for(var i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
          }
          var resizedImageBlob = new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
          if(resizedImageBlob == null){
            alert("No file selected.");
          }
          else{
            _this.get_signed_request(resizedImageBlob);
          }


      };

      // Load files into file reader
      reader.readAsDataURL(file);
    };




  }

  render() {
    return (
      <div>
        <div>
          <div className='image-preview-container'>
            <img id="image-preview" ref="preview" src=""/>
          </div>

          <Paper zDepth={2}>
            <TextField id="description" hintText="Virhe" style={style} underlineShow={false} onChange={this.handleChange} />
            <Divider />
            <TextField id="responsible" hintText="Vastuullinen" style={style} underlineShow={false} onChange={this.handleChange} />
            <Divider />
            <TextField id="misc" hintText="Muuta" style={style} underlineShow={false} onChange={this.handleChange} />
            <Divider />
          </Paper>
        </div>
        <div className='file-upload'>
          <label for="image" className='button-icon camera-button'>
            <input type="file" id="image" ref="image" accept="image/*;capture=camera" />
          </label>
        </div>
        <div className="footer">
          <RaisedButton label="Tallenna" secondary={true} onClick={ this.submitForm } />
          <RaisedButton label="Peruuta" primary={true} onClick={ (e) => { history.push('/report/new'); return false; }}/>
        </div>
      </div>
    )
  }

  handleChange(e) {
    this.props.dispatch(defectDataChanged({
      [e.target.id]: e.target.value
    }))
  }

  submitForm() {
    var category = this.props.params.category;

    var data = {
      category: {
        id: parseInt(category,10)
      },
      defect: this.props.report.defectTemplate
    };

    this.props.dispatch(submitDefect(data));
    history.push('/report/new');
    return false;
  }

  upload_file(file, signed_request, url){
      var _this = this;
      var xhr = new XMLHttpRequest();
      xhr.open("PUT", signed_request);
      xhr.setRequestHeader('x-amz-acl', 'public-read');
      xhr.onload = function() {
          if (xhr.status === 200) {
              document.getElementById("image-preview").style.backgroundImage = "url('"+url+"')";
              _this.props.dispatch(defectDataChanged({
                'image': url
              }))
          }
      };
      xhr.onerror = function() {
          alert("Could not upload file.");
      };

      xhr.send(file);
  }

  get_signed_request(file){
      var _this = this;
      var filename = new Date().getTime() + '.jpeg';
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "/api/sign_s3?file_name="+filename);
      xhr.onreadystatechange = function(){
          if(xhr.readyState === 4){
              if(xhr.status === 200){
                  var response = JSON.parse(xhr.responseText);
                  _this.upload_file(file, response.signed_request, response.url);
              }
              else{
                  alert("Could not get signed URL.");
              }
          }
      };
      xhr.send();
  }


}




function mapStateToProps(state){
  return {
    report: state.reportReducer
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Defect);
