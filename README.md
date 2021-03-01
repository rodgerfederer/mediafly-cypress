# mediafly-cypress
To run the project use:

Install npm (https://www.npmjs.com/get-npm)

    1. git clone  https://github.com/rodgerfederer/mediafly-cypress.git
    2. in your terminal navigate to the project folder
    3. pip install -r requirements.txt
    4. npm i
    5. python application.py
    6. python queuenew.py
    7. python worker.py
    8. npm install --save-dev cypress-file-upload
    9. npm run cy:open

Run the project:
1. Make sure you have three command windows open for your server.
2. If you are getting an error about "secure_filename" in the application.py, change this line -
    "from werkzeug import secure_filename" to from "werkzeug.utils import secure_filename"

Running tests:
Important note about API: You need to run ui.spec.ts before api.spec.ts to upload all images
Important note about UI: If you need to run UI tests for images upload you need to delete an object from images.json

