import React from 'react';
import {Link} from 'react-router';
import _ from 'lodash';
import { connect } from 'react-redux';
import { submitDefect } from '../../../actions/report';
import history from '../../../utilities/history';

class Defect extends React.Component {

  constructor(props){
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  render() {
    return (
      <div>
        <div>
          <div>
            <input type="file" id="image" ref="image" accept="image/*;capture=camera" />
          </div>

          <div>
            <label htmlFor="defect">Virhe</label>
            <input name="defect" ref="defect" type="text" />
          </div>
          <div>
            <label htmlFor="responsible">Vastuu</label>
            <input name="responsible" ref="responsible" type="text" />
          </div>
          <div>
            <label htmlFor="misc">Muuta</label>
            <input name="misc" ref="misc" type="text" />
          </div>
          <button onClick={this.submitForm}>Tallenna</button>
        </div>
        <Link to="/report/new"> Takaisin </Link>
        <img id="image-preview" ref="preview" src=""/>
      </div>
    )
  }

  componentDidMount() {
    this.refs.image.onchange = function(){
        var files = document.getElementById("image").files;
        var file = files[0];
        if(file == null){
            alert("No file selected.");
        }
        else{
            get_signed_request(file);
        }
    };
  }

  submitForm() {
    var category = this.props.params.category;

    var data = {
      category: {
        id: category
      },
      defect:{
        image: this.refs.preview.src,
        defect: this.refs.defect.value,
        responsible: this.refs.responsible.value,
        misc: this.refs.misc.value
      }
    };
    console.info(data);

    this.props.dispatch(submitDefect(data));
    history.push('/report/new');
  }

}

function upload_file(file, signed_request, url){
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", signed_request);
    xhr.setRequestHeader('x-amz-acl', 'public-read');
    xhr.onload = function() {
        if (xhr.status === 200) {
            document.getElementById("image-preview").src = url;
        }
    };
    xhr.onerror = function() {
        alert("Could not upload file.");
    };
    xhr.send(file);
}

function get_signed_request(file){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/sign_s3?file_name="+file.name+"&file_type="+file.type);
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                var response = JSON.parse(xhr.responseText);
                upload_file(file, response.signed_request, response.url);
            }
            else{
                alert("Could not get signed URL.");
            }
        }
    };
    xhr.send();
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
