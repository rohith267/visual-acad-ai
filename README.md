# Visual Acad AI
I am an AI tutor. I primarily can go through the code and explain it visually with flowcharts. In future, I can also explain any concept visually, and make your learning seamless.


## Server Local Setup (server/)
In `server/` folder, create and activate a virtual environment with python 3.11, preferably using conda. One can install conda by following the steps [here](https://developers.google.com/earth-engine/guides/python_install-conda)
```
conda create -n vacad python=3.11
conda activate vacad
```

Install python requirements
```
pip install -r requirements.txt
```

Launch the application using the launch script
```
uvicorn app:app --host 0.0.0.0  
```

## Visual Acad UI (ui/)

In `ui/` folder, make sure you have Node.js, `nvm`, and `npm` installed. 

Install all dependencies
```
npm install
``` 

Start the react UI webpage
```
npm start
```
The UI webpage will be hosted on http://localhost:3000. 

Click `Generate` button to generate CFG based on your code.
