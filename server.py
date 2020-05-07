
#web cakeraeov knkare video
# heto sra het mek tegh dzaynel kavelacnem

def is_number(s):
	try: 
		float(s)
		return True
	except ValueError:
		return False


video_finish = False
def hello():
	global video_finish
	video_finish = True

def RecordVideoToWebcam(settimeout=60):
	try:
		# This will return video from the first webcam on your computer. 
		cap = cv2.VideoCapture(0)   

		# Define the codec and create VideoWriter object 
		fourcc = cv2.VideoWriter_fourcc(*'XVID') 
		out = cv2.VideoWriter(os.path.join('static/public/webcam', 'video.mp4'), fourcc, 5.0, (640, 480)) 


		t = threading.Timer(settimeout, hello)
		t.start()

		# loop runs if capturing has been initialized.  
		while(True): 
			# reads frames from a camera  
			# ret checks return at each frame 
			ret, frame = cap.read()  


			out.write(frame)  


			if video_finish == True:
				t.cancel()
				break


		# Close the window / Release webcam 
		cap.release() 

		# After we release our webcam, we also release the output 
		out.release()  

		# De-allocate any associated memory usage  
		cv2.destroyAllWindows() 
	except Exception:
		pass
	for i in range(30):
		cap.read()
	

# webcakerayov photo e anum

def PhotoToWebcam():
	try:
		# Включаем первую камеру
		cap = cv2.VideoCapture(0)
		# "Прогреваем" камеру, чтобы снимок не был тёмным
		for i in range(30):
			cap.read()
		# Делаем снимок    
		ret, frame = cap.read()
		# Записываем в файл
		cv2.imwrite(os.path.join('static/public/webcam', 'screen.png'), frame)   
		# Отключаем камеру
		cap.release()
	except Exception:
		pass

LastPlaySound = ''

def SelectFunction(filename):
	global LastPlaySound
	mixer.music.load(os.path.join('public/audio', filename))
	mixer.music.play()
	LastPlaySound = filename


#vercnum e file-i formaty
def GetFormat(_str_):
	l = ''
	for x in range(len(_str_)-1,-1,-1):
		if _str_[x] == '.':
			break
		l+=_str_[x]
	return l[::-1].lower()

'''
# commands

shutdown
playsound
screenshot-Webcam
record-video-Webcam

'''

import time
import pyautogui
import threading
import cv2
from pygame import mixer
mixer.init()

from flask import Flask, render_template, request, redirect, url_for
from flask_socketio import SocketIO, send, emit

import os
from werkzeug.utils import secure_filename
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

UPLOAD_FOLDER = '/static'



@socketio.on('sev')
def handle_cmd(message):
	print()
	print(message)
	print()
	# os.system("shutdown /p")
	list_message = message.split()

	if not len(list_message) <= 1:
		if list_message[0] == 'sudo':
			if str(list_message[1]) == 'shutdown':	
				os.system('shutdown -s')

			elif list_message[1] == 'playsound':
				if (list_message[2] == '-r' or list_message[2] == '-resert') and LastPlaySound != '':
					get_play_bool = mixer.music.get_busy()
					if get_play_bool:
						mixer.music.rewind()
					else:
						mixer.music.load(os.path.join('public/audio', LastPlaySound))
						mixer.music.play()
				elif list_message[2] == '-setpos':

					print('sa der petq e kargavorel araj het chi talis')
					
				elif list_message[2] == '-v' or list_message[2] == '-value':
					if is_number(list_message[3]):
						mixer.music.set_volume(float(list_message[3]))
						volume = float(list_message[3])

				elif list_message[2] == '-p'or list_message[2] == '-pause':
					mixer.music.pause()
				elif list_message[2] == '-u' or list_message[2] == '-unpause':
					mixer.music.unpause()
				#estegh petq e ergy egri hamakargichov
			elif list_message[1] == 'photo-Webcam':
				PhotoToWebcam()

			elif list_message[1] == 'video-Webcam':
				RecordVideoToWebcam()

				
			elif list_message[1] == 'window':
				if list_message[2] == 'screenshot':
					pyautogui.screenshot('static/public/screenshot/foo.png')
		elif list_message[0] == 'keyboard':
			# pyautogui.press(list_message[1],presses=2)
			# pyautogui.press(''.join(list_message)[-1])
			if list_message[1] == 'press':
				text_val = ' '.join(list_message[2:])
				if not len(text_val) == 0:	
					# pyautogui.write(text_val, interval=0.1)
					# pyautogui.write(text_val, interval=0.1)

					pyautogui.press(text_val)
			elif list_message[1] == 'hotkey':
				list_hotkey = ' '.join(list_message[2:]).split()

				if len(list_hotkey) <= 5:

					for x in range(0,5-len(list_hotkey)):
						list_hotkey.append('')
					pyautogui.hotkey(list_hotkey[0],list_hotkey[1],list_hotkey[2],list_hotkey[3],list_hotkey[4])


		elif list_message[0] == 'cursor':

			screenWidth, screenHeight = pyautogui.size() # Get the size of the primary monitor.

			currentMouseX, currentMouseY = pyautogui.position() # Get the XY position of the mouse.

			# pyautogui.write('Hello world!', interval=0.25)
			# print(list_message[1],list_message[2])
			# print(pyautogui.position())
			X,Y = pyautogui.position()


			X+= int(list_message[1])
			Y+= int(list_message[2])
			# # pyautogui.press(list_message[1],presses=2)
			# pyautogui.moveTo(X,Y,duration=0.5)





			pyautogui.moveTo(X, Y, duration=0.5)  # move mouse to XY coordinates over num_second seconds
			# pyautogui.moveRel(xOffset, yOffset, duration=num_seconds)  # move mouse relative to its current position


@app.route('/')
def index():
	return render_template('index.html')


ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif','mp4','mp3'])

def allowed_file(filename):
	return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/', methods=['GET', 'POST'])
def upload_file():
	if request.method == 'POST':
		if 'AudioPlayFile' not in request.files:
			return 'No file selected'
		file = request.files['AudioPlayFile']

		if file.filename == '':
			return "No file selected"
		if file and allowed_file(file.filename):
			filename = secure_filename(file.filename)
			AudioDir = 'audio'
			FormatName = {
				'mp3': AudioDir,
				'wav': AudioDir
			}
			if FormatName.get(GetFormat(filename)) != None:
				
				file.save(os.path.join('public/audio'.format(AudioDir), filename))
			
				SelectFunction(filename)

	return redirect(url_for('index'))



if __name__ == '__main__':
	app.run(debug=True, host='0.0.0.0',port=80)
# ,port=80



# # ipconfig
