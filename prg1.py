from flask import Flask, jsonify


app = Flask(__name__)


users = [
    {
        "id": 1,
        "name": "Amit",
        "email": "amit@example.com",
        "city": "Bangalore"
    },
    {
        "id": 2,
        "name": "Priya",
        "email": "priya@example.com",
        "city": "Mysore"
    },
    {
        "id": 3,
        "name": "Rahul",
        "email": "rahul@example.com",
        "city": "Hubli"
    },
    {
        "id": 4,
        "name": "Sneha",
        "email": "sneha@example.com",
        "city": "Mangalore"
    },
    {
        "id": 5,
        "name": "Kiran",
        "email": "kiran@example.com",
        "city": "Belagavi"
    }
]


@app.route('/users', methods=['GET'])
def get_users():
    return jsonify(users)


@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    for user in users:
        if user["id"] == user_id:
            return jsonify(user)

    return jsonify({"message": "User not found"}), 404


if __name__ == '__main__':
    app.run(debug=True)