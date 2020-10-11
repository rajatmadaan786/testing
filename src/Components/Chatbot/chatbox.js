import React, {useState,useEffect} from 'react';
import './chatbox.css';
import swal from 'sweetalert';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import MicRecorder from 'mic-recorder-to-mp3';
import html2canvas from 'html2canvas';

var recorder = new MicRecorder({
  bitRate: 128
}); 

var seconds = 0, minutes = 0, hours = 0, t;

function ChatBox(){
	var [isRecording, setRecording] = useState(false);
	var [isModalOpen, toggleFeedbackModal] = useState(false);
	var [recording_time, setRecordingTime] = useState('00:00:00');
	var [feedbackFormData, feedbackFormDataHandler] = useState({feedbackText:'',include_screenshot:true, currentPageScreenshotURL:''});

	useEffect(()=>{
		var currentPageScreenshot = document.getElementById('current-page-screenshot');
		if(!feedbackFormData.include_screenshot){
			if(currentPageScreenshot){
				currentPageScreenshot.children[0].style.display = 'none';
			}
		}else{
			if(currentPageScreenshot){
				currentPageScreenshot.children[0].style.display = 'block';
			}
		}
	})

	function imageUpload() {
		document.getElementById('file-input').click();
	}

	function add() {
		seconds++;
		if (seconds >= 60) {
		    seconds = 0;
		    minutes++;
		    if (minutes >= 60) {
		        minutes = 0;
		        hours++;
		    }
		}

		var result = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

		var recordingTimeElm = document.getElementsByClassName('recording-time')[0];
		if(recordingTimeElm){
			setRecordingTime(result);
			timer();
		}
	}

	function timer() {
		t = setTimeout(add, 1000);
	}

	function startRecording(){
		recorder.start().then(() => {
		  setRecording(true);
		  timer();
		})
		.catch((error) => {
		  if(error.name==="NotAllowedError"){
		    swal({
		      title: "Error",
		      text: 'Permission Denied! \n Please grant microphone access to record the audio.',
		      icon: "warning"
		    })
		  }else{
		    swal({
		      title: "Error",
		      text: 'An unknown error occured while recording the audio! \n Please try again later or contact to the administrator.',
		      icon: "warning"
		    })        
		  }
		});
	}

	function stopRecording(){
		recorder.stop().getMp3().then(([buffer, blob]) => {
			var file = new File(buffer, 'me-at-thevoice.mp3', {
				type: blob.type,
				lastModified: Date.now()
			});

			var player = new Audio(URL.createObjectURL(file));
			var li = document.createElement('li');
			player.controls = true;
			li.appendChild(player);
			document.querySelector('.playlist').appendChild(li);


			var elem = document.getElementsByClassName('chat-body')[0];
			elem.scrollTop = elem.scrollHeight;
			
			setRecording(false);
			setRecordingTime('00:00:00');
			seconds = 0; minutes = 0; hours = 0;
			clearTimeout(t);
		})
		.catch((e) => {
			console.log(e);
			alert('Error occured while saving recording');
			console.log(e);
		});
	}

	function handleInputChange(event) {
	    var target = event.target;
	    var value = target.type === 'checkbox' ? target.checked : target.value;
	    var name = target.name;

	    var newObj = {...feedbackFormData, [name]:value};
	    feedbackFormDataHandler(newObj);
	}

	function sendFeedbackData(){
		var data = {
			feedbackText: feedbackFormData.feedbackText
		}
		if(feedbackFormData.include_screenshot){
			data['image'] = feedbackFormData.currentPageScreenshotURL;
		}

		console.log(data);

		swal({
	      title: "Success",
	      text: 'Feedback sent successfully!',
	      icon: "success"
	    })

	    toggleFeedbackModal(!isModalOpen);
	}

	var toggleFeedbackForm = () => {
		toggleFeedbackModal(!isModalOpen);
		setTimeout(function(){	
		    var pageScreenshotElm = document.getElementById('current-page-screenshot');
		    if(pageScreenshotElm){
				html2canvas(document.getElementById('root')).then(function(canvas) {
					var image = new Image();
					image.src = canvas.toDataURL();
					pageScreenshotElm.appendChild(image);	

				    var newObj = {...feedbackFormData, currentPageScreenshotURL:canvas.toDataURL()};
				    feedbackFormDataHandler(newObj);

				});
			}
		},500)
	}

	return(
		<div className="container main-wrapper mt-3">
		<div className="row" style={{minHeight: 'calc(100vh - 100px)'}}>
			<div className="col-lg-12 chat-wrapper">
				<div className="row chat-header">
					<div className="chat-header-info-part ml-2">
					  <i className="fa fa-arrow-left arrow-icon"></i>
					  <i className="fa fa-user-circle-o fa-2x user-icon"></i>
					  <span className="chat-username"> &lt;Name&gt; </span>
					</div>
					<div>
					  <i className="fa fa-bars fa fa-2x mr-2"></i>
					</div>
				</div>

				<div className="row chat-body">
					<div className="message-box-holder message-seen">
					  <div className="message-box">
					     <span className='msg'>Hello</span>
						 <img src="images/blue-tick.png" className='tick'/>
					  </div>
					</div>
					<div className="message-box-holder">
					  <div className="message-box message-partner">
					     <span className='msg'>Hi</span>
					  </div>
					</div>
					<div className="message-box-holder message-seen">
					  <div className="message-box">
					  <span className='msg'>How are you doing?</span>
						 <img src="images/blue-tick.png" className='tick'/>
					  </div>
					</div>
					<div className="message-box-holder">
					  <div className="message-box message-partner">
					  	<span className='msg'>I'm doing fine. How about you?</span>
					  </div>
					</div>
					<div className="message-box-holder">
					  <div className="message-box">
					  		<span className='msg'>I am fine.</span>
						 <img src="images/blue-tick.png" className='tick'/>
					  </div>
					</div>
					<div className="message-box-holder">
					  <div className="message-box message-partner">
					  	<span className='msg'>Yeah sure. Let's meet in the Einstein cafe this evening and discuss the matter.</span>
					  </div>
					</div>
					<div className="message-box-holder">
					  <div className="message-box message-partner">
					  	<span className='msg'>I thought of coming to your place and discuss about it but I had to finish my projects and I didn't have enough time to go out of the house.</span>
					  </div>
					</div>
					<div className="message-box-holder message-seen">
					  <div className="message-box">
					  	<span className='msg'>Okay, As you wish.</span>
						 <img src="images/blue-tick.png" className='tick'/>
					  </div>
					</div>
					<div className="voice-recording">
					  <ul className="playlist"></ul>
					</div>
				</div>
				
				<div className="row chat-footer">
					<div className="message-input-box">
						<i className="fa fa-commenting-o feedback-icon" onClick={toggleFeedbackForm} />
						<input type="text" className="chat-message" placeholder="Type message" />
						{
						(!isRecording)?
						  <i className="fa fa-microphone microphone-icon" onClick={startRecording} />
						 :
						  <>
						    <small className="recording-time">{recording_time}</small>
						    <i className="fa fa-square recording-icon" onClick={stopRecording} />
						  </>
						}
					</div>
					<div className="image-upload">
					  <button className="paperclip" onClick={imageUpload}>
					    <i className="fa fa-paperclip"/>
					  </button>
					    <input id="file-input" type="file"/>
					</div>
					<button className="send-attachment">
					  <i className="fa fa-paper-plane-o" />
					</button>
				</div>
			</div>
			<Modal isOpen={isModalOpen}>
		        <ModalHeader>Send Feedback</ModalHeader>
		        <ModalBody>
					<textarea className="feedback-text" placeholder="Have feedback? We’d love to hear it, but please don’t share sensitive information. Have questions? Try help or support." name="feedbackText" onChange={handleInputChange}></textarea>
					<label className="mb-3"><input type="checkbox" name="include_screenshot" onChange={handleInputChange} checked={feedbackFormData.include_screenshot} /> Include Screenshot</label>
					<div id="current-page-screenshot"></div>
					<small>Go to the Legal Help page to request content changes for legal reasons. Some account and system information may be sent to Google. We will use the information you give us to help address technical issues and to improve our services, subject to our Privacy Policy and Terms of Service.</small>
		        </ModalBody>
		        <ModalFooter>
			        <div className="action-buttons">
				        <button className="btn" onClick={toggleFeedbackForm}>Cancel</button>
				        <button className="btn btn-link" onClick={sendFeedbackData}>Send</button>
			        </div>
		        </ModalFooter>
		    </Modal>  
		</div>
		</div>
	);
}

export default ChatBox;