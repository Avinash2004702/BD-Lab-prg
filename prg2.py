from flask import Flask, request, jsonify
import re
app = Flask(__name__)

@app.route('/register', methods=['POST'])
def register():

    # Get JSON data from the request
    data = request.get_json()

    # Read name and email
    name = data.get("name")
    email = data.get("email")

   
    if not name or not email:
        return jsonify({
            "status": "Error",
            "message": "Name and Email are required."
        }), 400

    
    email_pattern = r'^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'

    if not re.match(email_pattern, email):
        return jsonify({
            "status": "Error",
            "message": "Invalid Email Format."
        }), 400

    
    return jsonify({
        "status": "Success",
        "message": "Student Registered Successfully!",
        "Student Name": name,
        "Email": email
    }), 200

if __name__ == '__main__':
    app.run(debug=True)




