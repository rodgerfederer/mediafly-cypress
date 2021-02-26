# mediafly-cypress
To run the project use:

Install npm (https://www.npmjs.com/get-npm)
    1. Open the project in Webstorm or similar IDE
    2. Open the terminal in your IDE
    3. Type “npm i”
    4. Type "npm install --save-dev cypress-file-upload"
    5. Type “npm run cy:open”

Run project:
Make sure you have three command windows open for your server
In the first window you are going to type -
python application.py
In the the second window you are going to type -
python queuenew.py
In the third window you are going to type -
python worker.py ("it should tick every 5 seconds or so to pop what's in the queue")

If you are getting an error about "secure_filename" in the application.py, change this line -
"from werkzeug import secure_filename" to from "werkzeug.utils import secure_filename"

Running tests:
Important note about API: You need to run ui.spec.ts before api.spec.ts to upload all images
Important note about UI: If you need to run UI tests for images upload you need to delete an object from images.json
# mediafly-cypress
